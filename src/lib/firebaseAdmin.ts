import * as admin from 'firebase-admin';

// Attempt to resolve opentelemetry issue in some Next.js environments
try {
  require('@opentelemetry/api');
} catch (e) {
  // Ignore if not present at runtime
}

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      projectId: 'hindustanscrap-9a424',
      // To run locally with full admin privileges, ensure you set the 
      // GOOGLE_APPLICATION_CREDENTIALS environment variable 
      // pointing to your service account JSON file, or pass the credential object here.
      credential: admin.credential.applicationDefault()
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

export const adminDb = admin.firestore();
export const adminStorage = admin.storage();
export const adminAuth = admin.auth();
export { admin as firebaseAdmin };
