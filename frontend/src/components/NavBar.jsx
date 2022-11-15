import React from 'react';
import './NavBar.css';
import { Search } from '@material-ui/icons';
import UserFigure from './UserFigure';
import { useContext } from 'react';
import { InfoContext } from './InfoProvider';
import { useHistory } from 'react-router-dom';

const NavBar = () => {
	const history = useHistory();
	const context = useContext(InfoContext);
	const user = context.currentUser;
	const recentlySearch = context.recentlySearch;

	const handleSearchClick = (event, userID) => {
		event.preventDefault();
		try {
			console.log('userID: ', userID);
			history.push(`/user/${userID}`);
		} catch (err) {
			window.alert('ERROR: ', err.message);
		}
	};

	return (
		<div className="navBarContainer bg-dark">
			<div className="navBarLeft">
				<div className="navBarLogo" onClick={() => history.push('/')}>
					Social App
				</div>
			</div>
			<div className="navBarCenter">
				<label htmlFor="search">
					<Search alt="searchIcon" className="searchIcon" />
				</label>
				<div className="dropdown widthAdjustment">
					<input
						type="text"
						id="search"
						placeholder="Find your friend here"
						className="searchInput"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					/>
					<ul className="dropdown-menu mt-2 widthAdjustment bg-light">
						{recentlySearch.map((e) => (
							<li
								className="dropdown-item"
								value={e.id}
								key={e.id}
								onClick={(event) => handleSearchClick(event, e.id)}
							>
								<UserFigure user={e} color={'black'} />
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="navBarRight d-flex">
				<UserFigure user={user} />
				<button type="button" className="mx-3 btn btn-dark">
					<b>Logout</b>
				</button>
			</div>
		</div>
	);
};

export default NavBar;
