import { RouteComponentProps } from '@reach/router';
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { getUsersList } from '../../services/userAPI';
import { User } from '../../schema/User';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchParams from '../shared/SearchParams';
import { Spinner } from 'react-bootstrap';
const UserListItem = lazy(() => import('./UserListItem'));

const UserList = ({ path } : RouteComponentProps) => {
    const [ usersList, setUsersList ] = useState<User[]>();
    const [ userParams, setUserParams ] = useState({
        pageSize: 20,
        currentPage: 1,
        q: ''
    });
    const [ totalItems, setTotalItems ] = useState<number>(0);
    const [ searchValue, setSearchValue ] = useState('');

    const onScroll = () => {
        if (usersList.length < totalItems) {
            getUsers(true);
        }
    }

    const getUsers = (scrollEvent?: boolean) => {
        const filterParams = userParams;
        if (scrollEvent) {
            filterParams.currentPage = filterParams.currentPage + 1;
        }
        filterParams.q = searchValue.length > 0 ? searchValue: '';
        setUserParams(filterParams);
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

    useEffect(() => {
        const filterParams = userParams;
        filterParams.currentPage = 1;
        setUserParams(filterParams);
        getUsers();
    }, [searchValue, setSearchValue]);

    return (
        <div className="user-list">
            <div className="user-header">
                <div className="user-title">
                    Users
                </div>
                <SearchParams setSearchValue={setSearchValue} />
            </div>
            <Suspense fallback={
                <div className="load-spinner">
                    <Spinner animation="border" variant="primary" />
                </div>
            }>
                { usersList && (
                    <InfiniteScroll
                        dataLength={ usersList.length }
                        next={onScroll}
                        hasMore={ usersList.length < totalItems }
                        loader={false}
                        >
                            { usersList.length === 0 ? (
                                <h1>No Users found</h1>
                            ) : (
                                <div className="user-list-container">
                                    { usersList.map((user: User) => {
                                        return (
                                            <UserListItem key={user.id} user={user}/>
                                        );
                                    })}
                                </div>
                            )}
                    </InfiniteScroll>
                )}
            </Suspense>
        </div>
    );
}

export default UserList;