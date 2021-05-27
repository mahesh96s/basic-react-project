import { RouteComponentProps } from '@reach/router';
import React from 'react';
import usePostList from './usePostList';

const FeedsList = ({ path } : RouteComponentProps) => {
    const [ MyPostList ] = usePostList('Posts');
    const [ MyFavouritePostList ] = usePostList('Favourites');

    return (
        <div className="feeds-List-container">
            <div className="post-table">
                <MyPostList />
            </div>
            <div className="favourite-table">
                <MyFavouritePostList />
            </div>
        </div>
    )
}

export default FeedsList;