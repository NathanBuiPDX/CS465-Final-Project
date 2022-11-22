import React from 'react';
import './CommentCreation.css';
import { useContext, useState, useRef } from 'react';
import { InfoContext } from './InfoProvider';
import { Send } from '@material-ui/icons';
import { useEffect } from 'react';

const DEFAULT_PROFILE_IMG = process.env.REACT_APP_DEFAULT_ICON;

const CommentCreation = (props) => {
	const context = useContext(InfoContext);
	const [user, setUser] = useState({});
	const comment = useRef('');

	useEffect(() =>{
		setUser(context.currentUser);
	}, [context.currentUser]);
	
	const handleSUbmitButtonClick = (event) => {
		event.preventDefault();
		props.submitComment(comment.current.value);
		comment.current.value = '';
	};
	return (
		<label
			htmlFor="inputComment"
			className="createComment d-flex align-items-center"
		>
			<img
				src={user.icon_url || DEFAULT_PROFILE_IMG}
				alt={`${user.icon_url} comment created ${user.name}`}
				className="userIcon"
			/>
			<div className="content">
				<input
					className="inputComment"
					name="inputComment"
					placeholder="Write a comment..."
					id="inputComment"
					ref={comment}
				/>
				<button
					type="button"
					className="submitIcon"
					onClick={handleSUbmitButtonClick}
				>
					<Send />
					<span className="noDisplay">Send</span>
				</button>
			</div>
		</label>
	);
};

export default CommentCreation;
