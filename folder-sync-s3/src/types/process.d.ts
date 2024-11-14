// src/types/process.d.ts

export {}; // Ensure the file is treated as a module

declare global {
  namespace NodeJS {
    interface Process {
      pkg?: {
        assets: string[];
      };
    }
  }
}
