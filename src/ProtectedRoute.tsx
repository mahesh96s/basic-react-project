import React, { ComponentState, useContext } from 'react';
import { Redirect } from '@reach/router';
import { UserContext } from './services/UserContext';

const ProtectedRoute = ({ path: path, component: Component }: { path: string, component: ComponentState }) => {
    const { currentUser } = useContext(UserContext);
    if(currentUser && currentUser.loggedIn) {
        return (<Component path={path}/>)
    } else {
        return (<Redirect noThrow={true} to="/login" />)
    }
}

export default ProtectedRoute;