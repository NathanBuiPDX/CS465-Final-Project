import React from 'react';
import './UserPage.css';
// import { useParams } from "react-router";
import { useState, useEffect, useContext } from 'react';
import { InfoContext } from '../components/InfoProvider';
import PostCreation from '../components/PostCreation';
import Post from '../components/Post';

const UserPage = (props) => {
    const context = useContext(InfoContext);
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState({});
    // const userID = useParams().user_id;
    const userID = "1";

    useEffect(() => {
        let posts = context.posts.filter(post => post.user_id === userID);
        let user = context.users.filter(user => user.id === userID);
        setUser(user);
        setUserPosts(posts);
    }, [userID])

    return (
        <div className='userProfile'>
            <div className="userImages">

            </div>
            
            <div className="userContent">
                <div className="userInfo">

                </div>

                <div className="userPost">
                    {userID === context.currentUser.id && <PostCreation/>}
                    {userPosts.map(post => <Post key={post.id} post={post}/>)}
                </div>
            </div>
            
        </div>
    );
};

export default UserPage;