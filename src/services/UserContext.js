import React, { createContext, useState, useEffect } from "react";
import { isLoggedIn } from "./authAPI";

export const UserContext = createContext([{}, () => {}]);

const UserContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        return isLoggedIn().then(data => {
            setCurrentUser(data);
        });
    }, []);

    return (
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;