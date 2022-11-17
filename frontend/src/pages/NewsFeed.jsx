import React, { useContext, useState } from 'react';
import './NewsFeed.css';
import PostCreation from '../components/PostCreation';
import Post from '../components/Post';
import { InfoContext } from '../components/InfoProvider';
import NavBar from '../components/NavBar';
import { useEffect } from 'react';

const NewsFeed = () => {
	const context = useContext(InfoContext);
	const [posts, setPosts] = useState([]);

	const getPosts = () => {
		// Calling GET /posts
		try{
			// const posts = await
			let tempPosts = context.posts;
			setPosts(tempPosts);
		}
		catch(err) {
			window.alert("ERROR FETCHING POSTS: ", err);
		}
	}

	useEffect(() => {
		getPosts();
	}, [])

	const handleCreatePost = (data) => {
		try{
			//TODO remove this random number
			data.id = Math.random();
			console.log("NewsFeed file Receiving NEW POST: ", data);
			//call POST /post then get post again
			// getPosts();
			//TODO: remove this one
			setPosts(prevPosts => [data,...prevPosts]);
		} catch(err) {
			window.alert("ERROR CREATING NEW POST NEWSFEED PAGE:", err);
		}
	}

	const handleDeletePost = (postID) => {
		console.log("NewsFeed file Receiving DELETED POSTID: ", postID);
		//TODO: call delete then call getPosts() again
		let tempPosts = [...posts];
		tempPosts = tempPosts.filter(post => post.id !== postID);
		setPosts(tempPosts);
	}

	console.log(posts);
	return (
		<>
			<NavBar />
			<div className="newsFeed">
				<PostCreation submitPost={handleCreatePost}/>
				{posts.map((post) => (
					<Post key={post.id} post={post} deletePost={handleDeletePost}/>
				))}
			</div>
		</>
	);
};

export default NewsFeed;
