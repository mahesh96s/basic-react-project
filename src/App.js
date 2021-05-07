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

const App = () => {
  return (
    <React.StrictMode>
      <UserContextProvider>
        <div className="page-layout">
          <Header />
          <div className="content">
            <Router>
              <Home path="/" />
              <Login path="login" />
              <SignUp path="sign-up"/>
              <ProtectedRoute path="dashboard" component={Dashboard}/>
              <PageNotFound default />
            </Router>
          </div>
        </div>
      </UserContextProvider>
    </React.StrictMode>
  )
}

render(<App />, document.getElementById("root"));
