import React, { createContext, useState, useEffect, ReactChild } from "react";
import { IsUserLoggedIn, UserContextType } from "../schema/User";
import { isLoggedIn } from "./authAPI";

export const UserContext = createContext<UserContextType>(null);

const UserContextProvider = ({children}: { children: ReactChild }) => {
    const [currentUser, setCurrentUser] = useState<IsUserLoggedIn>(null);

    useEffect(() => {
        isLoggedIn().then(data => {
            setCurrentUser(data);
            return data;
        });
    }, []);

    return (
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
            {currentUser && children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;