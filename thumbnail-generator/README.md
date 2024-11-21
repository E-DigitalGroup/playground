## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [How to Run](#how-to-run)
- [AWS Setup](#aws-setup)
    - [1. Create an S3 Bucket](#1-create-an-s3-bucket)
    - [2. Configure S3 Event Trigger](#2-configure-s3-event-trigger)
    - [3. Set Up IAM Role](#3-set-up-iam-role)
- [Deployment on AWS](#deployment-on-aws)
    - [1. Build the Project](#1-build-the-project)
    - [2. Package the Lambda Function](#2-package-the-lambda-function)
    - [3. Deploy the Lambda Function](#3-deploy-the-lambda-function)
    - [4. Verify Deployment](#4-verify-deployment)

---

## Project Structure

```lua
thumbnail-generator/
├── src/
│   ├── handlers/
│   │   └── thumbnailGenerator.ts
│   ├── utils/
│   │   ├── imageProcessor.ts
│   │   ├── logger.ts
│   │   └── s3Client.ts
│   ├── types/
│   │   └── s3Error.ts
│   └── __tests__/
│       └── s3Client.test.ts
├── jest.config.js
├── package.json
├── tsconfig.json
└── README.md

```

### Description

- **`src/`**: Contains all source code.
    - **`handlers/`**:
        - **`thumbnailGenerator.ts`**: AWS Lambda handler that processes S3 events to generate thumbnails.
    - **`utils/`**:
        - **`imageProcessor.ts`**: Utility for processing images using Sharp to create thumbnails.
        - **`logger.ts`**: Custom logging utility with different log levels.
        - **`s3Client.ts`**: AWS S3 client utilities for uploading and downloading objects.
    - **`types/`**:
        - **`s3Error.ts`**: Type definitions for S3-related errors.
    - **`__tests__/`**:
        - **`s3Client.test.ts`**: Unit tests for S3 client utilities using Jest.
- **`jest.config.js`**: Configuration file for Jest testing framework.
- **`package.json`**: Project dependencies and scripts.
- **`tsconfig.json`**: TypeScript compiler configuration.
- **`README.md`**: Project documentation.

---

## Prerequisites

Before getting started, ensure you have the following installed:

- **Node.js** (v14.x or higher)
- **npm** (v6.x or higher)
- **AWS CLI** (v2)
- **AWS Account** with permissions to create S3 buckets, Lambda functions, and IAM roles.

---

## How to Run

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/thumbnail-generator.git
cd thumbnail-generator

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Build the Project

Compile the TypeScript code to JavaScript.

```bash
npm run build

```

### 4. Run Tests

Execute unit tests to ensure everything is working correctly.

```bash
npm run test

```

---

## AWS Setup

To enable the Lambda function to automatically generate thumbnails when an image is uploaded to an S3 bucket, follow these steps:

### 1. Create an S3 Bucket

1. **Navigate to the S3 Console**:
    - Go to the [AWS S3 Console](https://console.aws.amazon.com/s3/).
2. **Create a New Bucket**:
    - Click on **"Create bucket"**.
    - **Bucket name**: `your-bucket-name` (must be unique globally).
    - **Region**: Choose your preferred AWS region (e.g., `us-east-1`).
    - **Bucket settings**: Configure as needed (e.g., enable versioning, encryption).
    - Click **"Create bucket"**.
3. **Folder Structure**:
    - Inside the bucket, create two folders:
        - **`images/`**: For original images.
        - **`thumbnails/`**: For generated thumbnails.

### 2. Configure S3 Event Trigger

1. **Navigate to the S3 Bucket**:
    - Go to the **"Properties"** tab of your S3 bucket.
2. **Add Event Notification**:
    - Scroll down to **"Event notifications"**.
    - Click **"Create event notification"**.
3. **Configure Event**:
    - **Name**: `ThumbnailGeneratorTrigger`.
    - **Event types**: Select **"All object create events"**.
    - **Prefix**: `images/` (to monitor uploads in the `images` folder).
    - **Suffix**: (optional) You can specify file extensions like `.jpg`, `.png`, etc., to filter specific image types.
    - **Destination**: Choose **"Lambda Function"**.
        - **Select Lambda Function**: Choose the Lambda function you will create in the next steps.
    - Click **"Save changes"**.

### 3. Set Up IAM Role

1. **Navigate to IAM Console**:
    - Go to the [AWS IAM Console](https://console.aws.amazon.com/iam/).
2. **Create a New Role**:
    - Click on **"Roles"** in the sidebar.
    - Click **"Create role"**.
3. **Select Trusted Entity**:
    - Choose **"AWS service"**.
    - Select **"Lambda"**.
    - Click **"Next: Permissions"**.
4. **Attach Permissions Policies**:
    - **AmazonS3FullAccess** (for demonstration purposes; for production, follow the principle of least privilege and create a custom policy).
    - **AWSLambdaBasicExecutionRole**: Grants permissions for logging to CloudWatch.
    - Click **"Next: Tags"** (optional), then **"Next: Review"**.
5. **Name the Role**:
    - **Role name**: `LambdaS3ThumbnailGeneratorRole`.
    - Click **"Create role"**.

---

## Deployment on AWS

Deploying your Lambda function involves packaging the code, setting up the Lambda function, and configuring it to work with the S3 event trigger.

### 1. Build the Project

Ensure your TypeScript code is compiled to JavaScript.

```bash
npm run build

```

### 2. Package the Lambda Function

1. **Navigate to the `dist` Directory**:
    
    ```bash
    cd dist
    
    ```
    
2. **Install Production Dependencies**:
    
    If your project separates development and production dependencies, ensure only necessary packages are included. Typically, with AWS Lambda, dependencies like `aws-sdk` are already available, so you might exclude them to reduce package size.
    
3. **Zip the Function Code**:
    
    ```bash
    zip -r function.zip .
    
    ```
    
    This command creates a `function.zip` file containing all necessary files in the `dist` directory.
    

### 3. Create the Lambda Function

1. **Navigate to the Lambda Console**:
    - Go to the [AWS Lambda Console](https://console.aws.amazon.com/lambda/).
2. **Create a New Function**:
    - Click on **"Create function"**.
    - **Function name**: `ThumbnailGenerator`.
    - **Runtime**: Select **Node.js 16.x** or your preferred Node.js version.
    - **Permissions**:
        - Choose **"Use an existing role"**.
        - Select the IAM role created earlier: `LambdaS3ThumbnailGeneratorRole`.
    - Click **"Create function"**.
3. **Upload the Function Code**:
    - In the **"Code"** tab, under **"Code entry type"**, select **"Upload a .zip file"**.
    - Click **"Upload"** and select the `function.zip` file.
    - Click **"Save"**.
4. **Configure Handler**:
    - Ensure the **Handler** field is set correctly. Based on the project structure, it should be `handlers/thumbnailGenerator.handler`.
        - **Example**: If your compiled code places `thumbnailGenerator.js` inside a `handlers` folder, set it as `handlers/thumbnailGenerator.handler`.
    - Click **"Save"**.

### 4. Set Environment Variables (Optional)

If your application relies on environment variables (e.g., for configuration), set them in the Lambda function configuration.

1. **Navigate to the Lambda Function**:
    - Go to the **"Configuration"** tab.
    - Click on **"Environment variables"**.
2. **Add Variables**:
    - Click **"Edit"**.
    - Add necessary key-value pairs (e.g., `ID`, `KEY` if not using IAM roles).
    - Click **"Save"**.
    
    **Note:** If using IAM roles, you can omit AWS credentials from environment variables for enhanced security.
    

### 5. Attach the Lambda Layer (If Using Layers)

If you've created a Lambda Layer for dependencies like `sharp`, attach it to your Lambda function.

1. **Navigate to the Lambda Function**:
    - Go to the **"Layers"** section in the **"Configuration"** tab.
2. **Add a Layer**:
    - Click **"Add a layer"**.
    - Choose **"Custom layers"**.
    - Select your previously created layer (e.g., `my-s3-layer`).
    - Specify the version.
    - Click **"Add"**.

### 6. Verify Deployment

1. **Test the Function**:
    - In the Lambda console, click **"Test"**.
    - Create a new test event using the **S3 Put** event template.
    - Modify the event to match your S3 bucket and object key structure.
    - Click **"Test"** and verify that the function executes successfully.
2. **Check Logs**:
    - Navigate to **CloudWatch Logs** associated with your Lambda function.
    - Review logs to ensure that the function is processing events as expected.
3. **Upload an Image**:
    - Upload a supported image (e.g., `.jpg`, `.png`) to the `images/` folder in your S3 bucket.
    - Verify that a corresponding thumbnail is generated and uploaded to the `thumbnails/` folder.

---

## Additional Notes

- **Error Handling**: The Lambda function is designed to log errors and rethrow them, allowing AWS Lambda's retry mechanisms to handle transient failures.
- **Concurrency**: The current implementation processes records sequentially. For higher performance, consider processing records concurrently using `Promise.all` with proper concurrency controls.
- **Security**: Always follow the principle of least privilege when assigning IAM roles. Grant only the necessary permissions required for the Lambda function to operate.
- **Monitoring**: Utilize AWS CloudWatch to monitor Lambda function performance, errors, and execution times. Set up alarms for critical metrics to ensure the reliability of your service.

---

## Troubleshooting

- **Permissions Issues**:
    - Ensure that the IAM role attached to the Lambda function has the necessary S3 permissions (`s3:GetObject`, `s3:PutObject`) for the specified bucket.
- **Environment Variables**:
    - If not using IAM roles, verify that AWS credentials (`ID`, `KEY`) are correctly set in the Lambda function's environment variables.
- **Dependency Errors**:
    - If using Lambda Layers, ensure that the layer is correctly attached and that all dependencies are included.
- **Cold Starts**:
    - Optimize your Lambda function's package size and use Lambda Layers to minimize cold start times.