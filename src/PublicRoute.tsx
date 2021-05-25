import React, { ComponentState, useContext } from 'react';
import { Redirect } from '@reach/router';
import { UserContext } from './services/UserContext';

const PublicRoute = ({ path: path, component: Component }: { path: string, component: ComponentState }) => {
    const { currentUser } = useContext(UserContext);
    if(currentUser && currentUser.loggedIn) {
        return (<Redirect noThrow={true} to="/dashboard" />)
    } else {
        return (<Component path={path} />)
    }
}

export default PublicRoute;