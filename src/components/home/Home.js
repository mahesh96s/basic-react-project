import React, { useContext } from 'react';
import { Redirect } from '@reach/router';
import { UserContext } from '../../services/UserContext';

const Home = () => {
    const { currentUser } = useContext(UserContext);
    if (currentUser && currentUser.loggedIn) {
        return (<Redirect noThrow to="/dashboard" />)
    }
    return (<Redirect noThrow to="/login" />)
}

export default Home;