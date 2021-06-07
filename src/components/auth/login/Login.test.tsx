import React from 'react';
import { render, cleanup, fireEvent, act, waitFor, screen } from '@testing-library/react';
import Login from './Login';
import { userLogin } from '../../../services/authAPI';
import UserContextProvider from '../../../services/UserContext';

jest.mock("../../../services/authAPI", () => {
    return {
        isLoggedIn: jest.fn(() => Promise.resolve({loggedIn: false, user: {}})),
        userLogin: jest.fn(() => Promise.resolve(userData))
    };
});

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

afterEach(cleanup);

describe('login page', () => {

    test('Rendering login page', () => {
        render(<Login />);
    });

    test('It should submit login form', async () => {
        act(() => {
            render(<UserContextProvider><Login /></UserContextProvider>);
        });
        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const submit = screen.getByRole('button', { name: 'Login' });
        fireEvent.change(emailInput, { target: { value: 'admin@junkyardgym.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        act(() => {
            fireEvent.click(submit);
        });
        await waitFor(() => expect(userLogin).toHaveBeenCalledTimes(1));
    });

    test('It should set the input value', () => {
        const componentElement = render(<Login />);
        const emailInput = componentElement.getByLabelText('Email') as HTMLInputElement;
        const passwordInput = componentElement.getByLabelText('Password') as HTMLInputElement;
        fireEvent.change(emailInput, { target: { value: 'admin@junkyardgym.com' } });
        fireEvent.change(passwordInput, { target: { value: 'p@ssw0rd' } });
        expect(emailInput.value).toBe('admin@junkyardgym.com');
        expect(passwordInput.value).toBe('p@ssw0rd');
    });

    test('Validation for invalid email', async () => {
        render(<Login />);
        const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
        fireEvent.change(emailInput, { target: { value: 'email' } });
        await waitFor(() => expect(screen.getByTestId('email-error-message')).not.toBeEmptyDOMElement);
    });

});