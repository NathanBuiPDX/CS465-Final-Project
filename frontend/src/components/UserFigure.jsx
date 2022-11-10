import React from 'react';
import './UserFigure.css';
const UserFigure = ({user, color}) => {
    return (
        <div className='userFigure'>
            <img src={user.icon_url} alt={user.icon_url} className='userIcon'/>
            <p className='userName' style={{color: color}}>{user.full_name}</p>
        </div>
    );
};

export default UserFigure;