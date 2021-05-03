import axios from 'axios';
import { environment } from '../environment/environment';

export const userLogin = (credentials) => {
    return axios(`${environment.API_URL}/sessions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
        data: credentials
    });
}

export const userLogout = () => {
    return axios(`${environment.API_URL}/sessions`, {
        method: 'Delete',
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
}

export const userSignUp = (credentials) => {
    return axios(`${environment.API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
        data: credentials
    });
}

export const isLoggedIn = () => {
    return axios(`${environment.API_URL}/is_logged_in`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
}