import { Router } from '@reach/router';
import React from 'react';
import { render } from 'react-dom';
import Header from './components/layout/header/Header';
import Login from './components/auth/login/Login';
import SignUp from './components/auth/sign-up/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import UserContextProvider from './services/UserContext';
import ProtectedRoute from './ProtectedRoute';
import PageNotFound from './components/page-not-found/PageNotFound';
import Home from './components/home/Home';
import PublicRoute from './PublicRoute';
import SideNav from './components/layout/sideNav/SideNav';
import UserList from './components/user/UserList';

const App = () => {
  return (
    <React.StrictMode>
      <UserContextProvider>
        <div className="page-layout">
          <Header />
          <div className="content-layout">
            <SideNav />
            <div className="content">
              <Router>
                <Home path="/" />
                <PublicRoute path="login" component={Login} />
                <PublicRoute path="sign-up" component={SignUp} />
                <ProtectedRoute path="dashboard" component={Dashboard} />
                <ProtectedRoute path="users" component={UserList} />
                <PageNotFound default={true} />
              </Router>
            </div>
          </div>
        </div>
      </UserContextProvider>
    </React.StrictMode>
  )
}

render(<App />, document.getElementById("root"));
