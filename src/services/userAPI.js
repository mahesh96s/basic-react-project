import axios from 'axios';
import { environment } from '../environment/environment';

const httpHeader = {
    headers:  {
        'Content-Type': 'application/json'
    },
    withCredentials: true
}

export const updateUser = (credentials, userId) => {
    return axios(`${environment.API_URL}/users/${userId}`, {
        ...httpHeader,
        method: 'PUT',
        data: credentials
    }).then(({data}) => {
        return data
    });
}

export const updateUserProfilePhoto = (formData) => {
    return axios(`${environment.API_URL}/profile/photo`, {
        headers:  {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
        method: 'POST',
        data: formData
    }).then(({data}) => {
        return data
    });
}