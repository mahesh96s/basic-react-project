import { environment } from '../environment/environment';
import axiosApiInstance from './interceptors';

export const getMyPostList = () => {
    return axiosApiInstance(`${environment.API_URL}/my/posts`, {
        method: 'GET'
    }).then(({data}) => {
        return data.posts;
    });
}

export const getMyFavouritePostList = () => {
    return axiosApiInstance(`${environment.API_URL}/my/favourites`, {
        method: 'GET'
    }).then(({data}) => {
        return data.posts;
    });
}
