import { Router } from '@reach/router';
import React, { lazy, Suspense } from 'react';
import { render } from 'react-dom';
import Header from './components/layout/header/Header';
import Login from './components/auth/login/Login';
const SignUp = lazy(() => import('./components/auth/sign-up/SignUp'));
const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));
import UserContextProvider from './services/UserContext';
import ProtectedRoute from './ProtectedRoute';
import PageNotFound from './components/page-not-found/PageNotFound';
import Home from './components/home/Home';
import PublicRoute from './PublicRoute';
import SideNav from './components/layout/sideNav/SideNav';
const UserList = lazy(() => import('./components/user/UserList'));
const WorkoutList = lazy(() => import('./components/workouts/WorkoutList'));
const FeedsList = lazy(() => import('./components/feeds/FeedsList'));
import { Spinner } from 'react-bootstrap';

const App = () => {
  return (
    <React.StrictMode>
      <UserContextProvider>
        <div className="page-layout">
          <Header />
          <div className="content-layout row">
            <SideNav />
            <div className="content col-10">
              <Suspense fallback={
                  <div className="load-spinner">
                    <Spinner animation="border" variant="primary" />
                  </div>
                }>
                <Router>
                  <Home path="/" />
                  <PublicRoute path="login" component={Login} />
                  <PublicRoute path="sign-up" component={SignUp} />
                  <ProtectedRoute path="dashboard" component={Dashboard} />
                  <ProtectedRoute path="users" component={UserList} />
                  <ProtectedRoute path="workouts" component={WorkoutList} />
                  <ProtectedRoute path="feeds" component={FeedsList} />
                  <PageNotFound default={true} />
                </Router>
              </Suspense>
            </div>
          </div>
        </div>
      </UserContextProvider>
    </React.StrictMode>
  )
}

render(<App />, document.getElementById("root"));

export default App;