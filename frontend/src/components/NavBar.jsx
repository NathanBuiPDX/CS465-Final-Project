import React from 'react';
import './NavBar.css';
import {Search} from '@material-ui/icons';
import Bagde from './Badge';
const NavBar = () => {
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
                <Bagde/>
                <button type='button' className='mx-3'>Logout</button>
            </div>
        </div>
    );
};

export default NavBar;