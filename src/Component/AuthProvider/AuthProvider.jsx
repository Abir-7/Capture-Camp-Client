import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import app from '../../FirebaseConfig/FirebaseConfig';
import axios, { Axios } from 'axios';


const auth = getAuth(app);
export const Authcontext = createContext(null)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);



    //////////Create User////////
    const createUser = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    ///////////Update Name////////
    const updateUserProfile = (name, photourl) => {
        setLoader(true)
        return updateProfile(auth.currentUser, {
            displayName: `${name}`, photoURL: `${photourl}`
        })
    }
    ///////////loginUser/////////
    const loginUser = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    /////////google login//////
    const g_provider = new GoogleAuthProvider();
    const googleSignin = () => {
        setLoader(true)
        return signInWithPopup(auth, g_provider)
    }

    ////////////logOut////////////
    const logoutUser = () => {

        signOut(auth)
    }

    ///////////////Observer//////////////
    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (loguser) => {
            setUser(loguser);

            if(loguser){
                axios.post('https://capture-camp-server.vercel.app/jwt', {email: loguser.email})
                .then(data =>{
                    // console.log(data.data.token)
                    localStorage.setItem('access-token', data.data.token)
                  
                })
            }
            else{
 
                localStorage.removeItem('access-token')
            }
            setLoader(false);
        });
        return () => { unsubcribe() };
    }, [])



    const authinfo = {
        user,
        loader,
        createUser,
        loginUser,
        logoutUser,
        updateUserProfile,
        googleSignin,

    };

    return (
    <Authcontext.Provider value={authinfo}>
        <>
        {children}
        </>
     </Authcontext.Provider>
    );
};

export default AuthProvider;