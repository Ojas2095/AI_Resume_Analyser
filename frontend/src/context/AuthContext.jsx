import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db, googleProvider } from '../firebase';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userRole, setUserRole] = useState(null); // 'student' | 'hr'
    const [loading, setLoading] = useState(true);

    // Listen to Firebase auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            if (user) {
                // Load role from Firestore
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserRole(docSnap.data().role);
                }
            } else {
                setUserRole(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    async function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    async function loginWithGoogle() {
        const result = await signInWithPopup(auth, googleProvider);
        // Check if this Google user already has a role assigned
        const docRef = doc(db, 'users', result.user.uid);
        const docSnap = await getDoc(docRef);
        // Return whether they need role selection (new Google user)
        return { user: result.user, needsRole: !docSnap.exists() };
    }

    async function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    async function saveUserRole(uid, role) {
        await setDoc(doc(db, 'users', uid), { role }, { merge: true });
        setUserRole(role);
    }

    async function checkUserRole(uid) {
        const docSnap = await getDoc(doc(db, 'users', uid));
        return { userRole: docSnap.exists() ? docSnap.data().role : null };
    }

    async function logout() {
        await signOut(auth);
        setUserRole(null);
    }

    const value = {
        currentUser,
        userRole,
        loading,
        login,
        loginWithGoogle,
        signup,
        saveUserRole,
        checkUserRole,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
