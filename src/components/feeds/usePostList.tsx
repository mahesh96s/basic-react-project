import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Post } from "../../schema/Post";
import { getMyFavouritePostList, getMyPostList } from "../../services/postAPI";

const usePostList = (label: string) => {
    const [ postListData, setPostListData ] = useState<Post[]>([]);

    useEffect(() => {
        if (label === 'Posts') {
            getMyPostList().then((posts: Post[]) => {
                setPostListData(posts);
            });
        } else {
            getMyFavouritePostList().then((posts: Post[]) => {
                setPostListData(posts);
            })
        }
    }, [])

    const PostList = () => (
        <>
            {  postListData.length === 0 ? (
                    <div>
                        No {label} Found
                    </div>
                ) : (
                    <Table striped={true} bordered={true}>
                        <thead>
                            <tr>
                                <th>Sl.no</th>
                                <th>Created By</th>
                                <th>Description</th>
                                <th>Comments Count</th>
                            </tr>
                        </thead>
                        <tbody>
                        { postListData.map((post, index) => {
                            return (
                                <tr key={post.id}>
                                    <td>{index + 1}</td>
                                    <td>{post.createdBy.firstName} {post.createdBy.lastName}</td>
                                    <td>{post.description}</td>
                                    <td>{post.commentsCount}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </Table>
                )
            }
        </>
    );

    return [ PostList ];
}

export default usePostList;