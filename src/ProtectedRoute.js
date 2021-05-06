import React, { useContext } from 'react';
import { Redirect } from '@reach/router';
import { UserContext } from './services/UserContext';

const ProtectedRoute = ({ path: path, component: Component }) => {
    const user = useContext(UserContext);
    if(user.loggedIn) {
        return (<Component path={path}/>)
    } else {
        return (<Redirect noThrow to="/login" />)
    }
}

export default ProtectedRoute;