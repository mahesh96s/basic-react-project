import axios from 'axios';
import { environment } from '../environment/environment';

const httpHeader = {
    headers:  {
        'Content-Type': 'application/json'
    },
    withCredentials: true
}

export const userLogin = (credentials) => {
    return axios(`${environment.API_URL}/sessions`, {
        ...httpHeader,
        method: 'POST',
        data: credentials
    }).then(({data}) => {
        return data
    });
}

export const userLogout = () => {
    return axios(`${environment.API_URL}/sessions`, {
        ...httpHeader,
        method: 'Delete'
    }).then(({data}) => {
        return data
    });
}

export const userSignUp = (credentials) => {
    return axios(`${environment.API_URL}/users`, {
        ...httpHeader,
        method: 'POST',
        data: credentials
    });
}

export const isLoggedIn = () => {
    return axios(`${environment.API_URL}/is_logged_in`, {
        ...httpHeader,
        method: 'GET'
    }).then(({data}) => {
        if (!data) {
            return { loggedIn: data.loggedIn, user: {} };
        }
        return data;
    });
}