import React, { useState, useRef, useContext } from 'react';
import './PostCreation.css';
import { Block, Photo } from '@material-ui/icons';
import { InfoContext } from './InfoProvider';
import { useEffect } from 'react';
import axios from "axios";

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
		// let headers = {Cookie:`userId=${localStorage.getItem('userId')}`}} 
		axios
            .post("http://localhost:8800/api/posts", {
              user_id: currentUser.id,
              caption: content.current.value,
              like_count: 0,
              comments_count: 0,
              image_url: imagePreview,


            }, {headers:{"Cookie":`userId=${localStorage.getItem('userId')}`}})
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              window.alert("unable to register");
              console.log(error);
            });
		setIsUpdating(true);
		console.log('Form Submitted with content: ', content.current.value);
		setTimeout(() => {
			try {
				let newPost = {
					user_id: currentUser.id,
					post_time: new Date().toISOString(),
					//TODO: uncomment the below line
					// image_url:file,
					image_url: imagePreview,
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
			// URL.revokeObjectURL(imagePreview);
		}, 2000);
	
		
	};

	return (
		<form className="postCreation bg-light" onSubmit={handleFormSubmit}>
			<div className="userCaption">
				<label htmlFor="caption">
					<img
						src={currentUser.icon_url}
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
						className="btn btn-primary postButton"
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
