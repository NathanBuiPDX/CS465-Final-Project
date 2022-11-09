import React from 'react';
import './NewsFeed.css';
import PostCreation from '../components/PostCreation';
import Post from '../components/Post';
const NewsFeed = () => {
    return (
        <div className='newsFeed'>
            <PostCreation/>
            <Post/>
        </div>
    );
};

export default NewsFeed;