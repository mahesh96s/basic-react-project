import React, { useContext } from 'react';
import { render, cleanup, fireEvent, act, waitFor, screen } from '@testing-library/react';
import Login from './Login';
import { userLogin } from '../../../services/authAPI';
import UserContextProvider, { UserContext } from '../../../services/UserContext';

jest.mock("../../../services/authAPI", () => ({
    isLoggedIn: jest.fn(() => Promise.resolve({loggedIn: false, user: {}})),
    userLogin: jest.fn((credentials) => {
        if(credentials.email === 'admin@junkyardgym.com') {
            return Promise.resolve(userData);
        }
        return Promise.reject({
            message: 'Invalid email and password'
        });
    })
}));

const TestUser = () => {
    const {currentUser} = useContext(UserContext);
    return (
        <>
            { currentUser && currentUser.loggedIn &&
                <>
                    <span data-testid="user-name">{currentUser.user.firstName} {currentUser.user.lastName}</span>
                    <span data-testid="email">{currentUser.user.email}</span>
                </>
            }
        </>
    )
}

const userData = {
    user: {
      id: 1,
      firstName: "JYG",
      lastName: "Admin",
      email: "admin@junkyardgym.com",
      roleId: 1,
      active: true,
      timeZone: "Asia/Calcutta",
      profileImageURL: "https://dev.junkyardgym.com/api/users/1/profile-image/1595401897506-sample.jpg",
      lastLogin: "2020-06-16T05:04:53.000Z",
      lastSeen: "2020-06-16T05:04:53.000Z",
      createdAt: "2020-05-11T06:16:58.000Z",
      role: {
        id: 1,
        name: "admin"
      }
    }
}

afterEach(() => {
    jest.clearAllMocks();
    return cleanup;
});

describe('login page', () => {

    test('Rendering login page', () => {
        render(<Login />);
        expect(screen.getByText('create new account')).toBeInTheDocument();
    });

    test('It should submit login form successfully', async () => {
        act(() => {
            render(<UserContextProvider>
                        <>
                            <Login />
                            <TestUser />
                        </>
                    </UserContextProvider>);
        });
        const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
        const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
        const submit = screen.getByRole('button', { name: 'Login' });
        fireEvent.change(emailInput, { target: { value: 'admin@junkyardgym.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        act(() => {
            fireEvent.click(submit);
        });
        await waitFor(() => {
            expect(userLogin).toHaveBeenCalledTimes(1);
            expect(userLogin).toHaveReturned();
            expect((screen.getByTestId('user-name') as HTMLInputElement).textContent).toBe('JYG Admin');
            expect((screen.getByTestId('email') as HTMLInputElement).textContent).toBe('admin@junkyardgym.com');
        });
    });

    test('On submit it should fail when user enters invalid email', async () => {
        act(() => {
            render(<UserContextProvider><Login /></UserContextProvider>);
        });
        const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
        const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
        const submit = screen.getByRole('button', { name: 'Login' });
        fireEvent.change(emailInput, { target: { value: 'admin@jyg.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        act(() => {
            fireEvent.click(submit);
        });
        await waitFor(() => {
            expect(userLogin).toHaveBeenCalledTimes(1);
            expect(userLogin).toHaveReturned();
            expect(screen.getByText('Invalid email and password')).toBeInTheDocument();
        });
    });

    test('It should set the input value', () => {
        render(<Login />);
        const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
        const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
        fireEvent.change(emailInput, { target: { value: 'admin@junkyardgym.com' } });
        fireEvent.change(passwordInput, { target: { value: 'p@ssw0rd' } });
        expect(emailInput.value).toBe('admin@junkyardgym.com');
        expect(passwordInput.value).toBe('p@ssw0rd');
    });

    test('Validation for invalid email', async () => {
        render(<Login />);
        const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
        fireEvent.change(emailInput, { target: { value: 'email' } });
        await waitFor(() => expect(screen.getByTestId('email-error-message')).toBeInTheDocument());
    });

});