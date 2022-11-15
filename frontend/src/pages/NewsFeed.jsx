import React, { useContext } from 'react';
import './NewsFeed.css';
import PostCreation from '../components/PostCreation';
import Post from '../components/Post';
import { InfoContext } from '../components/InfoProvider';
import NavBar from '../components/NavBar';

const NewsFeed = () => {
	const context = useContext(InfoContext);
	const posts = context.posts;
	console.log(posts);
	return (
		<>
			<NavBar />
			<div className="newsFeed">
				<PostCreation />
				{posts.map((post) => (
					<Post key={post.id} post={post} />
				))}
			</div>
		</>
	);
};

export default NewsFeed;
