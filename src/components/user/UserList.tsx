import { RouteComponentProps } from '@reach/router';
import React, { useEffect, useState } from 'react';
import { getUsersList } from '../../services/userAPI';
import { CardDeck, Card } from 'react-bootstrap';
import user_alt_icon from '../../assets/user_alt_icon.svg';
import moment from 'moment';
import { User } from '../../schema/User';

const UserList = ({ path } : RouteComponentProps) => {
    const [ usersList, setUsersList ] = useState([]);
    const [ userParams, setUserParams ] = useState({
        pageSize: 20,
        currentPage: 1,
        q: ''
    });

    const getUsers = () => {
        getUsersList(userParams).then(data => {
            setUsersList(data.users);
            return data;
        });
    }

    const getImage = (imageUrl: string) => {
        if (imageUrl.endsWith('/profile-image/default.png')) {
            return user_alt_icon;
        }
        return imageUrl;
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="user-list">
            { usersList.length === 0 ? (
				<h1>No Users found</h1>
			) : (
                <CardDeck>
                    { usersList.map((user: User) => {
                        return (
                            <Card key={user.id}>
                                <Card.Img variant="top" src={getImage(user.profileImageURL)} />
                                <Card.Body>
                                    <Card.Title>{ user.firstName } { user.lastName }</Card.Title>
                                    <Card.Text>
                                        Email: { user.email } <br />
                                        Status: { user.active ? (<span className="active">Active</span>) : (<span>InActive</span>)} <br />
                                        Created At: {moment(user.createdAt).format('LL')}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Last updated {moment(user.lastLogin).format('LL')}</small>
                                </Card.Footer>
                            </Card>
                        );
                    })}
                </CardDeck>
			)}
        </div>
    );
}

export default UserList;