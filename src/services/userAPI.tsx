import axios from 'axios';
import { environment } from '../environment/environment';
import { UserFormFields } from '../schema/User';

const httpHeader = {
    headers:  {
        'Content-Type': 'application/json'
    },
    withCredentials: true
}

export const updateUser = (credentials: UserFormFields, userId: number) => {
    return axios(`${environment.API_URL}/users/${userId}`, {
        ...httpHeader,
        method: 'PUT',
        data: credentials
    }).then(({data}) => {
        return data
    });
}

export const updateUserProfilePhoto = (formData: FormData) => {
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