import { RouteComponentProps } from '@reach/router';
import React, { useEffect, useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import moment from 'moment';
import { getWorkoutsList } from '../../services/workoutAPI';
import { WorkoutFilterParams, Workouts } from '../../schema/Workout';
import InfiniteScroll from 'react-infinite-scroll-component';

const WorkoutList = ({ path } : RouteComponentProps) => {
    const [ workoutsList, setWorkoutsList ] = useState([]);
    const [ workoutFilterParams, setWorkoutFilterParams ] = useState<WorkoutFilterParams>({
        pageSize: 20,
        currentPage: 1,
        q: ''
    });
    const [ totalItems, setTotalItems ] = useState<number>(0);

    const getWorkouts = (scrollEvent?: boolean) => {
        if (scrollEvent) {
            setWorkoutFilterParams((filterParams) => {
                filterParams.currentPage = filterParams.currentPage + 1;
                return filterParams;
            });
        }
        getWorkoutsList(workoutFilterParams).then(data => {
            setTotalItems(data.totalItems);
            if (scrollEvent) {
                setWorkoutsList([...workoutsList, ...data.workouts]);
            } else {
                setWorkoutsList(data.workouts);
            }
            return data;
        });
    }

    const onScroll = () => {
        if (workoutsList.length < totalItems) {
            getWorkouts(true);
        }
    }

    const getImage = (imageUrl: string) => {
        return imageUrl;
    }

    useEffect(() => {
        getWorkouts();
    }, []);

    return (
        <div className="workout-list">
            { workoutsList.length === 0 ? (
				<h1>No Workouts found</h1>
			) : (
                <InfiniteScroll
                    dataLength={ workoutsList.length }
                    next={onScroll}
                    hasMore={ workoutsList.length < totalItems }
                    loader={
                        <div className="text-align-center">
                            <div>Loading ...</div>
                        </div>
                    }
                    >
                    <div className="workout-list-container">
                        { workoutsList.map((workout: Workouts, index: number) => {
                            return (
                                <Card key={index}>
                                    <Card.Img variant="top" src={getImage(workout.videoThumbnailUrl)} alt="Profile Pic" />
                                    <Card.Body>
                                        <Card.Title>
                                            { workout.title }
                                            <span className="workout-status">
                                                { workout.active ? (<span className="active">Active</span>) : (<span className="inactive">InActive</span>)}
                                            </span>
                                        </Card.Title>
                                        <div>{ workout.description }</div>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">Last updated {moment(workout.updated_at).format('LL')}</small>
                                    </Card.Footer>
                                </Card>
                            );
                        })}
                    </div>
                </InfiniteScroll>
			)}
        </div>
    );
}

export default WorkoutList;