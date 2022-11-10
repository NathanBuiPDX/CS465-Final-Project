import React from 'react';
import './Comment.css';
import { useContext } from 'react';
import { InfoContext } from './InfoProvider';
import { useState } from 'react';
import { useEffect } from 'react';
const Comment = ({comment}) => {
    const context = useContext(InfoContext);
    const [user ,setUser] = useState({});
    
    useEffect(() => {
        let user = context.users.find(user => user.id === comment.user_id);
        setUser(user);
    }, []);

    return (
        <div className='comment d-flex'>
            <img src={user.icon_url} alt={`${user.icon_url} comment ${comment.id}`} className='userIcon'/>
            <div className='content'>
                <p className='userName'>{user.name}</p>
                <p className='text'>{comment.text}</p>
            </div>
        </div>
    );
};

export default Comment;