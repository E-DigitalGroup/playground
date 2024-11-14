# S3 Folder Sync

**S3 Folder Sync** is a Node.js application designed to monitor a local directory and synchronize its contents with an Amazon S3 bucket. It ensures that your S3 bucket remains up-to-date with the latest changes in your specified local folder, providing seamless file uploads and deletions.

---

## Table of Contents

- [Features](https://www.notion.so/13ee5b128bba801f8d14dd0ac580a26d?pvs=21)
- [Prerequisites](https://www.notion.so/13ee5b128bba801f8d14dd0ac580a26d?pvs=21)
- [Installation](https://www.notion.so/13ee5b128bba801f8d14dd0ac580a26d?pvs=21)
- [Configuration](https://www.notion.so/13ee5b128bba801f8d14dd0ac580a26d?pvs=21)
    - [Environment Variables](https://www.notion.so/13ee5b128bba801f8d14dd0ac580a26d?pvs=21)
- [Development](https://www.notion.so/13ee5b128bba801f8d14dd0ac580a26d?pvs=21)
    - [Running in Development Mode](https://www.notion.so/13ee5b128bba801f8d14dd0ac580a26d?pvs=21)
- [Building the Application](https://www.notion.so/13ee5b128bba801f8d14dd0ac580a26d?pvs=21)
    - [Packaging for Different Operating Systems](https://www.notion.so/13ee5b128bba801f8d14dd0ac580a26d?pvs=21)
- [Usage](https://www.notion.so/13ee5b128bba801f8d14dd0ac580a26d?pvs=21)
- [Testing](https://www.notion.so/13ee5b128bba801f8d14dd0ac580a26d?pvs=21)
- [Contributing](https://www.notion.so/13ee5b128bba801f8d14dd0ac580a26d?pvs=21)
- [License](https://www.notion.so/13ee5b128bba801f8d14dd0ac580a26d?pvs=21)

---

## Features

- **Real-time Monitoring:** Uses `chokidar` to watch for file additions and deletions in the specified directory.
- **AWS S3 Integration:** Utilizes the AWS SDK to interact with your S3 bucket for uploading and removing files.
- **Logging:** Implements `winston` with daily log rotation for comprehensive logging.
- **Retry Mechanism:** Incorporates retry logic to handle transient failures during S3 operations.
- **Cross-Platform Packaging:** Packages the application into executable binaries for Windows, macOS, and Linux using `pkg`.

---

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js:** Version 14.x or higher.
- **npm:** Version 6.x or higher.
- **AWS Account:** Access to an AWS S3 bucket with appropriate permissions.
- **TypeScript:** Installed globally or locally as a dev dependency.

---

## Installation

1. **Clone the Repository:**
    
    ```bash
    git clone https://github.com/e-digitalgroup/s3-folder-sync.git
    cd s3-folder-sync
    
    ```
    
2. **Install Dependencies:**
    
    Navigate to the project directory and install the required Node.js modules:
    
    ```bash
    npm install
    
    ```
    

---

## Configuration

### Environment Variables

The application relies on environment variables for configuration. These variables should be defined in a `.env` file located at the root of the project.

1. **Create a `.env` File:**
    
    ```bash
    touch .env
    
    ```
    
2. **Define the Required Variables:**
    
    Open the `.env` file in your preferred text editor and add the following variables:
    
    ```
    # AWS Configuration
    S3_REGION=your-aws-region
    S3_BUCKET_ACCESS_KEY_ID=your-access-key-id
    S3_BUCKET_SECRET_ACCESS_KEY=your-secret-access-key
    S3_BUCKET_NAME=your-s3-bucket-name
    
    # Directory Configuration
    DIRECTORY=absolute/path/to/your/local/directory
    FOLDER=relative/folder/path/in/directory
    
    ```
    
    **Variable Descriptions:**
    
    - `S3_REGION`: The AWS region where your S3 bucket is located (e.g., `us-west-2`).
    - `S3_BUCKET_ACCESS_KEY_ID`: Your AWS access key ID with permissions to access the S3 bucket.
    - `S3_BUCKET_SECRET_ACCESS_KEY`: Your AWS secret access key corresponding to the access key ID.
    - `S3_BUCKET_NAME`: The name of the S3 bucket you want to synchronize with.
    - `DIRECTORY`: The absolute path to the local directory you want to monitor.
    - `FOLDER`: The relative path within the `DIRECTORY` that you want to synchronize.
    
    **Example:**
    
    ```
    S3_REGION=us-west-2
    S3_BUCKET_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
    S3_BUCKET_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
    S3_BUCKET_NAME=my-s3-bucket
    
    DIRECTORY=/Users/yourusername/Documents
    FOLDER=projects/my-folder-sync
    
    ```
    

---

## Development

### Running in Development Mode

To run the application in development mode with live-reloading, follow these steps:

1. **Ensure the `.env` File is Configured:**
    
    Make sure your `.env` file is properly set up as described in the [Configuration](https://www.notion.so/13ee5b128bba801f8d14dd0ac580a26d?pvs=21) section.
    
2. **Start the Development Server:**
    
    Use `nodemon` and `ts-node` to run the application with live-reloading:
    
    ```bash
    npm run dev
    
    ```
    
    **What This Does:**
    
    - **`nodemon`:** Monitors your source files for changes and restarts the application automatically.
    - **`ts-node`:** Executes TypeScript files directly without precompiling them to JavaScript.
3. **Verify the Application is Running:**
    
    You should see console logs indicating that the file watcher is initialized and ready.
    
    ```bash
    Running in development mode.
    File watcher initialized and ready.
    
    ```
    

---

## Building the Application

To prepare the application for production or distribution, you need to compile the TypeScript code into JavaScript and package it into executable binaries for your target operating systems.

### Build Mode

1. **Compile TypeScript to JavaScript:**
    
    ```bash
    npm run build
    
    ```
    
    **What This Does:**
    
    - Runs the TypeScript compiler (`tsc`) to transpile your TypeScript code in the `src/` directory to JavaScript in the `dist/` directory.
2. **Verify the Build:**
    
    Ensure that the `dist/` directory contains the compiled JavaScript files.
    
    ```bash
    ls dist/
    
    ```
    
    You should see files like `app.js`, `utils/`, `services/`, etc.
    

---

### Packaging for Different Operating Systems

The application can be packaged into standalone executables for Windows, macOS, and Linux using the `pkg` tool. This allows users to run the application without needing to install Node.js.

1. **Ensure the Build is Up-to-Date:**
    
    Always build the project before packaging to include the latest changes.
    
    ```bash
    npm run build
    
    ```
    
2. **Package for Windows:**
    
    ```bash
    npm run package:win
    
    ```
    
    **Output:**
    
    - The executable `s3-folder-sync-win.exe` will be generated in the `build/` directory.
3. **Package for macOS:**
    
    ```bash
    npm run package:mac
    
    ```
    
    **Output:**
    
    - The executable `s3-folder-sync-macos` will be generated in the `build/` directory.
4. **Package for Linux:**
    
    ```bash
    npm run package:linux
    
    ```
    
    **Output:**
    
    - The executable `s3-folder-sync-linux` will be generated in the `build/` directory.
5. **Package for All Platforms at Once:**
    
    *(Optional)* If you've added a `package:all` script to your `package.json`, you can package for all platforms simultaneously:
    
    ```bash
    npm run package:all
    
    ```
    
    **Output:**
    
    - Executables for Windows, macOS, and Linux will be generated in the `build/` directory.
6. **Verify the Executables:**
    
    Navigate to the `build/` directory and confirm that the executables have been created.
    
    ```bash
    cd build
    ls
    
    ```
    
    **You Should See:**
    
    - `s3-folder-sync-win.exe`
    - `s3-folder-sync-macos`
    - `s3-folder-sync-linux`

---

## Usage

Once packaged, you can distribute the executables to users on different operating systems. Here's how to use them:

1. **Windows Executable (`.exe`):**
    - **Run the Executable:**
        
        Double-click `s3-folder-sync-win.exe` or run it via the Command Prompt:
        
        ```
        cd build
        s3-folder-sync-win.exe
        
        ```
        
2. **macOS Executable:**
    - **Make It Executable (If Necessary):**
        
        ```bash
        chmod +x s3-folder-sync-macos
        
        ```
        
    - **Run the Executable:**
        
        ```bash
        ./s3-folder-sync-macos
        ```
        
3. **Linux Executable:**
    - **Make It Executable:**
        
        ```bash
        chmod +x s3-folder-sync-linux
        
        ```
        
    - **Run the Executable:**
        
        ```bash
        ./s3-folder-sync-linux
        ```
        
4. **Logging:**
    - Logs are written to both the console and log files located in the directory where the executable is run. Check the log files for detailed information about the synchronization process.