import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { msToDuration } from '../utilities/Helpers';
import './Badge.css';
import { InfoContext } from './InfoProvider';
import { useHistory } from 'react-router-dom';

const DEFAULT_PROFILE_IMG = process.env.REACT_APP_DEFAULT_ICON;

const Bagde = ({ post }) => {
	const history = useHistory();
	const context = useContext(InfoContext);
	const [user,setUser] = useState({});
	const [postDuration, setPostDuration] = useState('');
	
	useEffect(() => {
		setPostDuration(submitDuration(post.createdAt));
		//TODO: call GET /:userID instead
		const tempUser = context.users.find((user) => user._id === post.user_id);
		setUser(tempUser);
	}, [JSON.stringify(context.currentUser) === '{}']);

	const submitDuration = (submittedTime) => {
		//Temp
		let timeSubmitted = new Date(submittedTime);
		let diffTime = new Date().getTime() - timeSubmitted.getTime();
		return msToDuration(diffTime);
	};

	return (
		<div className="userBagde" onClick={() => history.push(`/user/${user._id}`)}>
			<img src={user?.icon_url || DEFAULT_PROFILE_IMG} alt={user?.icon_url || DEFAULT_PROFILE_IMG} className="userIcon" />
			<div className="bagdeInfo">
				<p className="userName">{user?.name}</p>
				<p className="timeDuration">{postDuration}</p>
			</div>
		</div>
	);
};

export default Bagde;
