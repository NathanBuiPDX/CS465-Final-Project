import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getCookie } from '../utilities/Helpers';

export const InfoContext = React.createContext();

const InfoProvider = ({ children }) => {
	//MOCKDATA
	const [likes, setLikes] = useState([]);
	const [posts, setPosts] = useState([]);
	const [comments, setComments] = useState([]);
	const [users, setUsers] = useState([]);
	const [currentUser, setCurrentUser] = useState({});
	const [recentlySearch, setRecentlySearch] = useState([]);

	let cookie = getCookie('userId');

	useEffect(() => {
		if (cookie) 
		{
			axios
			.get("http://localhost:8800/api/users/all",  { withCredentials:true})
			.then(function (response) {
				setUsers(response.data);
				console.log("Fetching users from context: ", response.data);
			})
			.catch(function (error) {
				window.alert("ERROR fetching User from context:", error);
				console.log(error);
			});

			axios
			.get("http://localhost:8800/api/users",  { withCredentials:true})
			.then(function (response) {
				setCurrentUser(response.data);
				console.log("Fetching currentUser from context: ", response.data);
			})
			.catch(function (error) {
				window.alert("ERROR fetching current user from context:", error);
				console.log(error);
			});

			
		}
	}, [cookie])

	const addRecentlySearch = (newSearch) => {
		setRecentlySearch((currentArraySearch) => {
			let updatedArray = [...currentArraySearch];
			if (updatedArray.length > 6) updatedArray.pop();
			updatedArray.push(newSearch);
			return updatedArray;
		});
	};

	const modifyCurrentUser = (currentUser) => {
		console.log("Modifying Current User: ", currentUser);
		let usersArray = [...users];
		setCurrentUser(currentUser);
		let currentUserIdx = usersArray.findIndex(user => user._id === cookie);
		if (currentUserIdx > -1) {
			usersArray[currentUserIdx] = currentUser;
			setUsers(usersArray);
		}
	};

	return (
		<InfoContext.Provider
			value={{
				users: users,
				currentUser: currentUser,
				likes: likes,
				posts: posts,
				comments: comments,
				recentlySearch: recentlySearch,
				addRecentlySearch: addRecentlySearch,
				modifyCurrentUser: modifyCurrentUser,
			}}
		>
			{children}
		</InfoContext.Provider>
	);
};

export default InfoProvider;
