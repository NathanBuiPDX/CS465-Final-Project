import React from 'react';
import './UserFigure.css';
import { useHistory } from 'react-router-dom';
const DEFAULT_PROFILE_IMG = process.env.REACT_APP_DEFAULT_ICON;
const UserFigure = ({ user, color }) => {
	const history = useHistory();
	return (
		<div
			className="userFigure"
			onClick={() => {
				history.push(`/user/${user._id}`);
			}}
		>
			<img src={user.icon_url || DEFAULT_PROFILE_IMG} alt={user.icon_url} className="userIcon" />
			<p className="userName" style={{ color: color }}>
				{user.full_name}
			</p>
		</div>
	);
};

export default UserFigure;
