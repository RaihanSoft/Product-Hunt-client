/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import axios from "axios";

export const Context = createContext();

export const Provider = ({ children }) => {
    const Googleprovider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [price, setprice] = useState(5000);  // Price for subscription


    const [visa, setVisa] = useState({});


    // Register
    const handleRegister = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Login
    const handleLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Signout
    const handleLogOut = () => {
        signOut(auth);
    };

    const handleGoogleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, Googleprovider);
    }

    // Update Profile
    const manageProfile = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image,
        }).then(() => {

            setUser({
                ...auth.currentUser,
                displayName: name,
                photoURL: image,
            });
        });
    };

    // Observer
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);
    
            try {
                if (currentUser?.email) {
                    setUser({
                        ...currentUser,
                        photoURL: currentUser.photoURL,
                    });
    
                    const { data } = await axios.post(
                        'http://localhost:5000/jwt',
                        { email: currentUser?.email },
                        { withCredentials: true }
                    );
    
                    console.log("Login successful", data);
                } else {
                    setUser(null);
    
                    const { data } = await axios.post(
                        'http://localhost:5000/logout',
                        {},
                        { withCredentials: true }
                    );
    
                    console.log("Logout successful", data);
                }
            } catch (error) {
                console.error("Error in authentication observer:", error);
            } finally {
                setLoading(false);
            }
        });
    
        return () => unSubscribe();
    }, []);
    


    const authInfo = {
        handleRegister,
        handleLogin,
        handleLogOut,
        handleGoogleLogin,
        manageProfile,
        user,
        setUser,
        loading,
        visa,
        setVisa,
        price,
        setprice
    };

    return (
        <Context.Provider value={authInfo}>
            {children}
        </Context.Provider>
    );
};