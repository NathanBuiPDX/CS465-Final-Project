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
		setPostDuration(submitDuration(post.post_time));
		const tempUser = context.users.find((user) => user.id === post.user_id);
		tempUser.icon_url = tempUser.icon_url || DEFAULT_PROFILE_IMG;
		setUser(tempUser);
	}, []);

	const submitDuration = (submittedTime) => {
		//Temp
		console.log('Bagde DATE RECEIVED: ', submittedTime);
		let timeSubmitted = new Date(submittedTime);
		let diffTime = new Date().getTime() - timeSubmitted.getTime();
		return msToDuration(diffTime);
	};

	return (
		<div className="userBagde" onClick={() => history.push(`/user/${user.id}`)}>
			<img src={user.icon_url} alt={user.icon_url} className="userIcon" />
			<div className="bagdeInfo">
				<p className="userName">{user.name}</p>
				<p className="timeDuration">{postDuration}</p>
			</div>
		</div>
	);
};

export default Bagde;
