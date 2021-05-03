import { Link, navigate } from '@reach/router';
import React, { Component } from 'react';
import { userSignUp } from '../../../services/authAPI';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
        this.signUpSubmit = this.signUpSubmit.bind(this);
    }

    signUpSubmit(event) {
        event.preventDefault();
        userSignUp(this.state).then(() => {
            navigate('login');
        }, err => {
            console.log(err);
        });
    }

    render () {
        return (
            <div className="sign-up-container">
                <form onSubmit={this.signUpSubmit}>
                    <label className="sign-up-label">
                        First name
                        <div className="sign-up-text-field">
                            <input type="text" value={this.state.firstName} onChange={(event => this.setState({firstName: event.target.value}))} />
                        </div>
                    </label>
                    <label className="sign-up-label">
                        Last name
                        <div className="sign-up-text-field">
                            <input type="text" value={this.state.lastName} onChange={(event => this.setState({lastName: event.target.value}))} />
                        </div>
                    </label>
                    <label className="sign-up-label">
                        Email
                        <div className="sign-up-text-field">
                            <input type="text" value={this.state.email} onChange={(event => this.setState({email: event.target.value}))} />
                        </div>
                    </label>
                    <label className="sign-up-label">
                        Password
                        <div className="sign-up-text-field">
                            <input type="password" value={this.state.password} onChange={(event => this.setState({password: event.target.value}))} />
                        </div>
                    </label>
                    <input className="sign-up-button" type="submit" value="Sign Up" />
                </form>
                <div className="login-link">
                    <Link to='/login'>Go back to login</Link>
                </div>
            </div>
        );
    }
}

export default SignUp;