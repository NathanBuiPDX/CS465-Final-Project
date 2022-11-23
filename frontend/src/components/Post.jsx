import React, { Fragment, useEffect, useState, useContext } from 'react';
import './Post.css';
import Bagde from './Badge';
import { InfoContext } from './InfoProvider';
import { ThumbUp } from '@material-ui/icons';
import Comment from './Comment';
import { MoreHoriz } from '@material-ui/icons';
import CommentCreation from './CommentCreation';
import { useRef } from 'react';

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

	useEffect(() => {
		let comments = context.comments.filter(
			(comment) => comment.post_id === post.id
		);
		setComments(comments);
		setCaption(initialPost.caption);
	}, [initialPost]);

	const handleLikeClick = (event) => {
		event.preventDefault();
		setLike((prevState) => {
			//check and delete/create the like object depends on the user's click
			return !prevState;
		});
		setLikeCount((prevLikeCount) =>
			!like ? ++prevLikeCount : --prevLikeCount
		);
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
		let prevPost = { ...post };
		setTimeout(() => {
			// get the post again
			let updatePost = {
				caption: caption,
			};
			if (file) updatePost.image_url = file;
			
			console.log('UPDATING POST: ', updatePost);
			setPost({
				...prevPost,
				caption: updatePost.caption,
				image_url: imagePreview,
			});
			URL.revokeObjectURL(imagePreview);
			setImagePreview(null);
			console.log('Post Updated!');
		}, 2000);
	};

	const handleDeletePost = (event) => {
		event.preventDefault();
		deletePost(post._id);
	};

	const handleSubmitComment = (data) => {
		try {
			let newComment = {
			//id must be created automatically
			id: Math.random(),
			post_id: post.id,
			user_id: currentUser.id,
			text: data,
		};
		console.log('POST DATA RECIVED NEW COMMENT: ', newComment);
		setComments((prevComments) => [newComment, ...prevComments]);
		setCommentCount(prevComments => ++prevComments);
		} catch(err) {
			window.alert("ERROR WHEN CREATING NEW COMMENT: ", err);
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
										{!imagePreview && (
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
											className="btn btn-primary"
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
							<Comment key={comment._id || comment.id} comment={comment} />
						))}
					</Fragment>
				)}
			</div>
		</div>
	);
};

export default Post;
