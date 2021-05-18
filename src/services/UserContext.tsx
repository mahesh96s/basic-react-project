import React, { createContext, useState, useEffect, ReactChild } from "react";
import { IsUserLoggedIn, UserContextType } from "../schema/User";
import { isLoggedIn } from "./authAPI";

export const UserContext = createContext<UserContextType>(null);

const UserContextProvider = ({children}: { children: ReactChild }) => {
    const [currentUser, setCurrentUser] = useState<IsUserLoggedIn>(null);

    useEffect(() => {
        isLoggedIn().then(data => {
            console.log('-------------', data);
            setCurrentUser(data);
            return data;
        }, err => {
            setCurrentUser({loggedIn: false, user: {}});
        });
    }, []);

    return (
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
            {currentUser && children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;