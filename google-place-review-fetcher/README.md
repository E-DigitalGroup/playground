# Google Place Review Fetcher

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
  - [Obtaining a Google API Key](#obtaining-a-google-api-key)
  - [Finding the Place ID](#finding-the-place-id)
- [Running the Application](#running-the-application)
  - [Development Mode](#development-mode)
  - [Production Mode](#production-mode)
- [Logging](#logging)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

**Google Place Review Fetcher** is a TypeScript-based application designed to fetch and display reviews for a specific place using the Google Places API. The application retrieves place details, processes the reviews, and presents them in a formatted manner, aiding businesses and users in analyzing customer feedback.

---

## Project Structure


```plaintext
google-place-review-fetcher/
├── src/
│   ├── config/
│   │   └── config.ts              # Configuration settings
│   ├── services/
│   │   └── googleService.ts        # Google Places-related operations
│   ├── utilities/
│   │   ├── logger.ts              # Logger utility using winston
│   │   └── reviewUtils.ts         # Review processing utilities
│   ├── types/
│   │   └── interfaces.ts          # TypeScript interfaces
│   └── index.ts                   # Main entry point of the application
├── logs/                          # Directory for log files
│   ├── error.log                  # Error-level logs
│   └── combined.log               # Combined logs
├── types/
│   └── google-place-review.d.ts    # Custom type declarations for Google Place Reviews
├── .env                           # Environment variables
├── .gitignore                     # Git ignore file
├── package.json                   # NPM package configuration
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # Project documentation

```

### Directory and File Descriptions

- **`src/`**: Contains the source code of the application.
    - **`config/`**: Holds configuration settings.
        - `config.ts`: Manages configuration parameters such as API keys, endpoints, and other settings.
    - **`services/`**: Includes service-related operations.
        - `googleService.ts`: Handles interactions with the Google Places API, including fetching place details and reviews.
    - **`utilities/`**: Utility functions and helpers.
        - `logger.ts`: Implements logging using the Winston library for tracking application behavior and errors.
        - `reviewUtils.ts`: Provides utilities for processing and formatting reviews fetched from Google.
    - **`types/`**: Defines TypeScript interfaces and types.
        - `interfaces.ts`: Contains TypeScript interface definitions for data structures used in the application.
    - `index.ts`: The main entry point of the application that initializes services and starts the review fetching process.
- **`logs/`**: Directory designated for storing log files.
    - `error.log`: Logs error-level information for debugging and monitoring purposes.
    - `combined.log`: Aggregates all logs, including informational and error messages.
- **`types/`**:
    - `google-place-review.d.ts`: Custom type declarations specific to Google Place Reviews, enhancing type safety and IntelliSense support.
- **`.env`**: File for environment variable definitions, such as API keys, database URLs, and other sensitive information.
- **`.gitignore`**: Specifies files and directories to be ignored by Git, such as `node_modules/`, `logs/`, and `.env`.
- **`package.json`**: Configuration file for NPM packages and scripts. Defines dependencies, scripts for building and running the application, and other metadata.
- **`tsconfig.json`**: Configuration file for TypeScript compiler options, specifying compiler settings, file inclusions, and exclusions.
- **`README.md`**: Documentation for the project, including setup instructions, usage guidelines, and other relevant information to help users understand and contribute to the project.

---

## Prerequisites

Before setting up and running the application, ensure that your environment meets the following prerequisites:

- **Node.js**: Version 14 or higher. [Download Node.js](https://nodejs.org/)
- **npm**: Comes bundled with Node.js.
- **TypeScript**: Installed as a development dependency.
- **Google Cloud Account**: To access the Google Places API and obtain an API key.

---

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**
    
    ```bash
    
    git clone https://github.com/your-username/google-place-review-fetcher.git
    cd google-place-review-fetcher
    
    ```
    
2. **Install Dependencies**
    
    Install the required NPM packages:
    
    ```bash
    
    npm install
    
    ```
    
    - **Dependencies**:
        - `axios`: For making HTTP requests.
        - `dotenv`: For managing environment variables.
        - `winston`: For logging.
    - **Dev Dependencies**:
        - `typescript`: TypeScript compiler.
        - `@types/node`: Type definitions for Node.js.
        - `@types/winston`: Type definitions for Winston.
        - `ts-node`: To run TypeScript files directly.
        - `nodemon`: For automatic restarting during development.
3. **Build the Project**
    
    Compile the TypeScript code into JavaScript:
    
    ```bash
    
    npm run build
    
    ```
    
    This command compiles the TypeScript files into the `dist/` directory based on the `tsconfig.json` configuration.
    

---

## Configuration

Proper configuration is essential for the application to interact with the Google Places API and function correctly. This involves setting up environment variables and obtaining necessary credentials.

### Obtaining a Google API Key

To fetch place reviews, you need a valid Google API key with access to the Places API.

1. **Create a Google Cloud Project**
    - Navigate to the Google Cloud Console.
    - Click on **Select a project** and then **New Project**.
    - Enter a project name and click **Create**.
2. **Enable the Places API**
    - Within your project in the Google Cloud Console, go to **APIs & Services** > **Library**.
    - Search for **Places API**.
    - Click on **Places API** and then **Enable**.
3. **Create API Credentials**
    - Go to **APIs & Services** > **Credentials**.
    - Click on **Create Credentials** > **API Key**.
    - Your new API key will be displayed. Copy it for later use.
4. **Restrict the API Key (Recommended)**
    - For security purposes, it's advisable to restrict your API key to specific APIs and set other restrictions like HTTP referrers or IP addresses.
    - In the **Credentials** page, click on your API key.
    - Under **Key restrictions**, select **Restrict key** and choose **Google Places API**.
    - Apply additional restrictions as needed and save your changes.

### Finding the Place ID

Each place in Google Maps has a unique Place ID, which is required to fetch its reviews.

1. **Use the Place ID Finder**
    - Visit the Place ID Finder.
    - Enter the name or address of the place you want to fetch reviews for in the search bar.
    - Select the correct place from the search results.
    - The Place ID will be displayed in the interface. Copy this ID for configuration.

### Setting Up Environment Variables

1. **Create a `.env` File**
    
    In the root directory of the project, create a `.env` file to store your environment variables.
    
    ```
    GOOGLE_API_KEY=your_google_api_key_here
    PLACE_ID=your_place_id_here
    LOG_LEVEL=info
    
    ```
    
    - **`GOOGLE_API_KEY`**: Your Google Places API key.
    - **`PLACE_ID`**: The Place ID of the location you want to fetch reviews for.
    - **`LOG_LEVEL`**: (Optional) The logging level (e.g., `info`, `warn`, `error`). Default is `info`.
2. **Ensure `.env` is Ignored by Git**
    
    The `.env` file contains sensitive information and should not be committed to version control. This is already handled by the `.gitignore` file, which includes `.env`.
    
    ```
    # .gitignore
    
    node_modules/
    logs/
    .env
    dist/
    
    ```
    

---

## Running the Application

Once the project is set up and configured, you can run the application to fetch and display Google Place reviews.

### Development Mode

For development purposes, you can run the application using `nodemon` to automatically restart the application upon code changes.

1. **Start in Development Mode**
    
    ```bash
    
    npm run dev
    
    ```
    
    - **Behavior**: Runs the application using `ts-node` with `nodemon`, watching for any changes in the source files and restarting automatically.
2. **View Logs**
    - Logs will be output to the console and saved in the `logs/` directory.
    - Check `logs/error.log` for error-level logs and `logs/combined.log` for all logs.

### Production Mode

For production environments, you should build the project and run the compiled JavaScript code.

1. **Build the Project**
    
    Ensure the project is built:
    
    ```bash
    
    npm run build
    
    ```
    
2. **Start the Application**
    
    ```bash
    
    npm start
    
    ```
    
    - **Behavior**: Runs the compiled JavaScript code located in the `dist/` directory using Node.js.

---

## Logging

The application utilizes the [Winston](https://github.com/winstonjs/winston) logging library to manage log messages effectively.

### Log Files

- **`logs/error.log`**: Contains error-level logs, capturing critical issues that need attention.
- **`logs/combined.log`**: Aggregates all logs, including informational and error messages, providing a comprehensive log history.

### Log Levels

- **`error`**: Critical issues that cause the application to fail or behave unexpectedly.
- **`warn`**: Potentially harmful situations or warnings.
- **`info`**: General informational messages about the application's operation.
- **`debug`**: Detailed debugging information for development purposes.
- **`silly`**: Extremely verbose logging, typically used for deep debugging.

### Configuring Log Level

You can set the desired log level by modifying the `LOG_LEVEL` variable in the `.env` file.

```
LOG_LEVEL=info

```

Higher verbosity levels (e.g., `debug`, `silly`) can be set during development to gain more insights into the application's behavior.

---

## Troubleshooting

### Common Issues

1. **Missing or Invalid API Key**
    - **Symptom**: Errors related to authentication or request denials.
    - **Solution**:
        - Ensure that `GOOGLE_API_KEY` is correctly set in the `.env` file.
        - Verify that the API key has the necessary permissions for the Places API.
        - Check for any restrictions on the API key that might prevent access.
2. **Invalid Place ID**
    - **Symptom**: API responses indicating `INVALID_REQUEST` or no reviews found.
    - **Solution**:
        - Confirm that the `PLACE_ID` in the `.env` file is correct.
        - Use the Place ID Finder to verify the Place ID.
3. **Network Issues**
    - **Symptom**: Errors related to network connectivity or timeouts.
    - **Solution**:
        - Check your internet connection.
        - Ensure that there are no firewall rules blocking the API requests.
4. **Exceeding API Quota**
    - **Symptom**: API responses indicating `OVER_QUERY_LIMIT`.
    - **Solution**:
        - Monitor your API usage in the Google Cloud Console.
        - Upgrade your Google Cloud plan or request an increase in quota if necessary.
        - Implement rate limiting or caching to reduce the number of API calls.

### Checking Logs

- **Console Logs**: Review the console output for real-time logs.
- **Log Files**: Examine the `logs/error.log` and `logs/combined.log` files for detailed log information.