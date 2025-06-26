import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, type FirebaseStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCdvMxV0kqomDEb43vZLTXXle4g-5LyY2c",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "cert-project-dsr.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "cert-project-dsr",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "cert-project-dsr.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "503864319434",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:503864319434:web:ce11fd1de539d28f910333",
};

export const isFirebaseConfigured = !!(
    firebaseConfig.apiKey && 
    firebaseConfig.projectId && 
    firebaseConfig.storageBucket &&
    firebaseConfig.apiKey !== "YOUR_API_KEY"
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let firestore: Firestore | null = null;
let storage: FirebaseStorage | null = null;

if (isFirebaseConfigured) {
    try {
        app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
        auth = getAuth(app);
        firestore = getFirestore(app, "deliveries");
        storage = getStorage(app);
    } catch (e) {
        console.error("Firebase initialization error. Are your .env variables correct?", e);
    }
} else {
    console.warn("Firebase is not configured. Functionality will be limited. Please add your credentials to .env");
}

export { app, auth, firestore, storage };
