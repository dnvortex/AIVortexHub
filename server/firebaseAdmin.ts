import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
let firebaseApp: admin.app.App;

// Function to get the Firebase Admin app instance
export function getFirebaseAdminApp() {
  if (!firebaseApp) {
    // Try to initialize with environment variables
    try {
      // Check for required Firebase config
      const hasFirebaseConfig = !!(
        process.env.FIREBASE_API_KEY && 
        process.env.FIREBASE_PROJECT_ID
      );
      
      if (!hasFirebaseConfig) {
        console.warn('Firebase configuration is incomplete. Some features may not work correctly.');
        throw new Error('Firebase configuration is incomplete');
      }
      
      // For production or when service account JSON is provided
      if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        // Parse the service account JSON from environment variable
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        
        firebaseApp = admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET
        });
      } 
      // For development, initialize with Google Application Default Credentials
      else {
        firebaseApp = admin.initializeApp({
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        });
      }
      
      console.log("Firebase Admin SDK initialized successfully");
    } catch (error) {
      console.error("Error initializing Firebase Admin SDK:", error);
      // Create a placeholder app instead of throwing
      firebaseApp = admin.initializeApp(undefined, 'placeholder-app');
      console.warn("Using placeholder Firebase app - some features will be limited");
    }
  }
  
  return firebaseApp;
}

// Export common Firebase Admin services
export function getFirestore() {
  return getFirebaseAdminApp().firestore();
}

export function getAuth() {
  return getFirebaseAdminApp().auth();
}

export function getStorage() {
  return getFirebaseAdminApp().storage();
}