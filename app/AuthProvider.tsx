'use client';

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { auth, firestore, googleAuthProvider } from "@/lib/firebase/firebase-client";
import { User } from "@firebase/auth";

interface Props {
    children?: ReactNode,
}

interface ContextType {
    user: User | null,
    loading: boolean,
    signInWithGoogle: () => Promise<void>,
    signOut: () => Promise<void>
}

const defaultUserValue = {
    user: null,
    loading: false,
    signInWithGoogle: async () => {},
    signOut: async () => {}
};

export const UserContext = createContext<ContextType>(defaultUserValue)

export const useAuth = () => {
    return useContext(UserContext);
}

const AuthProvider = ({children}: Props) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const signInWithGoogle = async () => {
        try {
            setLoading(true);
            await auth.signInWithPopup(googleAuthProvider);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const signOut = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.log(error)
        }
    }



    const checkIfUserIsRegistered = useCallback(async (user: any) => {
        const snapshot = await firestore.collection('users').doc(user.uid).get();
        const exists = snapshot.exists;

        if (!exists) {
            console.log("user is not registered")
            const userDoc = firestore.doc(`users/${user.uid}`);
            const batch = firestore.batch();
            batch.set(userDoc, {userId: user.uid, photoURL: user.photoURL, displayName: user.displayName})
            await batch.commit();
        }
    }, [])



    const value = {
        user,
        loading,
        signInWithGoogle,
        signOut,
    }

    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                checkIfUserIsRegistered(user).then(() => setLoading(false));
            } else {
                setUser(null);
                setLoading(false);
            }
        });
    }, [checkIfUserIsRegistered]);

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
}

export default AuthProvider;

