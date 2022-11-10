import React, { useState, useRef, useContext } from 'react';
import './PostCreation.css';
import {Photo}  from '@material-ui/icons';
import {InfoContext} from './InfoProvider';

const PostCreation = () => {
    const context = useContext(InfoContext);
    const content = useRef("");
    const [file, setFile] = useState(null);
    const currentUser = context.currentUser;


    const handleImageUpload = (event) => {
        event.preventDefault();
        console.log("FILE: ", event.target.files);
        setFile(event.target.files);
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log("Form Submitted with content: ", content.current.value);
        content.current.value = "";
    }

    return (
        <form className='postCreation bg-light' onSubmit={handleFormSubmit}>
            <div className='userCaption'>
                <label htmlFor="caption"><img src={currentUser.icon_url} alt={`${currentUser.icon_url} from PostCreation`} className='userIcon'/></label>
                <textarea type="text" placeholder='Share your thoughts here' ref={content} id="caption" className='caption'/>
            </div>
            <hr />
            <div className='uploadFile'>
                <div>
                    <label htmlFor="file" className="photoSharing">
                        <Photo className='photoIcon' for="file"/><span className='iconLabel'>Photo/Image</span>
                    </label>
                    <input type="file" id="file" style={{display:"none"}} onChange={handleImageUpload}/>
                </div>
                <button type='submit' className='btn btn-primary postButton'>Post</button>
            </div>
        </form>
    );
};

export default PostCreation;