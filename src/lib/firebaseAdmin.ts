import * as admin from 'firebase-admin';

// Attempt to resolve opentelemetry issue in some Next.js environments
try {
  require('@opentelemetry/api');
} catch (e) {
  // Ignore if not present at runtime
}

if (!admin.apps.length) {
  try {
    const projectId = process.env.FIREBASE_PROJECT_ID || 'hindustanscrap-9a424';
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (clientEmail && privateKey) {
      admin.initializeApp({
        projectId,
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
    } else {
      admin.initializeApp({
        projectId,
        credential: admin.credential.applicationDefault()
      });
    }
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

export const adminDb = admin.firestore();
export const adminStorage = admin.storage();
export const adminAuth = admin.auth();
export { admin as firebaseAdmin };
