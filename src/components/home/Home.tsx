import React, { useContext } from 'react';
import { Redirect, RouteComponentProps } from '@reach/router';
import { UserContext } from '../../services/UserContext';
import { UserContextType } from '../../schema/User';

const Home = ({ path } : RouteComponentProps) => {
    const { currentUser } = useContext(UserContext) as UserContextType;
    if (currentUser && currentUser.loggedIn) {
        return (<Redirect noThrow={true} to="/dashboard" />)
    }
    return (<Redirect noThrow={true} to="/login" />)
}

export default Home;