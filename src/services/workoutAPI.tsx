import { environment } from '../environment/environment';
import { WorkoutFilterParams } from '../schema/Workout';
import axiosApiInstance from './interceptors';

export const getWorkoutsList = (credentials: WorkoutFilterParams) => {
    return axiosApiInstance(`${environment.API_URL}/workouts/search`, {
        method: 'POST',
        data: credentials
    }).then(({data}) => {
        return data
    });
}

export const getMediaTypes = () => {
    return axiosApiInstance(`${environment.API_URL}/mediaTypes`, {
        method: 'GET'
    }).then(({data}) => {
        return data
    });
}
