import React from 'react';
import './PostCreation.css';
import {Photo}  from '@material-ui/icons';
const PostCreation = () => {
    return (
        <div className='postCreation bg-light'>
            <div className='userCaption'>
                <label htmlFor="caption"><img src='/assets/2.png' alt="testing" className='userIcon'/></label>
                <textarea type="text" placeholder='Share your thoughts here' id="caption" className='caption'/>
            </div>
            <hr />
            <div className='uploadFile'>
                <div >
                    <label htmlFor="file" className="photoSharing">
                        <Photo className='photoIcon' for="file"/><span className='iconLabel'>Photo/Image</span>
                    </label>
                    <input type="file" id="file" style={{display:"none"}}></input>
                </div>
                <button type='button' className='btn btn-primary postButton'>Post</button>
            </div>
        </div>
    );
};

export default PostCreation;