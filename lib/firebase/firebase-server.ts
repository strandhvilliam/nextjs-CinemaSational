import admin, { app, credential } from "firebase-admin";

import serviceAccount from "../serviceAccount.json"

if(!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as any),
    })
}

console.log("Firebase admin initialized")
export const db = admin.firestore()


