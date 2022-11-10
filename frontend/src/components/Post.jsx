import React from 'react';
import './Post.css';
import Bagde from './Badge';
import { useContext } from 'react';
import { InfoContext } from './InfoProvider';
import { useState } from 'react';
import { ThumbUp } from '@material-ui/icons';
import Comment from './Comment';

const Post = ({post}) => {
    const context = useContext(InfoContext);

    let [like, setLike] = useState(false);
    let [likeCount, setLikeCount] = useState(post.like_count);
    let [comments, setComments] = useState([]);
    let [viewComment, setViewComment] = useState(false);
    const currentUser = context.currentUser;

    const handleLikeClick = (event) => {
        event.preventDefault();
        setLike(prevState => {
            return !prevState;
        });
        setLikeCount(prevLikeCount => !like ? ++prevLikeCount : --prevLikeCount);
    }

    const handleUpdatePost = (event) => {
        event.preventDefault();
        console.log("Post Updated!");
    }

    const handleDeletePost = (event) => {
        event.preventDefault();
        console.log("Post Deleted!");
    }

    return (
        <div className='post bg-light'>
            <div className="postTop d-flex justify-content-between">
                <Bagde post={post}/>
                {post.user_id === currentUser.id && <div class="dropdown">
                    <button className="btn btn-light dropdown-toggle rounded-circle" type="button" data-bs-toggle="dropdown" aria-expanded="false"/>
                    <ul className="dropdown-menu">
                        <li className="dropdown-item" onClick={handleUpdatePost}>Update Post</li>
                        <li className="dropdown-item" onClick={handleDeletePost}>Delete Post</li>
                    </ul>
                </div>}
            </div>
            <div className="postMiddle">
                {post.caption && <div className='postCaption'>{post.caption}</div>}
                {post.image_url && <img src={post.image_url} className="postPicture" alt={`post ${post.id}`}/>}
            </div>
            <div className="postBottom">
                <div className='commentLikeCount'>
                    <div className={`likeArea d-flex ${like ? "liked" :""}`}>
                        <div className="likeIcon" onClick={handleLikeClick}><ThumbUp/> </div>
                        {likeCount > 0 && <div className='pt-1'>{likeCount} Likes</div>}
                    </div> 
                    <div>
                        {post.comments_count > 0 && <div className='pt-1 commentCount' onClick={() => setViewComment(prevState => !prevState)}>{post.comments_count} Comments</div>}
                    </div>
                </div>
                        {viewComment && <Comment comments={comments}/>}
            </div>
        </div>
    );
};

export default Post;