import axios from 'axios';
import { environment } from '../environment/environment';
import { WorkoutFilterParams } from '../schema/Workout';

const httpHeader = {
    headers:  {
        'Content-Type': 'application/json'
    },
    withCredentials: true
}

export const getWorkoutsList = (credentials: WorkoutFilterParams) => {
    return axios(`${environment.API_URL}/workouts/search`, {
        ...httpHeader,
        method: 'POST',
        data: credentials
    }).then(({data}) => {
        return data
    });
}

export const getMediaTypes = () => {
    return axios(`${environment.API_URL}/mediaTypes`, {
        ...httpHeader,
        method: 'GET'
    }).then(({data}) => {
        return data
    });
}
