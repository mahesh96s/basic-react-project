import React from 'react';
import { render, cleanup, fireEvent, waitFor, screen, act } from '@testing-library/react';
import Header from './Header';
import UserContextProvider from '../../../services/UserContext';
import { userLogout } from '../../../services/authAPI';

const userData = {
    loggedIn: true,
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

jest.mock("../../../services/authAPI", () => ({
    isLoggedIn: jest.fn(() => Promise.resolve(userData)),
    userLogout: jest.fn(() => Promise.resolve())
}));

afterEach(() => {
    jest.clearAllMocks();
    return cleanup;
});

describe('Header layout', () => {

    test('Rendering header without login', () => {
        render(<Header />);
        const submitButton = screen.queryByText('submit');
        expect(submitButton).not.toBeInTheDocument();
    });

    test('Rendering header with login', async () => {
        act(() => {
            render(<UserContextProvider><Header /></UserContextProvider>);
        });
        const signOutButton = await screen.findByRole('button', { name: 'Sign out' });
        await waitFor(() => expect(signOutButton).toBeInTheDocument());
    });

    test('It should display Logo name', async () => {
        render(<Header />);
        expect(screen.queryByText('One Plus')).toBeInTheDocument();
    });

    test('clicking sign out button', async () => {
        act(() => {
            render(<UserContextProvider><Header /></UserContextProvider>);
        });
        const signOutButton = await screen.findByRole('button', { name: 'Sign out' });
        act(() => {
            fireEvent.click(signOutButton);
        });
        await waitFor(() => {
            expect(userLogout).toHaveBeenCalledTimes(1);
        });
    });

});
