import React from 'react';
import './NavBar.css';
import {Search} from '@material-ui/icons';
import UserFigure from './UserFigure';
import { useContext } from 'react';
import { InfoContext } from './InfoProvider';

const NavBar = () => {
    const context = useContext(InfoContext);
    const user = context.currentUser;
    const recentlySearch = context.recentlySearch;

    const handleSearchClick = (event, userID) => {
        event.preventDefault();
        console.log("userID: ", userID);
    }

    return (
        <div className="navBarContainer bg-primary">
            <div className="navBarLeft">
                <div className="navBarLogo">Social App</div>
            </div>
            <div className="navBarCenter">
                <label htmlFor="search"><Search alt="searchIcon" className="searchIcon" /></label>
                <div class="dropdown widthAdjustment">
                    <input type="text" id="search" placeholder='Find your friend here' className='searchInput' data-bs-toggle="dropdown" aria-expanded="false"/>
                    <ul class="dropdown-menu mt-2 widthAdjustment bg-light">
                        {recentlySearch.map(e => <li class="dropdown-item" value={e.id} key={e.id} onClick={(event) => handleSearchClick(event, e.id)}><UserFigure user={e} color={"black"}/></li>)}
                    </ul>
                </div>
            </div>
            <div className="navBarRight d-flex">
                <UserFigure user={user}/>
                <button type='button' className='mx-3 btn btn-primary'>Logout</button>
            </div>
        </div>
    );
};

export default NavBar;