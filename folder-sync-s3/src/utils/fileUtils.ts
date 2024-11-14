// src/utils/fileUtils.ts

/**
 * Creates an S3 object key based on the file path.
 *
 * @param {string} filePath - The absolute path of the file.
 * @returns {string} - The formatted S3 object key.
 */
export const createKey = (filePath: string): string => {
    const key = filePath.replace(/\\/g, '/').split(`${process.env.FOLDER}/`)[1];
    return key.replace(/\s+/g, ' ').replace(/[^\w\.\/]/g, '-');
};
