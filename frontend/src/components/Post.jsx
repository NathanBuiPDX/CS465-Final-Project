import React, { Fragment, useEffect, useState, useContext } from 'react';
import './Post.css';
import Bagde from './Badge';
import { InfoContext } from './InfoProvider';
import { ThumbUp } from '@material-ui/icons';
import Comment from './Comment';
import { MoreHoriz } from '@material-ui/icons';
import CommentCreation from './CommentCreation';
import axios from 'axios';
const Post = ({ post: initialPost, deletePost }) => {
	const context = useContext(InfoContext);
	const [post, setPost] = useState(initialPost);
	// const updateCaption = useRef(initialPost.caption);
	const [caption, setCaption] = useState(initialPost.caption);
	const [file, setFile] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const [like, setLike] = useState(false);
	const [likeCount, setLikeCount] = useState(initialPost.like_count);
	const [commentCount, setCommentCount] = useState(initialPost.comments_count);
	const [comments, setComments] = useState([]);
	const [viewComment, setViewComment] = useState(false);
	const currentUser = context.currentUser;

	useEffect( async () => {
		try{
			let comments = await axios.get("http://localhost:8800/api/comments/posts/" + initialPost._id, {withCredentials: true});
			setComments(comments.data);
			let liked = await axios.get("http://localhost:8800/api/likes/posts/" + initialPost._id, {withCredentials: true});
			console.log("LIKE? ", liked.data, typeof liked.data)
			setLike(liked.data);
		} catch(err) {
			window.alert("Can not get post comment");
			console.log(err);
		}
		setCaption(initialPost.caption);
		setPost(initialPost);
	}, [initialPost]);

	const handleLikeClick = async (event) => {
		event.preventDefault();
		try{
			await axios.post("http://localhost:8800/api/likes", {post_id: initialPost._id}, {withCredentials: true})
			setLike((prevState) => {
				//check and delete/create the like object depends on the user's click
				return !prevState;
			});
			setLikeCount((prevLikeCount) =>
				!like ? ++prevLikeCount : --prevLikeCount
			);
			console.log('like!');
		} 
		catch(err) {
			window.alert("Like feature is down!!!!");
			console.log(err);
		}
	};

	const handleUpdateImage = (event) => {
		event.preventDefault();
		event.stopPropagation();
		try {
			setFile(event.target.files[0]);
			setImagePreview(URL.createObjectURL(event.target.files[0]));
		} catch (err) {
			setFile(null);
			setImagePreview(null);
		}
	};

	const handleUpdatePost = (event) => {
		event.preventDefault();
		let currentPost = { ...post };
		// get the post again
		let updatePost = {
			caption: caption,
		};
		if (file) updatePost.image_url = file;
		
		axios
		.put("http://localhost:8800/api/posts/" + currentPost._id, updatePost,  { withCredentials:true})
		.then(function (response) {
			setPost(response.data);
			imagePreview && URL.revokeObjectURL(imagePreview);
			setImagePreview(null);
			setFile(null);
			console.log(response.data);
		})
		.catch(function (error) {
			window.alert("ERROR CREATING NEW POST NEWSFEED PAGE:", error);
			console.log(error);
		});
	};

	const handleDeletePost = (event) => {
		event.preventDefault();
		deletePost(post._id);
	};

	const handleSubmitComment = async (data) => {
		try {
			let newComment = {
			post_id: post._id,
			text: data,
		};
		const returnedComment = await axios.post("http://localhost:8800/api/comments", newComment, {withCredentials: true});
		setComments((prevComments) => [returnedComment.data, ...prevComments]);
		setCommentCount(prevComments => ++prevComments);
		} catch(err) {
			window.alert("ERROR WHEN CREATING NEW COMMENT: ", err);
			console.log(err);
		}
	};

	const handleContentChange = (event) => {
		event.preventDefault();
		setCaption(event.target.value);
	}
	return (
		<div className="post bg-light">
			<div className="postTop d-flex justify-content-between">
				<Bagde post={post} />
				{post.user_id === currentUser._id && (
					<div className="dropdown">
						<button
							className="btn btn-light"
							alt="dropdown"
							type="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<MoreHoriz />
							<span className="noDisplay">Dropdown Menu</span>
						</button>
						<ul className="dropdown-menu">
							<li
								className="dropdown-item"
								data-bs-toggle="modal"
								data-bs-target="#updatePostModal"
							>
								Update Post
							</li>
							<li className="dropdown-item" onClick={handleDeletePost}>
								Delete Post
							</li>
						</ul>
						<div
							className="modal fade"
							id="updatePostModal"
							data-bs-backdrop="static"
							data-bs-keyboard="false"
							tabIndex="-1"
							aria-labelledby="updatePostModalLabel"
							aria-hidden="true"
						>
							<div className="modal-dialog">
								<div className="modal-content">
									<div className="modal-header">
										<h1 className="modal-title fs-5" id="updatePostModalLabel">
											Updating Post
										</h1>
										<button
											type="button"
											className="btn-close"
											data-bs-dismiss="modal"
											aria-label="Close"
										></button>
									</div>
									<div className="modal-body">
										<div className="infoRow">
											<label htmlFor="updateContext" className="infoLabel">
												Caption:
											</label>
											<textarea
												id="updateContext"
												className="infoData"
												value={caption}
												onChange={handleContentChange}
											/>
										</div>
										<div className="infoRow">
											<label htmlFor="updateImage" className="infoLabel">
												Image:
											</label>
											<input
												id="updateImage"
												type="file"
												onChange={handleUpdateImage}
											/>
										</div>
										{!imagePreview && post.image_url && (
											<img
												src={post.image_url}
												className="imageModal"
												alt="initial image post"
											/>
										)}
										{imagePreview && (
											<img
												src={imagePreview}
												className="imageModal"
												alt="preview update post"
											/>
										)}
									</div>
									<div className="modal-footer">
										<button
											type="button"
											className="btn btn-secondary"
											data-bs-dismiss="modal"
										>
											Cancel
										</button>
										<button
											type="button"
											className="btn btn-primary m-0"
											data-bs-dismiss="modal"
											onClick={handleUpdatePost}
										>
											Update
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
			<div className="postMiddle">
				{post.caption && <div className="postCaption">{post.caption}</div>}
				{post.image_url && (
					<img
						src={post.image_url}
						className="postPicture"
						alt={`post ${post.id}`}
					/>
				)}
			</div>
			<div className="postBottom">
				<div className="commentLikeCount">
					<div className={`likeArea d-flex ${like ? 'liked' : ''}`}>
						<div className="likeIcon" onClick={handleLikeClick}>
							<ThumbUp />{' '}
						</div>
						{likeCount > 0 && (
							<div className="pt-1">
								{likeCount} {likeCount > 1 ? 'Likes' : 'Like'}
							</div>
						)}
					</div>
					<div>
						<div
							className="pt-1 commentCount"
							onClick={() => setViewComment((prevState) => !prevState)}
						>
							{commentCount} {commentCount > 1 ? ' Comments' : ' Comment'}
						</div>
					</div>
				</div>
				{viewComment && (
					<Fragment>
						<CommentCreation submitComment={handleSubmitComment} />
						{comments.map((comment) => (
							<Comment key={comment._id + "comment"} comment={comment} />
						))}
					</Fragment>
				)}
			</div>
		</div>
	);
};

export default Post;
