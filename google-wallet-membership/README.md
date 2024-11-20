
# Google Wallet Membership Pass Generator

A Node.js and TypeScript application for creating and signing Google Wallet membership passes using Google's Wallet API.

## Table of Contents

- [How to Run](#how-to-run)
- [Project Structure](#project-structure)
- [Obtaining Google Wallet Credentials](#obtaining-google-wallet-credentials)

## How to Run

Follow these steps to set up and run the Google Wallet Membership Pass Generator:

### 1. **Clone the Repository**


### 2. **Install Dependencies**

Ensure you have Node.js (v14.x or higher) and npm installed. Then, install the required packages:

```bash
npm install

```

### 3. **Configure Environment Variables**

Create a `.env` file in the root directory and populate it with the necessary configuration variables:

```
# .env

# Path to your Google Service Account key file (.json)
GOOGLE_SERVICE_ACCOUNT_KEY_PATH=./certs/service-account.json

# Your Google Wallet Class ID (e.g., "issuerId.classId")
WALLET_CLASS_ID=issuerId.classId

# Path to the pass template JSON file
PASS_TEMPLATE_PATH=./templates/pass.json

# Output directory for the generated pass files
OUTPUT_DIR=./output

# Google API scopes
GOOGLE_API_SCOPES=https://www.googleapis.com/auth/wallet_object.issuer

```

**Important:**

- **Service Account Key:** Ensure that `service-account.json` is placed in the `./certs/` directory.
- **Security:** Never commit your `.env` file or service account keys to version control. They are listed in `.gitignore` by default.

### 4. **Prepare Certificates and Templates**

- **Service Account Key:** Obtain the `service-account.json` from the Google Cloud Console and place it in the `./certs/` directory.
- **Pass Template:** Define your pass structure in the `templates/pass.json` file according to Google's Wallet Objects specifications.
- **Images:** Place all required images (icon, logo, etc.) in the `./images/` directory.

### 5. **Build the Project**

Compile the TypeScript code to JavaScript:

```bash
npm run build

```

### 6. **Run the Application**

Execute the compiled JavaScript to generate a pass file:

```bash
npm run prod

```

Alternatively, for development purposes, you can run the TypeScript code directly using `ts-node`:

```bash
npm start

```

### 7. **Locate the Generated Pass**

After running the application, the generated pass file will be available in the `./output/` directory.

## Project Structure

Understanding the project structure helps in navigating and maintaining the codebase effectively.

```python
google-wallet-membership/
├── certs/
│   └── service-account.json    # Google Service Account key file
├── images/
│   ├── icon.png                # Icon image for the pass
│   ├── logo.png                # Logo image for the pass
│   └── (other images)
├── templates/
│   └── pass.json               # Pass template defining the pass structure
├── output/
│   └── (generated pass files)
├── src/
│   ├── config/
│   │   └── config.ts           # Configuration settings loaded from .env
│   ├── interfaces/
│   │   └── passInterfaces.ts   # TypeScript interfaces for pass data
│   ├── services/
│   │   └── passService.ts      # Service handling pass creation and signing
│   ├── types/
│   │   └── google-wallet.d.ts  # Custom TypeScript declarations
│   ├── utils/
│   │   └── logger.ts            # Logger utility for logging messages
│   └── index.ts                 # Main entry point for pass generation
├── .env                         # Environment variables (not committed)
├── .gitignore                   # Specifies intentionally untracked files to ignore
├── package.json                 # Project metadata and dependencies
└── tsconfig.json                # TypeScript configuration

```

### Description of Key Directories and Files

- **certs/**: Stores your Google Service Account key required for authentication.
- **images/**: Contains all images used in the pass, such as icons and logos.
- **templates/**: Holds the `pass.json` file, which defines the static structure and content of the pass.
- **output/**: Destination folder where the generated pass files are saved.
- **src/**: Contains the source code organized into subdirectories:
    - **config/**: Manages configuration settings loaded from environment variables.
    - **interfaces/**: Defines TypeScript interfaces for type safety and clarity.
    - **services/**: Implements the core functionality for pass creation and signing.
    - **types/**: Contains custom TypeScript declaration files for third-party libraries lacking type definitions.
    - **utils/**: Provides utility modules like logging.
    - **index.ts**: The main script that orchestrates pass generation.
- **.env**: Environment variables file storing sensitive information like certificate paths and identifiers.
- **.gitignore**: Ensures that sensitive files and directories (e.g., `.env`, `certs/`) are not committed to version control.
- **package.json**: Lists project dependencies, scripts, and metadata.
- **tsconfig.json**: Configures TypeScript compiler options.

## Obtaining Google Wallet Credentials

To generate and sign Google Wallet passes, you need specific credentials from your Google Cloud account. Follow these steps to obtain them:

### 1. **Set Up a Google Cloud Project**

1. **Create a New Project:**
    - Navigate to the Google Cloud Console.
    - Click on the project dropdown and select **New Project**.
    - Enter a project name and click **Create**.
2. **Enable Google Wallet API:**
    - In the Google Cloud Console, go to **APIs & Services > Library**.
    - Search for **Google Wallet API** and click **Enable**.

### 2. **Create a Service Account**

1. **Navigate to Service Accounts:**
    - In the Google Cloud Console, go to **IAM & Admin > Service Accounts**.
2. **Create a New Service Account:**
    - Click **Create Service Account**.
    - Enter a service account name and description.
    - Click **Create and Continue**.
3. **Grant Roles:**
    - Assign the **Wallet Object Issuer** role to the service account.
    - Click **Continue** and then **Done**.
4. **Generate a Key:**
    - Click on the newly created service account.
    - Navigate to the **Keys** tab.
    - Click **Add Key > Create New Key**.
    - Select **JSON** and click **Create**.
    - A `service-account.json` file will be downloaded. Place this file in the `./certs/` directory of your project.

### 3. **Obtain Wallet Class ID**

1. **Access Google Wallet Console:**
    - Navigate to the Google Wallet Console.
    - Select your project.
2. **Create a New Class:**
    - Click on **Create Class**.
    - Choose the appropriate pass type (e.g., Loyalty, Gift Card, etc.).
    - Fill in the required details and save the class.
    - Note down the **Class ID**, which follows the format `issuerId.classId`.

### 4. **Configure the `.env` File**

Ensure your `.env` file is correctly set up with the paths to your service account key and other necessary identifiers:

```
# .env

# Path to your Google Service Account key file (.json)
GOOGLE_SERVICE_ACCOUNT_KEY_PATH=./certs/service-account.json

# Your Google Wallet Class ID (e.g., "issuerId.classId")
WALLET_CLASS_ID=issuerId.classId

# Path to the pass template JSON file
PASS_TEMPLATE_PATH=./templates/pass.json

# Output directory for the generated pass files
OUTPUT_DIR=./output

# Google API scopes
GOOGLE_API_SCOPES=https://www.googleapis.com/auth/wallet_object.issuer

```

**Security Reminder:**

Never commit your `.env` file or service account keys to version control systems like Git. Ensure they are listed in your `.gitignore`.

## Additional Resources

- **Google Wallet Objects Documentation:**
    - Overview
    - Pass Types and Templates
- **Google Cloud Documentation:**
    - Service Accounts
    - Enabling APIs