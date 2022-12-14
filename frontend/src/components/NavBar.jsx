import React from 'react';
import './NavBar.css';
import { Search } from '@material-ui/icons';
import UserFigure from './UserFigure';
import { useContext } from 'react';
import { InfoContext } from './InfoProvider';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const NavBar = () => {
	const history = useHistory();
	const context = useContext(InfoContext);
	const [user, setUser] = useState(context.currentUser);
	const [recentlySearch, setRecentlySearch] = useState([]);
	const [users, setUsers] = useState([]);
	useEffect(() => {
		setUser(context.currentUser);
	}, [context.currentUser]);

	useEffect(() => {
		setRecentlySearch(context.users);
		setUsers(context.users);
	}, [context.currentUser]);



	const handleSearchClick = (event, userID) => {
		event.preventDefault();
		try {
			history.push(`/user/${userID}`);
		} catch (err) {
			window.alert('ERROR: ', err.message);
		}
	};

	const handleSearchChange = (event) => {
		event.preventDefault();
		let usersArray = [...users];
		let keyword = event.target.value;
		if (keyword !== '') {
			const result = usersArray.filter(user => user.full_name.toLowerCase().startsWith(keyword.toLowerCase()));
			setRecentlySearch(result);
		} else setRecentlySearch(usersArray);
	}

	const handleLogout = (event) => {
		console.log("Logging out");
		document.cookie = "userId=; max-age=0";
		history.push('/login');
	}

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
						onChange={handleSearchChange}
					/>
					<ul className="dropdown-menu mt-2 widthAdjustment bg-light">
						{recentlySearch.map((e) => (
							<li
								className="dropdown-item"
								value={e._id}
								key={e._id}
								onClick={(event) => handleSearchClick(event, e._id)}
							>
								<UserFigure user={e} color={'black'} />
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="navBarRight d-flex">
				<UserFigure user={user} />
				<button type="button" className="mx-3 btn btn-dark" onClick={handleLogout}>
					<b>Logout</b>
				</button>
			</div>
		</div>
	);
};

export default NavBar;
