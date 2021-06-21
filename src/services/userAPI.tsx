import { environment } from '../environment/environment';
import { UserFilterParams, UserFormFields } from '../schema/User';
import axiosApiInstance from './interceptors';


export const updateUser = (credentials: UserFormFields, userId: number) => {
    return axiosApiInstance(`${environment.API_URL}/users/${userId}`, {
        method: 'PUT',
        data: credentials
    }).then(({data}) => {
        return data
    });
}

export const updateUserProfilePhoto = (formData: FormData) => {
    return axiosApiInstance(`${environment.API_URL}/profile/photo`, {
        headers:  {
            'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        data: formData
    }).then(({data}) => {
        return data
    });
}

export const getUsersList = (credentials: UserFilterParams) => {
    return axiosApiInstance(`${environment.API_URL}/users`, {
        method: 'GET',
        params: credentials
    }).then(({data}) => {
        return data
    });
}

export const getTrainersList = (credentials: UserFilterParams) => {
    return axiosApiInstance(`${environment.API_URL}/trainers`, {
        method: 'GET',
        params: credentials
    }).then(({data}) => {
        return data
    });
}
