import React, { Fragment, useEffect, useState, useContext } from 'react';
import './Post.css';
import Bagde from './Badge';
import { InfoContext } from './InfoProvider';
import { ThumbUp } from '@material-ui/icons';
import Comment from './Comment';
import { MoreHoriz } from '@material-ui/icons';
import CommentCreation from './CommentCreation';
import { useRef } from 'react';

const Post = ({ post }) => {
	const context = useContext(InfoContext);
	const updateCaption = useRef(post.caption);
	const [file, setFile] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const [like, setLike] = useState(false);
	const [likeCount, setLikeCount] = useState(post.like_count);
	const [comments, setComments] = useState([]);
	const [viewComment, setViewComment] = useState(false);

	const currentUser = context.currentUser;

	useEffect(() => {
		let comments = context.comments.filter(
			(comment) => comment.post_id === post.id
		);
		setComments(comments);
	}, []);

	const handleLikeClick = (event) => {
		event.preventDefault();
		setLike((prevState) => {
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
		setTimeout(() => {
			// get the post again
			URL.revokeObjectURL(imagePreview);
			console.log('Post Updated!');
		}, 2000);
	};

	const handleDeletePost = (event) => {
		event.preventDefault();

		console.log('Post Deleted!');
	};

	const handleSubmitComment = (data) => {
		let newComment = {
			//id must be created automatically
			id: '10',
			post_id: post.id,
			user_id: currentUser.id,
			text: data,
		};
		console.log('POST DATA RECIVED: ', newComment);
		setComments((prevComments) => [newComment, ...prevComments]);
	};

	return (
		<div className="post bg-light">
			<div className="postTop d-flex justify-content-between">
				<Bagde post={post} />
				{post.user_id === currentUser.id && (
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
												ref={updateCaption}
												defaultValue={post.caption}
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
						{likeCount > 0 && <div className="pt-1">{likeCount} Likes</div>}
					</div>
					<div>
						{post.comments_count > 0 && (
							<div
								className="pt-1 commentCount"
								onClick={() => setViewComment((prevState) => !prevState)}
							>
								{post.comments_count} Comments
							</div>
						)}
					</div>
				</div>
				{viewComment && (
					<Fragment>
						<CommentCreation submitComment={handleSubmitComment} />
						{comments.map((comment) => (
							<Comment key={comment.id} comment={comment} />
						))}
					</Fragment>
				)}
			</div>
		</div>
	);
};

export default Post;
