
# Apple Wallet Membership Pass Generator

A Node.js and TypeScript application for creating and signing Apple Wallet membership passes using the `passkit-generator` library.

## Table of Contents

- [How to Run](#how-to-run)
- [Project Structure](#project-structure)
- [Obtaining PEM Files and Apple Developer Information](#obtaining-pem-files-and-apple-developer-information)

## How to Run

Follow these steps to set up and run the Apple Wallet Membership Pass Generator:

1. **Clone the Repository**

1. **Install Dependencies**
    
    Ensure you have Node.js (v14.x or higher) and npm installed. Then, install the required packages:
    
    ```bash
    npm install
    
    ```
    
2. **Configure Environment Variables**
    
    Create a `.env` file in the root directory and populate it with the necessary configuration variables:
    
    ```
    # .env
    
    # Path to your Pass Type ID certificate (.pem) file
    PASS_CERT_PATH=./certs/pass-cert.pem
    
    # Path to the Apple WWDR certificate (.pem) file
    WWDR_CERT_PATH=./certs/wwdr.pem
    
    # Your Pass Type Identifier (e.g., "pass.com.yourcompany.membership")
    PASS_TYPE_IDENTIFIER=pass.com.yourcompany.membership
    
    # Your Team Identifier from the Apple Developer account
    TEAM_IDENTIFIER=ABCDE12345
    
    # Path to the pass template JSON file
    PASS_TEMPLATE_PATH=./templates/pass.json
    
    # Output directory for the generated .pkpass files
    OUTPUT_DIR=./output
    
    ```
    
3. **Prepare Certificates and Templates**
    - **Certificates:** Place your Pass Type ID certificate (`pass-cert.pem`) and Apple WWDR certificate (`wwdr.pem`) in the `./certs/` directory.
    - **Pass Template:** Ensure your `pass.json` template is correctly defined in the `./templates/` directory.
    - **Images:** Place all required images (icon, logo, strip, thumbnail) in the `./images/` directory.
4. **Build the Project**
    
    Compile the TypeScript code to JavaScript:
    
    ```bash
    npm run build
    
    ```
    
5. **Run the Application**
    
    Execute the compiled JavaScript to generate a `.pkpass` file:
    
    ```bash
    npm run prod
    
    ```
    
    Alternatively, for development purposes, you can run the TypeScript code directly using `ts-node`:
    
    ```bash
    npm start
    
    ```
    
6. **Locate the Generated Pass**
    
    After running the application, the generated `.pkpass` file will be available in the `./output/` directory.
    

## Project Structure

Understanding the project structure helps in navigating and maintaining the codebase effectively.

```python
python
Copy code
apple-wallet-membership/
├── certs/
│   ├── pass-cert.pem        # Pass Type ID certificate
│   └── wwdr.pem             # Apple WWDR certificate
├── images/
│   ├── icon.png             # Icon image for the pass
│   ├── logo.png             # Logo image for the pass
│   ├── strip.png            # Strip image (optional)
│   └── thumbnail.png        # Thumbnail image (optional)
├── templates/
│   └── pass.json            # Pass template defining the pass structure
├── output/
│   └── (generated .pkpass files)
├── src/
│   ├── config/
│   │   └── config.ts        # Configuration settings loaded from .env
│   ├── interfaces/
│   │   └── passInterfaces.ts# TypeScript interfaces for pass data
│   ├── services/
│   │   └── passService.ts    # Service handling pass creation and signing
│   ├── types/
│   │   └── passkit-generator.d.ts # Custom TypeScript declarations
│   ├── utils/
│   │   └── logger.ts         # Logger utility for logging messages
│   └── index.ts              # Main entry point for pass generation
├── .env                      # Environment variables (not committed)
├── .gitignore                # Specifies intentionally untracked files to ignore
├── package.json              # Project metadata and dependencies
└── tsconfig.json             # TypeScript configuration

```

### Description of Key Directories and Files

- **certs/**: Stores your Pass Type ID and Apple WWDR certificates required for pass signing.
- **images/**: Contains all images used in the pass, such as icons and logos.
- **templates/**: Holds the `pass.json` file, which defines the static structure and content of the pass.
- **output/**: Destination folder where the generated `.pkpass` files are saved.
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

## Obtaining PEM Files and Apple Developer Information

To generate and sign Apple Wallet passes, you need specific certificates and identifiers from your Apple Developer account. Follow these steps to obtain them:

### 1. **Enroll in the Apple Developer Program**

Ensure you are enrolled in the [Apple Developer Program](https://developer.apple.com/programs/), which is required to access PassKit and obtain necessary certificates.

### 2. **Create a Pass Type ID Certificate**

1. **Log in to the Apple Developer Portal:**
    
    Navigate to [Apple Developer](https://developer.apple.com/) and sign in with your developer credentials.
    
2. **Navigate to Certificates, Identifiers & Profiles:**
    
    From the dashboard, go to **Certificates, Identifiers & Profiles**.
    
3. **Create a Pass Type ID:**
    - Select **Identifiers** from the sidebar.
    - Click the **"+"** button to add a new identifier.
    - Choose **Pass Type IDs** and click **Continue**.
    - Enter a description and a unique identifier (e.g., `pass.com.yourcompany.membership`).
    - Click **Continue** and then **Register**.
4. **Generate the Pass Type ID Certificate:**
    - After registering the Pass Type ID, select it from the list.
    - Click on **Configure**.
    - Under **Pass Type ID Certificate**, click **Create Certificate**.
    - Follow the instructions to generate a Certificate Signing Request (CSR) using **Keychain Access** on macOS:
        - Open **Keychain Access**.
        - Navigate to **Certificate Assistant > Request a Certificate From a Certificate Authority**.
        - Enter your email and common name.
        - Select **Saved to disk** and click **Continue** to save the `.certSigningRequest` file.
    - Upload the CSR file in the Apple Developer portal.
    - Download the generated certificate (`pass-cert.pem`) and save it to the `./certs/` directory in your project.

### 3. **Download the Apple WWDR Certificate**

The Apple Worldwide Developer Relations (WWDR) Intermediate Certificate is required to sign your passes.

1. **Download the WWDR Certificate:**
    - Visit the [Apple WWDR Certificate page](https://developer.apple.com/certificationauthority/AppleWWDRCA.cer).
    - Download the certificate file (`AppleWWDRCA.cer`).
2. **Convert the Certificate to PEM Format:**
    
    If the downloaded certificate is in DER format, convert it to PEM using OpenSSL:
    
    ```bash
    openssl x509 -in AppleWWDRCA.cer -inform DER -out wwdr.pem -outform PEM
    
    ```
    
3. **Place the WWDR Certificate:**
    
    Move the converted `wwdr.pem` file to the `./certs/` directory in your project.
    

### 4. **Gather Apple Developer Identifiers**

1. **Pass Type Identifier:**
    - This is the unique identifier you created earlier (e.g., `pass.com.yourcompany.membership`).
    - It is used in your `.env` file as `PASS_TYPE_IDENTIFIER`.
2. **Team Identifier:**
    - Found in your Apple Developer account under **Membership** details.
    - It is used in your `.env` file as `TEAM_IDENTIFIER`.

### 5. **Configure the `.env` File**

Ensure your `.env` file is correctly set up with the paths to your certificates and the necessary identifiers:

```
# .env

# Path to your Pass Type ID certificate (.pem) file
PASS_CERT_PATH=./certs/pass-cert.pem

# Path to the Apple WWDR certificate (.pem) file
WWDR_CERT_PATH=./certs/wwdr.pem

# Your Pass Type Identifier (e.g., "pass.com.yourcompany.membership")
PASS_TYPE_IDENTIFIER=pass.com.yourcompany.membership

# Your Team Identifier from the Apple Developer account
TEAM_IDENTIFIER=ABCDE12345

# Path to the pass template JSON file
PASS_TEMPLATE_PATH=./templates/pass.json

# Output directory for the generated .pkpass files
OUTPUT_DIR=./output
