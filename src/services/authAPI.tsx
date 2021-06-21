import { environment } from '../environment/environment';
import { UserFormFields } from '../schema/User';
import axiosApiInstance from './interceptors';

export const userLogin = (credentials: UserFormFields) => {
    return axiosApiInstance(`${environment.API_URL}/sessions`, {
        method: 'POST',
        data: credentials
    }).then(({data}) => {
        return data
    });
}

export const userLogout = () => {
    return axiosApiInstance(`${environment.API_URL}/sessions`, {
        method: 'DELETE'
    });
}

export const userSignUp = (credentials: UserFormFields) => {
    return axiosApiInstance(`${environment.API_URL}/users`, {
        method: 'POST',
        data: credentials
    });
}

export const isLoggedIn = () => {
    return axiosApiInstance(`${environment.API_URL}/is_logged_in`, {
        method: 'GET'
    }).then(({data}) => {
        if (!data) {
            return { loggedIn: data.loggedIn, user: {} };
        }
        return data;
    });
}