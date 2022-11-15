import React from 'react';
import './CommentCreation.css';
import { useContext, useState, useRef } from 'react';
import { InfoContext } from './InfoProvider';
import { Send } from '@material-ui/icons';
const CommentCreation = (props) => {
    const context = useContext(InfoContext);
    const [user, setUser] = useState(context.currentUser);
    const comment = useRef("");

    const handleSUbmitButtonClick = (event) => {
        event.preventDefault();
        props.submitComment(comment.current.value);
        comment.current.value = "";
    }
    return (
        <label htmlFor="inputComment" className='createComment d-flex align-items-center'>
            <img src={user.icon_url} alt={`${user.icon_url} comment created ${user.name}`} className='userIcon'/> 
            <div  className='content'>
                <input className='inputComment' name="inputComment" placeholder='Write a comment...' id="inputComment" ref={comment}/>
                <button type='button' className='submitIcon' onClick={handleSUbmitButtonClick}><Send/><span className='noDisplay'>Send</span></button>
            </div>
        </label>
    );
};

export default CommentCreation;