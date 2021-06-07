import { Link, navigate, RouteComponentProps } from '@reach/router';
import React, {useState, useContext, FormEvent, ChangeEvent} from 'react';
import { UserContextType, UserFormFieldError, UserFormFields } from '../../../schema/User';
import { userLogin } from '../../../services/authAPI';
import { UserContext } from '../../../services/UserContext';

const Login = ({ path } : RouteComponentProps) => {
    const emailRegExp = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    const { setCurrentUser } = useContext(UserContext) as UserContextType;
    const [state, setState] = useState<UserFormFields>({
        email: '',
        password: '',
        formErrors: {
            email: '',
            password: ''
        }
    });

    const formValidate = (formField: UserFormFields) => {
        let formValid = true;
        Object.entries(formField).map(([key, value]) => {
            if (value.length < 1) {
                const fieldName = key.replace(/([A-Z])/g, "$1");
                value = `${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)} cannot be empty`;
                formValid = false;
            } else if (key === 'email' && !emailRegExp.test(value)) {
                value = 'Invalid email Id';
                formValid = false;
            } else if (key !== 'formErrors') {
                value = '';
            }
        });
        setState(formField);
        return formValid;
    }


    const loginSubmit = (event: FormEvent) => {
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

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const formErrors: UserFormFieldError = state.formErrors!;
        if (name === 'email') {
            formErrors.email = value.length < 1 ? 'Email cannot be empty' : '';
            if (!emailRegExp.test(value)) {
                formErrors.email = 'Invalid email Id';
            }
        } else {
            formErrors.password = value.length < 1 ? 'Password cannot be empty' : '';
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
                        {state.formErrors!.email!.length > 0 && (
                            <div data-testid="email-error-message" className="error-message">
                                {state.formErrors!.email}
                            </div>)
                        }
                    </label>
                    <label className="login-label">
                        Password
                        <div className="login-text-field">
                            <input type="password" name="password" value={state.password} onChange={handleInputChange}/>
                        </div>
                        {state.formErrors!.password!.length > 0 && (
                            <div className="error-message">
                                {state.formErrors!.password}
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