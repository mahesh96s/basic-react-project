import { Link, navigate } from '@reach/router';
import React, { useState } from 'react';
import { userSignUp } from '../../../services/authAPI';

const SignUp = () => {
    const emailRegExp = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        formErrors: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    });

    const formValidate = formField => {
        let formValid = true;
        let formErrors = state.formErrors;
        Object.entries(formField).forEach(([key, value]) => {
            if (value.length < 1) {
                formErrors[key] = `${key.toLowerCase()} cannnot be empty`;
                formValid = false;
            } else if (key === 'email' && !emailRegExp.test(value)) {
                formErrors.email = 'Invalid email Id';
                formValid = false;
            } else if (key !== 'formErrors') {
                formErrors[key] = '';
            }
        });
        setState((prevProps) => ({
            ...prevProps,
            formErrors
        }));
        return formValid;
    }

    const signUpSubmit = (event) => {
        event.preventDefault();
        if (formValidate(state)) {
            const params = {
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                password: state.password
            };
            userSignUp(params).then(() => {
                navigate('login');
            }, err => {
                console.log(err);
            });
        }
    }

    const handleInputChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let formErrors = state.formErrors;
        if (value.length < 1) {
            formErrors[name] = `${name.toLowerCase()} cannnot be empty`;
        } else if (name === 'email' && !emailRegExp.test(value)) {
            formErrors.email = 'Invalid email Id';
        } else {
            formErrors[name] = '';
        }
        setState((prevProps) => ({
          ...prevProps,
          [name]: value,
          formErrors
        }));
    };

    return (
        <div className="sign-up-page">
            <div className="sign-up-container">
                <form onSubmit={signUpSubmit}>
                    <label className="sign-up-label">
                        First name
                        <div className="sign-up-text-field">
                            <input type="text" name="firstName" value={state.firstName} onChange={handleInputChange}/>
                        </div>
                        {state.formErrors.firstName.length > 0 && (
                            <div className="error-message">
                                {state.formErrors.firstName}
                            </div>)
                        }
                    </label>
                    <label className="sign-up-label">
                        Last name
                        <div className="sign-up-text-field">
                            <input type="text" name="lastName" value={state.lastName} onChange={handleInputChange}/>
                        </div>
                        {state.formErrors.lastName.length > 0 && (
                            <div className="error-message">
                                {state.formErrors.lastName}
                            </div>)
                        }
                    </label>
                    <label className="sign-up-label">
                        Email
                        <div className="sign-up-text-field">
                            <input type="email" name="email" value={state.email} onChange={handleInputChange}/>
                        </div>
                        {state.formErrors.email.length > 0 && (
                            <div className="error-message">
                                {state.formErrors.email}
                            </div>)
                        }
                    </label>
                    <label className="sign-up-label">
                        Password
                        <div className="sign-up-text-field">
                            <input type="password" name="password" value={state.password} onChange={handleInputChange}/>
                        </div>
                        {state.formErrors.password.length > 0 && (
                            <div className="error-message">
                                {state.formErrors.password}
                            </div>)
                        }
                    </label>
                    <input className="sign-up-button" type="submit" value="Sign Up" />
                </form>
                <div className="login-link">
                    <Link to='/login'>Go back to login</Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;