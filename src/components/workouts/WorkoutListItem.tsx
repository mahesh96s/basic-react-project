import moment from 'moment';
import React from 'react';
import { Card } from 'react-bootstrap';
import { Workout } from '../../schema/Workout';
import Description from '../shared/Description';

const WorkoutListItem = ({ workout }: {workout: Workout}) => {

    const getImage = (workoutObj: Workout) => {
        if (workoutObj.mediaTypeId === 2) {
            return workoutObj.imageUrl
        }
        return workoutObj.videoThumbnailUrl;
    }

    return (
        <Card key={workout.id}>
            <Card.Img variant="top" src={getImage(workout)} alt="Profile Pic" />
            <Card.Body>
                <Card.Title>
                    { workout.title }
                    <span className="workout-status">
                        <span className={ workout.active ? "active": "inactive" }>{ workout.active ? "Active": "Inactive" }</span>
                    </span>
                </Card.Title>
                <Description descriptionText={workout.description} />
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Last updated {moment(workout.updated_at).format('LL')}</small>
            </Card.Footer>
        </Card>
    );
}

export default WorkoutListItem;