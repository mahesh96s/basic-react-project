import { Link, navigate } from '@reach/router';
import React, {useState, useContext} from 'react';
import { userLogin } from '../../../services/authAPI';
import { UserContext } from '../../../services/UserContext';

const Login = () => {
    const emailRegExp = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    const { setCurrentUser } = useContext(UserContext);
    const [state, setState] = useState({
        email: '',
        password: '',
        formErrors: {
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


    const loginSubmit = (event) => {
        event.preventDefault();
        if (formValidate(state)) {
            const params = {
                email: state.email,
                password: state.password
            }
            userLogin(params).then(data => {
                setCurrentUser({loggedIn: true, user: data.user});
                navigate('dashboard');
            }, err => {
                console.log(err);
            });
        }
    }

    const handleInputChange = (event) => {
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
        <div className="login-page">
            <div className="login-container">
                <form onSubmit={loginSubmit}>
                    <label className="login-label">
                        Email
                        <div className="login-text-field">
                            <input type="email" name="email" value={state.email} onChange={handleInputChange}/>
                        </div>
                        {state.formErrors.email.length > 0 && (
                            <div className="error-message">
                                {state.formErrors.email}
                            </div>)
                        }
                    </label>
                    <label className="login-label">
                        Password
                        <div className="login-text-field">
                            <input type="password" name="password" value={state.password} onChange={handleInputChange}/>
                        </div>
                        {state.formErrors.password.length > 0 && (
                            <div className="error-message">
                                {state.formErrors.password}
                            </div>)
                        }
                    </label>
                    <input className="login-button" type="submit" value="Login" />
                </form>
                <div className="sign-up-link">
                    <Link to='/sign-up'>create new account</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;