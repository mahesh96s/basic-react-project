import React, { ComponentState, useContext } from 'react';
import { Redirect } from '@reach/router';
import { UserContext } from './services/UserContext';

const ProtectedRoute = ({ path: path, component: Component }: { path: string, component: ComponentState }) => {
    const { currentUser } = useContext(UserContext);
    const adminPages = ['dashboard', 'users', 'workouts', 'feeds'];
    const userPages = ['dashboard', 'workouts', 'feeds'];
    if(currentUser && currentUser.loggedIn) {
        if (currentUser.user.role.name === 'admin' && adminPages.some(pageName => pageName === path)) {
            return (<Component path={path}/>);
        } else if (currentUser.user.role.name === 'user' && userPages.some(pageName => pageName === path)) {
            return (<Component path={path}/>);
        }
        return (<Redirect noThrow={true} to="/dashboard" />);
    } else {
        return (<Redirect noThrow={true} to="/login" />);
    }
}

export default ProtectedRoute;