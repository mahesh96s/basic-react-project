import moment from 'moment';
import React from 'react';
import { Card } from 'react-bootstrap';
import { Workout } from '../../schema/Workout';

const WorkoutListItem = ({ workout }: {workout: Workout}) => {

    const getImage = (imageUrl: string) => {
        return imageUrl;
    }

    return (
        <Card key={workout.id}>
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
}

export default WorkoutListItem;