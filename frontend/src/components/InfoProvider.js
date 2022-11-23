import React, { useState } from 'react';
import { Users, Posts, Comments } from '../mockdata';

export const InfoContext = React.createContext();

const InfoProvider = ({ children }) => {
	//MOCKDATA
	const [likes, setLikes] = useState([]);
	const [posts, setPosts] = useState([...Posts]);
	const [comments, setComments] = useState([...Comments]);
	const [users, setUser] = useState([...Users]);
	const [currentUser, setCurrentUser] = useState({});
	const [recentlySearch, setRecentlySearch] = useState([...Users]);

	const addRecentlySearch = (newSearch) => {
		setRecentlySearch((currentArraySearch) => {
			let updatedArray = [...currentArraySearch];
			if (updatedArray.length > 6) updatedArray.pop();
			updatedArray.push(newSearch);
			return updatedArray;
		});
	};

	const modifyCurrentUser = (currentUser) => {
		console.log("Modifying Current User: ". currentUser);
		setCurrentUser(currentUser);
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
