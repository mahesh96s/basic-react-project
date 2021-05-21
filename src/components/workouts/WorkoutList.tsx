import { RouteComponentProps } from '@reach/router';
import React, { useEffect, useState } from 'react';
import { getWorkoutsList } from '../../services/workoutAPI';
import { WorkoutFilterParams, Workout } from '../../schema/Workout';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchParams from '../shared/SearchParams';
import WorkoutListItem from './WorkoutListItem';

const WorkoutList = ({ path } : RouteComponentProps) => {
    const [ workoutsList, setWorkoutsList ] = useState([]);
    const [ workoutFilterParams, setWorkoutFilterParams ] = useState<WorkoutFilterParams>({
        pageSize: 20,
        currentPage: 1,
        searchText: ''
    });
    const [ totalItems, setTotalItems ] = useState(0);
    const [ searchValue, setSearchValue ] = useState('');

    const getWorkouts = (scrollEvent?: boolean) => {
        const filterParams = workoutFilterParams;
        if (scrollEvent) {
            filterParams.currentPage = filterParams.currentPage + 1;
        }
        filterParams.searchText = searchValue.length > 0 ? searchValue: '';
        setWorkoutFilterParams(filterParams);
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


    useEffect(() => {
        const filterParams = workoutFilterParams;
        filterParams.currentPage = 1;
        setWorkoutFilterParams(filterParams);
        getWorkouts();
    }, [workoutFilterParams, setWorkoutFilterParams, searchValue, setSearchValue]);

    return (
        <div className="workout-list">
            <div className="workout-header">
                <div className="workout-title">
                    Workouts
                </div>
                <SearchParams searchValue={searchValue} setSearchValue={setSearchValue}/>
                <WorkoutFilters filterParams={workoutFilterParams} setFilterParams={setWorkoutFilterParams} />
            </div>
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
                        { workoutsList.map((workout: Workout, index: number) => {
                            return (
                                <WorkoutListItem key={index} workout={workout} />
                            );
                        })}
                    </div>
                </InfiniteScroll>
			)}
        </div>
    );
}

export default WorkoutList;