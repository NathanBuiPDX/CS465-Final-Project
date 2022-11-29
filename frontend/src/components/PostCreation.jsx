import React, { useState, useRef, useContext } from 'react';
import './PostCreation.css';
import { Block, Photo } from '@material-ui/icons';
import { InfoContext } from './InfoProvider';
import { useEffect } from 'react';

const DEFAULT_PROFILE_IMG = process.env.REACT_APP_DEFAULT_ICON;

const PostCreation = ({submitPost}) => {
	const context = useContext(InfoContext);
	const content = useRef('');
	const [file, setFile] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const [isUpdating, setIsUpdating] = useState(false);
	const [currentUser, setCurrentUser] = useState(context.currentUser);
	
	useEffect(() => {
		setCurrentUser(context.currentUser);
	}, [context.currentUser])

	const handleImageUpload = (event) => {
		event.preventDefault();
		try {
			console.log('FILE: ', event.target.files[0]);
			setFile(event.target.files[0]);
			setImagePreview(URL.createObjectURL(event.target.files[0]));
		} catch (err) {
			console.log(err);
			setFile(null);
			setImagePreview(null);
		}
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();

		if (!file && !content.current.value) window.alert("Can not create an empty post!");
		else{
			setIsUpdating(true);
			try {
				let newPost = new FormData();
				newPost.append('user_id', currentUser._id);
				newPost.append('caption', content.current.value);
				newPost.append('like_count', 0);
				newPost.append('comments_count', 0);
	
				if (file) newPost.append('imageFile', file);
				submitPost(newPost);
				setFile(null);
				setIsUpdating(false);
				content.current.value = '';
				setImagePreview(null);
			} catch (err) {
				window.alert('Can not Post a new post!');
				console.log(err);
				setFile(null);
				setIsUpdating(false);
				content.current.value = '';
				setImagePreview(null);
			}
			URL.revokeObjectURL(imagePreview);	
		}	
	};

	return (
		<form className="postCreation bg-light" onSubmit={handleFormSubmit}>
			<div className="userCaption">
				<label htmlFor="caption">
					<img
						src={currentUser.icon_url || DEFAULT_PROFILE_IMG}
						alt={`${currentUser.icon_url} from PostCreation`}
						className="userIcon"
					/>
				</label>
				<textarea
					type="text"
					placeholder="Share your thoughts here"
					ref={content}
					id="caption"
					className="caption"
				/>
			</div>
			{imagePreview && (
				<img
					src={imagePreview}
					style={{ display: 'block', width: '100%', marginTop: '15px' }}
					alt="preview post"
				/>
			)}
			<div className="uploadFile">
				<div>
					<label htmlFor="file" className="photoSharing">
						<Photo className="photoIcon" htmlFor="file" />
						<span className="iconLabel">Photo/Image</span>
					</label>
					<input
						type="file"
						id="file"
						className="noDisplay"
						onChange={handleImageUpload}
					/>
				</div>
				<div>
					{imagePreview && (
						<button
							type="button"
							className="btn btn-secondary mx-2"
							onClick={() => {
								URL.revokeObjectURL(imagePreview);
								setImagePreview(null);
								setFile(null);
								setIsUpdating(false);
							}}
						>
							Cancel
						</button>
					)}
					<button
						type="submit"
						className="btn btn-primary postButton m-0"
						disabled={isUpdating}
					>
						{isUpdating ? 'Posting' : 'Post'}
					</button>
				</div>
			</div>
		</form>
	);
};

export default PostCreation;
