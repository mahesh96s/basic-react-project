import React, { createContext, useState, useEffect } from "react";
import { isLoggedIn } from "./authAPI";

export const UserContext = createContext([{}, () => {}]);

const UserContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState();

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