import { navigate, Router } from '@reach/router';
import React, { Component } from 'react';
import { render } from 'react-dom';
import Header from './components/layout/header/Header';
import Login from './components/auth/login/Login';
import SignUp from './components/auth/sign-up/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import { isLoggedIn } from './services/authAPI';

class App extends Component {

  componentDidMount() {
    isLoggedIn().then(({ data }) => {
      if (data.loggedIn) {
        navigate('/dashboard');
      }
    });
  }

  render() {
    return (
      <React.StrictMode>
        <div className="page-layout">
          <Header />
          <Router>
            <Login path="/login" />
            <SignUp path="/sign-up" />
            <Dashboard path="/dashboard" />
          </Router>
        </div>
      </React.StrictMode>
    )
  }
}

render(<App />, document.getElementById("root"));
