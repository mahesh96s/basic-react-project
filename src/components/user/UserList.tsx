import { RouteComponentProps } from '@reach/router';
import React, { useEffect, useState } from 'react';
import { getUsersList } from '../../services/userAPI';
import { Card } from 'react-bootstrap';
import user_alt_icon from '../../assets/user_alt_icon.svg';
import moment from 'moment';
import { User } from '../../schema/User';
import InfiniteScroll from 'react-infinite-scroll-component';

const UserList = ({ path } : RouteComponentProps) => {
    const [ usersList, setUsersList ] = useState([]);
    const [ userParams, setUserParams ] = useState({
        pageSize: 20,
        currentPage: 1,
        q: ''
    });
    const [ totalItems, setTotalItems ] = useState<number>(0);

    const onScroll = () => {
        if (usersList.length < totalItems) {
            getUsers(true);
        }
    }

    const getUsers = (scrollEvent?: boolean) => {
        if (scrollEvent) {
            setUserParams((filterParams) => {
                filterParams.currentPage = filterParams.currentPage + 1;
                return filterParams;
            });
        }
        getUsersList(userParams).then(data => {
            setTotalItems(data.totalItems);
            if (scrollEvent) {
                setUsersList([...usersList, ...data.users]);
            } else {
                setUsersList(data.users);
            }
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
                <InfiniteScroll
                    dataLength={ usersList.length }
                    next={onScroll}
                    hasMore={ usersList.length < totalItems }
                    loader={
                        <div className="text-align-center">
                            <div>Loading ...</div>
                        </div>
                    }
                    >
                    <div className="user-list-container">
                        { usersList.map((user: User) => {
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
                        })}
                    </div>
                </InfiniteScroll>
			)}
        </div>
    );
}

export default UserList;