import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { msToDuration } from '../utilities/Helpers';
import './Badge.css';
import { InfoContext } from './InfoProvider';

const Bagde = ({ post }) => {
	const context = useContext(InfoContext);
	const user = context.users.find((user) => user.id === post.user_id);
	const [postDuration, setPostDuration] = useState('');

	useEffect(() => {
		setPostDuration(submitDuration(post.post_time));
	}, []);

	const submitDuration = (submittedTime) => {
		//Temp
		console.log('Bagde DATE RECEIVED: ', submittedTime);
		let timeSubmitted = new Date(submittedTime);
		let diffTime = new Date().getTime() - timeSubmitted.getTime();
		return msToDuration(diffTime);
	};

	return (
		<div className="userBagde">
			<img src={user.icon_url} alt={user.icon_url} className="userIcon" />
			<div className="bagdeInfo">
				<p className="userName">{user.name}</p>
				<p className="timeDuration">{postDuration}</p>
			</div>
		</div>
	);
};

export default Bagde;
