// src/utils/retry.ts

import retry from 'retry';
import logger from './logger';

/**
 * Executes a given asynchronous function with retry logic.
 *
 * @template T
 * @param {() => Promise<T>} fn - The asynchronous function to execute.
 * @param {number} [retries=3] - Number of retry attempts.
 * @param {number} [minTimeout=1000] - Minimum time to wait before retrying (in ms).
 * @returns {Promise<T>} - The result of the asynchronous function.
 */
const executeWithRetry = async <T>(
  fn: () => Promise<T>,
  retries: number = 3,
  minTimeout: number = 1000
): Promise<T> => {
  const operation = retry.operation({
    retries,
    factor: 2,
    minTimeout,
    randomize: true,
  });

  return new Promise<T>((resolve, reject) => {
    operation.attempt(async (currentAttempt) => {
      try {
        const result = await fn();
        resolve(result);
      } catch (error: any) {
        if (operation.retry(error)) {
          logger.warn(
            `Retrying operation (Attempt ${currentAttempt}) due to error: ${error.message}`
          );
          return;
        }
        reject(operation.mainError());
      }
    });
  });
};

export default executeWithRetry;
