# DSR Logistics Hub

Welcome to the DSR Logistics Hub, a comprehensive, modern web application designed to streamline logistics operations for DSR employees. This platform is built with a powerful tech stack to deliver a seamless and efficient user experience.

## ✨ Features

-   **Secure Authentication**: Employs Firebase Authentication for a secure login system, ensuring that only authorized personnel can access the application.
-   **Interactive Dashboard**: A central hub displaying key metrics at a glance, including total deliveries, revenue, active employees, and pending tasks. Features charts for service usage and tables for top-performing employees and recent deliveries.
-   **Delivery Record Management**: A robust form for entering new delivery details, including service type, client information, hours, and pricing.
-   **Proof of Delivery (POD) Uploads**: Users can upload up to 5 files (PDF, JPG, PNG) as proof of delivery for each record. Files are securely stored in Firebase Storage.
-   **Real-time POD Viewing**: A live-updating dashboard that lists all delivery records from Firestore, providing instant access to details and links to download associated POD files.
-   **AI-Powered Service Suggestions**: Leverages Google's Genkit AI to provide intelligent suggestions for the most appropriate delivery service based on origin and destination.
-   **Employee Payment Overview**: A dedicated section for viewing and managing employee payment records (currently using mock data).

## 🛠️ Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **UI**: [React](https://reactjs.org/)
-   **Backend & Database**: [Firebase](https://firebase.google.com/) (Authentication, Firestore, Storage)
-   **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Component Library**: [ShadCN UI](https://ui.shadcn.com/)

## 🚀 Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 1. Firebase Project Setup

This project requires a Firebase project to handle authentication, database, and file storage.

1.  If you don't have one already, create a new project at the [Firebase Console](https://console.firebase.google.com/).
2.  In your new project, go to **Project Settings** (click the gear icon ⚙️).
3.  Under the "General" tab, find the "Your apps" section and click the **Web icon (`</>`)** to register a new web app.
4.  After registering, Firebase will provide you with a `firebaseConfig` object. You will need these values for the next step.
5.  In the Firebase console, navigate to **Authentication** and enable the **Email/Password** sign-in provider.
6.  Navigate to **Firestore Database**, create a database, and go to the **Rules** tab. Update the rules to allow reads and writes for authenticated users:
    ```
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /{document=**} {
          allow read, write: if request.auth != null;
        }
      }
    }
    ```
7.  Navigate to **Storage**, and set up a storage bucket. Update its **Rules** to allow authenticated users to upload files:
     ```
    rules_version = '2';
    service firebase.storage {
      match /b/{bucket}/o {
        match /{allPaths=**} {
          allow read, write: if request.auth != null;
        }
      }
    }
    ```

### 2. Environment Variables

1.  Create a new file named `.env` in the root of the project.
2.  Copy the contents of `.env.example` into your new `.env` file.
3.  Fill in the values with the credentials from your Firebase project settings.

### 3. Installation & Running

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:9002`.

## 📄 Pages & Functionality

-   **/login**: Secure login page using Firebase Authentication.
-   **/dashboard**: The main landing page after login, providing a high-level overview of logistics data.
-   **/delivery-entry**: A form to create new delivery records, which are saved to Firestore. Includes file upload capabilities for PODs.
-   **/pod-view**: A real-time table displaying all delivery records from Firestore, with links to download uploaded files.
-   **/payments**: A page to review employee payment details.
-   **/ai-suggestor**: An intelligent tool that uses Genkit AI to recommend the best delivery service for a given route.