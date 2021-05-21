import moment from 'moment';
import React from 'react';
import { Card } from 'react-bootstrap';
import { User } from '../../schema/User';
import user_alt_icon from '../../assets/user_alt_icon.svg';

const UserListItem = ({ user }: {user: User}) => {

    const getImage = (imageUrl: string) => {
        if (imageUrl.endsWith('/profile-image/default.png')) {
            return user_alt_icon;
        }
        return imageUrl;
    }


    return (
        <Card key={user.id}>
            <Card.Img variant="top" src={getImage(user.profileImageURL)} alt="Profile Pic"/>
            <Card.Body>
                <Card.Title>{ user.firstName } { user.lastName }</Card.Title>
                <div>
                    <div>Email: { user.email }</div>
                    <div>
                        Status: { user.active ? (<span className="active">Active</span>) : (<span className="inactive">InActive</span>)}
                    </div>
                    <div>Created At: {moment(user.createdAt).format('LL')}</div>
                </div>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Last updated {moment(user.lastLogin).format('LL')}</small>
            </Card.Footer>
        </Card>
    );
}

export default UserListItem;