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

		setIsUpdating(true);
		console.log('Form Submitted with content: ', content.current.value);
		try {
			let newPost = {
				user_id: currentUser.id,
				post_time: new Date().toISOString(),
				image_url:file,
				caption: content.current.value,
				like_count: 0,
				comments_count:0
			};
			submitPost(newPost);
			setIsUpdating(false);
			content.current.value = '';
			setFile(null);
			setImagePreview(null);
		} catch (err) {
			window.alert('Can not Post a new post!');
			console.log(err);
			setIsUpdating(false);
		}
		URL.revokeObjectURL(imagePreview);
	
		
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
