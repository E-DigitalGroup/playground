A TypeScript-based Node.js application that allows users to search for specific text within a YouTube video's transcript. The application fetches the transcript of a given YouTube video, processes it into manageable chunks, and performs a search query to find relevant sections within the transcript.

## Features

- **Transcript Fetching:** Retrieves transcripts for YouTube videos using the `youtube-transcript` library.
- **Chunking:** Splits the transcript into overlapping chunks for efficient searching.
- **Search Functionality:** Allows users to search for specific text within the transcript chunks.
- **Logging:** Implements robust logging using the `winston` library for better monitoring and debugging.
- **TypeScript:** Utilizes TypeScript for type safety and improved code maintainability.

## Project Structure

```lua

youtube-transcript-search/
├── src/
│   ├── config/
│   │   └── config.ts              # Configuration settings
│   ├── services/
│   │   └── youtubeService.ts      # YouTube-related operations
│   ├── utilities/
│   │   ├── logger.ts              # Logger utility using winston
│   │   └── transcriptUtils.ts     # Transcript processing utilities
│   ├── types/
│   │   └── interfaces.ts          # TypeScript interfaces
│   └── index.ts                   # Main entry point of the application
├── logs/                          # Directory for log files
│   ├── error.log                  # Error-level logs
│   └── combined.log               # Combined logs
├── types/
│   └── youtube-transcript.d.ts    # Custom type declarations for youtube-transcript
├── .env                           # Environment variables
├── .gitignore                     # Git ignore file
├── package.json                   # NPM package configuration
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # Project documentation

```

*Explanation of the Project Structure:*

- **src/**: Contains the source code of the application.
    - **config/**: Holds configuration settings.
        - `config.ts`: Manages configuration parameters.
    - **services/**: Includes service-related operations.
        - `youtubeService.ts`: Handles YouTube-related functionalities.
    - **utilities/**: Utility functions and helpers.
        - `logger.ts`: Implements logging using the Winston library.
        - `transcriptUtils.ts`: Provides utilities for processing transcripts.
    - **types/**: Defines TypeScript interfaces and types.
        - `interfaces.ts`: Contains TypeScript interface definitions.
    - `index.ts`: The main entry point of the application.
- **logs/**: Directory designated for storing log files.
    - `error.log`: Logs error-level information.
    - `combined.log`: Aggregates all logs.
- **types/**:
    - `youtube-transcript.d.ts`: Custom type declarations specific to YouTube transcripts.
- **.env**: File for environment variable definitions.
- **.gitignore**: Specifies files and directories to be ignored by Git.
- **package.json**: Configuration file for NPM packages and scripts.
- **tsconfig.json**: Configuration file for TypeScript compiler options.
- **README.md**: Documentation for the project, including setup instructions, usage, and other relevant information.
markdown
Copy code

## How to Run the Code

### Prerequisites

- **Node.js:** Ensure that you have Node.js (version 14 or above) installed on your machine. You can download it from [here](https://nodejs.org/).
- **NPM:** Node.js comes with NPM installed. Verify by running `npm -v` in your terminal.

### Installation

1. **Clone the Repository**

2. **Install Dependencies**
```
npm install
```

Create a .env file in the root directory to manage environment-specific configurations. For this application, no specific environment variables are required. However, if you plan to extend functionalities in the future (e.g., integrating with external APIs), you can add them here.

3. **Run**

```
npm run start
```
Note: Ensure that your staticObj in src/index.ts contains a valid YouTube URL and an appropriate search query.

Production Mode
For production, it's recommended to compile the TypeScript code to JavaScript and then run the compiled code.

4. **Build the Project**

Compile the TypeScript code to JavaScript:

```
npm run build
```
This will generate the dist directory containing the compiled JavaScript files.

5. **Run the Compiled Code**

Execute the compiled JavaScript:

```
npm run prod
```
Usage
Configure Search Parameters

In the src/index.ts file, configure the staticObj with the desired YouTube video URL and the search query.

```
Copy code
// src/index.ts

const staticObj: SearchObject = {
  video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Replace with actual YouTube URL
  search: 'never gonna give you up', // Replace with your search query
  score: 0.5, // Optional: threshold score for filtering (not used in simple search)
};
```
Run the Application

Depending on your preferred mode (development or production), run the application as described in the Running the Application section.

View Search Results

The application will output the search results in the console, displaying the source URL, offset time, and the content where the search query was found.

```
Search Results:

Result 1:
Source: https://www.youtube.com/embed/dQw4w9WgXcQ?start=42
Offset: 42 seconds
```
