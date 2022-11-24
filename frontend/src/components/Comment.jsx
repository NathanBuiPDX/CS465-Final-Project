import React from 'react';
import './Comment.css';
import { useContext } from 'react';
import { InfoContext } from './InfoProvider';
import { useState } from 'react';
import { useEffect } from 'react';
import { getCookie } from '../utilities/Helpers';
const DEFAULT_PROFILE_IMG = process.env.REACT_APP_DEFAULT_ICON;
const Comment = ({ comment }) => {
	const context = useContext(InfoContext);
	const [user, setUser] = useState({});

	useEffect(() => {
		let user = context.users.find((user) => user._id === comment.user_id);
		setUser(user);
	}, [comment]);

	return (
		<div className="comment d-flex">
			<img
				src={user?.icon_url || DEFAULT_PROFILE_IMG}
				alt={`${user?.icon_url} comment ${comment.id}`}
				className="userIcon"
			/>
			<div className="content">
				<p className="userName">{user?.name}</p>
				<p className="text">{comment.text}</p>
			</div>
		</div>
	);
};

export default Comment;
