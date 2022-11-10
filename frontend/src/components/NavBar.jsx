import React from 'react';
import './NavBar.css';
import {Search} from '@material-ui/icons';
import UserFigure from './UserFigure';
import { useContext } from 'react';
import { InfoContext } from './InfoProvider';

const NavBar = () => {
    const context = useContext(InfoContext);
    //MOCK DATA
    const user = context.currentUser;
    return (
        <div className="navBarContainer bg-primary">
            <div className="navBarLeft">
                <div className="navBarLogo">Social App</div>
            </div>
            <div className="navBarCenter">
                <label htmlFor="search"><Search alt="searchIcon" className="searchIcon" />
                </label>
                <input type="search" id="search" placeholder='Find your friend here' className='searchInput'/>
            </div>
            <div className="navBarRight d-flex">
                <UserFigure user={user}/>
                <button type='button' className='mx-3 btn btn-primary'>Logout</button>
            </div>
        </div>
    );
};

export default NavBar;