import React, { useState } from 'react';
import { Users, Posts, Comments } from '../mockdata';

export const InfoContext = React.createContext();

const InfoProvider = ({ children }) => {
	//MOCKDATA
	const [likes, setLikes] = useState([]);
	const [posts, setPosts] = useState([...Posts]);
	const [comments, setComments] = useState([...Comments]);
	const [users, setUser] = useState([...Users]);
	const [currentUser, setCurrentUser] = useState({
		id: '1',
		name: 'nathan',
		full_name: 'nathan bui',
		icon_url: '/assets/2.png',
		gender: 'male',
		dob: '22/03/2000',
		about: 'love doing stuff',
	});
	const [recentlySearch, setRecentlySearch] = useState([...Users]);

	const addRecentlySearch = (newSearch) => {
		setRecentlySearch((currentArraySearch) => {
			let updatedArray = [...currentArraySearch];
			if (updatedArray.length > 6) updatedArray.pop();
			updatedArray.push(newSearch);
			return updatedArray;
		});
	};

	const addCurrentUser = (currentUser) => {
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
				setCurrentUser: addCurrentUser,
			}}
		>
			{children}
		</InfoContext.Provider>
	);
};

export default InfoProvider;
