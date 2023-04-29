import { createContext, useEffect, useState } from "react";
import { onAuthStateChangedListner, createUserDocumentfromAuth } from "../utils/firebase/firebase.util";

export const UserContext = createContext(
    {
        currentUser: null,
        setCurrentUser: () => null,
    }
);

export const UserProvider = ({ children }) =>{
    const [currentUser, setCurrentUser] = useState(null);

    const value = {currentUser, setCurrentUser};

    // SignOutUser();

    useEffect(()=>{
        const unsubscribe = onAuthStateChangedListner((user)=>{
            // console.log(user);
            if(user){
                createUserDocumentfromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubscribe;
    },[]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
