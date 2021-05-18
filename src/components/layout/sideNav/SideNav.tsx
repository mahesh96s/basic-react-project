import React, {useContext, useState} from 'react';
import { UserContext } from '../../../services/UserContext';
import { UserContextType } from '../../../schema/User';
import { Link } from '@reach/router';

const SideNav = () => {
    const { currentUser }  = useContext(UserContext) as UserContextType;

    if (currentUser && currentUser.loggedIn) {
        return (
            <div className="side-nav-bar">
                <div className="side-nav-links">
                    <Link to="/dashboard">Dashboard</Link>
                </div>
                <div className="side-nav-links">
                    <Link to="/users">User</Link>
                </div>
            </div>
        );
    }
    return null;
}

export default SideNav;