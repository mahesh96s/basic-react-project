import { Link, navigate } from '@reach/router';
import React, { Component } from 'react';
import { userLogin } from '../../../services/authAPI';
import { UserContext } from '../../../services/UserContext';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.loginSubmit = this.loginSubmit.bind(this);
    }

    loginSubmit(event) {
        event.preventDefault();
        userLogin(this.state).then(data => {
            const { updateUser } = this.context;
            updateUser({loggedIn: true, user: data});
            navigate('dashboard');
        }, err => {
            console.log(err);
        });
    }

    render () {
        return (
            <div className="login-container">
                <form onSubmit={this.loginSubmit}>
                    <label className="login-label">
                        Email
                        <div className="login-text-field">
                            <input type="text" value={this.state.email} onChange={(event => this.setState({email: event.target.value}))}/>
                        </div>
                    </label>
                    <label className="login-label">
                        Password
                        <div className="login-text-field">
                            <input type="password" value={this.state.password} onChange={(event => this.setState({password: event.target.value}))}/>
                        </div>
                    </label>
                    <input className="login-button" type="submit" value="Login" />
                </form>
                <div className="sign-up-link">
                    <Link to='/sign-up'>create new account</Link>
                </div>
            </div>
        );
    }
}

Login.contextType = UserContext;

export default Login;