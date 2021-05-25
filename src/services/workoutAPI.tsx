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
    return axios(`${environment.API_URL}/workouts`, {
        ...httpHeader,
        method: 'GET',
        params: credentials
    }).then(({data}) => {
        return data
    });
}
