import React, { useContext, useState } from 'react';
import './NewsFeed.css';
import PostCreation from '../components/PostCreation';
import Post from '../components/Post';
import { InfoContext } from '../components/InfoProvider';
import NavBar from '../components/NavBar';
import { useEffect } from 'react';
import axios from 'axios';
import { getCookie } from '../utilities/Helpers';
import { useHistory } from 'react-router-dom';
const NewsFeed = () => {
	const history = useHistory();
	const [posts, setPosts] = useState([]);
	const getPosts = () => {
		// Calling GET /posts
		axios
		.get("http://localhost:8800/api/posts/all", { withCredentials:true})
		.then(function (response) {
			setPosts(response.data);
			console.log(response.data);
		})
		.catch(function (error) {
			window.alert("ERROR FETCHING POSTS: ", error);
			console.log(error);
		});
	}

	useEffect(() => {
		let cookie = getCookie('userId');
		if (!cookie) history.push('/login');
		else getPosts();
	}, [])

	const handleCreatePost = (data) => {
		axios
		.post("http://localhost:8800/api/posts", data, { withCredentials:true})
		.then(function (response) {
			setPosts(prevPosts => [response.data,...prevPosts]);
			console.log(response.data);
		})
		.catch(function (error) {
			window.alert("ERROR CREATING NEW POST NEWSFEED PAGE:", error);
			console.log(error);
		});

	}

	const handleDeletePost = (postID) => {
		console.log("NewsFeed file Receiving DELETED POSTID: ", postID);
		//TODO: call delete then call getPosts() again
		axios
		.delete("http://localhost:8800/api/posts/"+postID, { withCredentials:true})
		.then(function (response) {
			console.log(response.data);
		})
		.catch(function (error) {
			window.alert("ERROR DELETING POST IN NEWSFEED PAGE:", postID);
			console.log(error);
		});

		let tempPosts = [...posts];
		tempPosts = tempPosts.filter(post => post._id !== postID);
		setPosts(tempPosts);
	}

	console.log(posts);
	return (
		<>
			<NavBar />
			<div className="newsFeed">
				<PostCreation submitPost={handleCreatePost}/>
				{posts.map((post) => (
					<Post key={post._id} post={post} deletePost={handleDeletePost}/>
				))}
			</div>
		</>
	);
};

export default NewsFeed;
