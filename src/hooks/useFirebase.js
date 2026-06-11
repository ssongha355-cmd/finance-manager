import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { DEFAULT_FIREBASE_CONFIG } from '../utils/constants';

let firebaseApp = null;
let firebaseAuth = null;
let firebaseDb = null;

export const initializeFirebase = async () => {
    try {
        if (getApps().length === 0) {
            firebaseApp = initializeApp(DEFAULT_FIREBASE_CONFIG);
        } else {
            firebaseApp = getApp();
        }

        firebaseAuth = getAuth(firebaseApp);
        firebaseDb = getFirestore(firebaseApp);

        await signInAnonymously(firebaseAuth);
        return { app: firebaseApp, auth: firebaseAuth, db: firebaseDb };
    } catch (error) {
        console.error('Firebase initialization error:', error);
        throw error;
    }
};

export const getFirebaseAuth = () => firebaseAuth;
export const getFirebaseDb = () => firebaseDb;
export const getFirebaseApp = () => firebaseApp;
