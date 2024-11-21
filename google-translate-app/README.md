# 

## Project Structure

```bash

translation-service-project/
├── documents/                # Folder to store input documents
│   └── sample.pdf            # Example input document
├── dist/                     # Compiled output (generated after build)
├── src/                      # Source files
│   ├── config/               # Configuration files
│   │   └── index.ts          # Loads and manages environment variables
│   ├── services/             # Core services
│   │   ├── TranslationService.ts       # Handles plain text translation
│   │   ├── DocumentTranslationService.ts # Manages document translation
│   │   └── StorageService.ts           # Handles file uploads/downloads to/from GCS
│   ├── types/                # Type definitions
│   │   └── index.ts          # Input and output data types
│   ├── utils/                # Utility functions
│   │   └── logger.ts         # Logger utility for consistent logging
│   └── index.ts              # Main application entry point
├── .env                      # Environment variables
├── .gitignore                # Git ignore file
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation

```

---

## Setup Project

### Prerequisites

- **Node.js** (v14 or later)
- **Google Cloud Platform (GCP) Account**
- **Google Cloud Service Account JSON Key**

### Steps

1. **Clone the Repository**:
    
2. **Install Dependencies**:
    
    ```bash
    
    npm install
    
    ```
    
3. **Set Up Environment Variables**:
    - Create a `.env` file in the root directory:
        
        ```
        
        GOOGLE_TRASLATE_PRIVATEKEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_CONTENT\n-----END PRIVATE KEY-----\n"
        GOOGLE_TRASLATE_CLIENT_EMAIL=your-service-account-email@your-project.iam.gserviceaccount.com
        GCS_BUCKET_NAME=your-bucket-name
        GCP_PROJECT_ID=your-project-id
        GCP_LOCATION=us-central1
        SOURCE_LANGUAGE=en
        
        ```
        
4. **Set Up Google Cloud Storage Bucket**:
    - Create a bucket in Google Cloud Storage and update `GCS_BUCKET_NAME` in your `.env` file.
5. **Set Up Google Cloud Service Account**:
    - Follow the instructions in the "Get Keys and Service JSON from Google" section to configure your service account and download the JSON key.

---

## How to Run

### Development Mode

Run the application directly using `ts-node`:

```bash

npx ts-node src/index.ts

```

### Production Mode

Compile the TypeScript code and execute the compiled JavaScript:

```bash

npm run build
node dist/index.js

```

---

## Input and Output Information

### Input

The application accepts the following types of input:

1. **Text Translation**:
    
    ```json
    
    { "type": "text", "text": "Hello, world!", "targetLang": "es" }
    
    ```
    
    - `type`: Specifies the input as plain text.
    - `text`: The text to be translated.
    - `targetLang`: The target language code (e.g., `es` for Spanish).
2. **Document Translation**:
    
    ```json
    
    { "type": "doc", "filePath": "./documents/sample.pdf", "targetLang": "fr" }
    
    ```
    
    - `type`: Specifies the input as a document.
    - `filePath`: Path to the document file.
    - `targetLang`: The target language code (e.g., `fr` for French).

### Output

The application generates the following outputs:

1. **Text Translation Output**:
    
    ```json
    
    { "type": "text", "text": "Hello, world!", "targetLang": "es", "translatedText": "¡Hola, mundo!" }
    
    ```
    
2. **Document Translation Output**:
    
    ```json
    
    { "type": "doc", "docPath": "./documents/sample.pdf", "targetLang": "fr", "translatedDocPath": "./documents/sample_fr.pdf" }
    
    ```
    

### Final Output

All translations are aggregated into an array:

```json
[
  { "type": "text", "text": "Hello, world!", "targetLang": "es", "translatedText": "¡Hola, mundo!" },
  { "type": "doc", "docPath": "./documents/sample.pdf", "targetLang": "fr", "translatedDocPath": "./documents/sample_fr.pdf" }
]

```

---

## Get Keys and Service JSON from Google

1. **Set Up Google Cloud Project**:
    - Log in to the Google Cloud Console.
    - Create a new project or select an existing project.
2. **Enable APIs**:
    - Navigate to **APIs & Services > Library**.
    - Enable:
        - **Cloud Translation API**
        - **Cloud Storage API**
3. **Create a Service Account**:
    - Go to **IAM & Admin > Service Accounts**.
    - Click **Create Service Account**.
    - Provide a name and description.
    - Assign these roles:
        - **Cloud Translation API User**
        - **Storage Admin**
    - Click **Create Key**, select **JSON**, and download the key file.
4. **Add Key to the Project**:
    - Open the downloaded JSON file.
    - Copy the `private_key` and `client_email` values into the `.env` file:
        
        ```
        
        GOOGLE_TRASLATE_PRIVATEKEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_CONTENT\n-----END PRIVATE KEY-----\n"
        GOOGLE_TRASLATE_CLIENT_EMAIL=your-service-account-email@your-project.iam.gserviceaccount.com
        
        ```
        
5. **Update the `.env` File**:
    - Set `GCS_BUCKET_NAME` to your bucket name.
    - Set `GCP_PROJECT_ID` to your project ID.
    - Set `GCP_LOCATION` to your location (e.g., `us-central1`).

---

## Notes

- **Supported Document Formats**:
    - PDF (`.pdf`)
    - Microsoft Word (`.docx`)
- **Language Codes**:
    - Use standard codes (e.g., `es` for Spanish, `fr` for French).
- **Debugging**:
    - Logs are printed with `[INFO]` and `[ERROR]` prefixes for easier troubleshooting.
- **File Paths**:
    - Ensure the `filePath` for documents exists before running the application.