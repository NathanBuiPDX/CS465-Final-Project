import React from 'react';
import './Post.css';
import Bagde from './Badge';
const Post = () => {
    return (
        <div className='post bg-light'>
            <div className="postTop">
            <Bagde color="black"/>

            </div>
            <div className="postMiddle">
                This is the pic
                This is the Post
            </div>
            <div className="postBottom">
                This is the comments and Likes
            </div>
        </div>
    );
};

export default Post;