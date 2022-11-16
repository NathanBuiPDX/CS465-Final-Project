import React from 'react';
import './UserPage.css';
// import { useParams } from "react-router";
import { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { InfoContext } from '../components/InfoProvider';
import PostCreation from '../components/PostCreation';
import Post from '../components/Post';
import NavBar from '../components/NavBar';
import { Edit, CameraAlt } from '@material-ui/icons';

const PROFILE_IMAGE = 'Profile Image';
const COVER_IMAGE = 'Cover Image';
const ABOUT = 'User Information';

const UserPage = (props) => {
	const context = useContext(InfoContext);
	const [userPosts, setUserPosts] = useState([]);
	const [user, setUser] = useState({});
	const [file, setFile] = useState(null);
	const fullNameRef = useRef('');
	const nameRef = useRef('');
	const dobRef = useRef('');
	const aboutRef = useRef('');
	const genderRef = useRef('');
	const [imagePreview, setImagePreview] = useState(null);
	const [updateSection, setUpdateSection] = useState('');
	const { userID } = useParams();
	console.log('USERID: ', userID);

	useEffect(() => {
		let posts = context.posts.filter((post) => post.user_id === userID);
		let user = context.users.find((user) => user.id === userID);
		user.cover_url = '/assets/cover-1.jpg';
		console.log('USER: ', user);
		setUser(user);
		setUserPosts(posts);
	}, []);

	// {
    //     id: "4",
    //     name: "john",
    //     full_name: "john snow",
    //     icon_url: "/assets/5.webp",
    //     gender: "female",
    //     dob: "22/03/2000",
    //     about: "love doing stuff"
    // },
	const handleUpdateProfile = (event) => {
		event.preventDefault();
		event.stopPropagation();
		let updateUser = {...user};

		if (updateSection === ABOUT) {
			updateUser.name = nameRef.current.value;
			updateUser.full_name = fullNameRef.current.value;
			updateUser.gender = genderRef.current.value;
			updateUser.dob = dobRef.current.value;
			updateUser.about = aboutRef.current.value;
			console.log("UPDATING USER INFO: ", updateUser);
		}
		if(updateSection === COVER_IMAGE) {
			//TODO : change this to file when doing PUT
			// updateUser.cover_url = file;
			updateUser.cover_url = imagePreview;
		}
		if(updateSection === PROFILE_IMAGE) {
			//TODO : change this to file when doing PUT
			// updateUser.image_url = file;
			updateUser.icon_url = imagePreview;
		}
		setUser(updateUser);
		setImagePreview(null);
		console.log('Updated User Profile!');
	};

	const handleImageUpdate = (event) => {
		event.preventDefault();
		event.stopPropagation();
		if (imagePreview) URL.revokeObjectURL(imagePreview);
		try {
			setFile(event.target.files[0]);
			setImagePreview(URL.createObjectURL(event.target.files[0]));
		} catch (err) {
			setFile(null);
			setImagePreview(null);
		}
	};

	return (
		<>
			<NavBar />
			<div className="userProfile bg-light">
				<div className="profileTop">
					<div className="userImages">
						<div style={{ width: '100%' }}>
							<img
								src={user.cover_url}
								className="coverImg"
								alt={`profile page user icon ${user.icon_url}`}
							/>
							{userID === context.currentUser.id && (
								<button
									className="btn btn-light py-1 editCoverImgButton"
									data-bs-toggle="modal"
									data-bs-target="#updateProfileModal"
									onClick={() => setUpdateSection(COVER_IMAGE)}
								>
									<CameraAlt />
									<span className="noDisplay">Edit Cover Picture</span>
								</button>
							)}
						</div>
						<div>
							<img
								src={user.icon_url}
								className="profileImg"
								alt={`profile page user icon ${user.icon_url}`}
							/>
							{userID === context.currentUser.id && (
								<button
									id="iconPicture"
									className="btn btn-dark rounded-circle p-1 editProfileImgButton"
									data-bs-toggle="modal"
									data-bs-target="#updateProfileModal"
									onClick={() => setUpdateSection(PROFILE_IMAGE)}
								>
									<CameraAlt />
									<span className="noDisplay">Edit profile Picture</span>
								</button>
							)}
						</div>
					</div>
					<div className="userNameSection">
						<p>{user.full_name}</p>
						<p>({user.name})</p>
					</div>
				</div>

				<div className="userContent container">
					<div className="row">
						<div className="userInfo col-12 col-md-4 bg-light">
							<div className="about">
								About {user.name}
								{userID === context.currentUser.id && (
									<button
										data-bs-toggle="modal"
										data-bs-target="#updateProfileModal"
										className="btn btn-light p-1 rounded-circle editButton"
										onClick={() => setUpdateSection(ABOUT)}
									>
										<Edit />
										<span className="noDisplay">Edit About Me</span>
									</button>
								)}
							</div>

							<div className="infoRow">
								<div className="infoLabel">Full Name:</div>
								<div className="infoData">{user.full_name}</div>
							</div>
							<div className="infoRow">
								<div className="infoLabel">Preffer Name:</div>
								<div className="infoData">{user.name}</div>
							</div>
							<div className="infoRow">
								<div className="infoLabel">Gender:</div>
								<div className="infoData">{user.gender}</div>
							</div>
							<div className="infoRow">
								<div className="infoLabel">Date Of Birth:</div>
								<div className="infoData">{user.dob}</div>
							</div>
							<div className="infoRow">
								<div className="infoLabel">About Me:</div>
								<div className="infoData">{user.about}</div>
							</div>
						</div>

						<div className="userPost col-12 col-md-8">
							{userID === context.currentUser.id && <PostCreation />}
							{userPosts.map((post) => (
								<Post key={post.id} post={post} />
							))}
						</div>
					</div>
				</div>
				<div
					className="modal fade"
					id="updateProfileModal"
					data-bs-keyboard="false"
					tabIndex="-1"
					aria-labelledby="updatePostModalLabel"
					aria-hidden="true"
				>
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h1 className="modal-title fs-5" id="updateProfileModalLabel">
									Updating {updateSection}
								</h1>
								<button
									type="button"
									className="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"
								></button>
							</div>
							<div className="modal-body">
								<form onSubmit={handleUpdateProfile}>
									{updateSection && updateSection === ABOUT && (
										<div className="UpdateAboutSection">
											<div className="infoRow">
												<label htmlFor="fullname" className="infoLabel">
													Full Name:
												</label>
												<input
													type="text"
													className="infoInput"
													name="fullname"
													id="fullname"
													defaultValue={user.full_name}
													ref={fullNameRef}
												/>
											</div>
											<div className="infoRow">
												<label htmlFor="name" className="infoLabel">
													Preffer Name:
												</label>
												<input
													type="text"
													className="infoInput"
													name="name"
													id="name"
													defaultValue={user.name}
													ref={nameRef}
												/>
											</div>
											<div className="infoRow">
												<label htmlFor="gender" className="infoLabel">
													Gender:
												</label>
												{/* <input type="text" className='infoInput' name="fullname" id="gender" defaultValue={user.gender}/> */}
												<select
													name="gender"
													id="gender"
													className="infoInput"
													defaultValue={user.gender}
													ref={genderRef}
												>
													<option value="male">male</option>
													<option value="female">female</option>
													<option value="other">other</option>
												</select>
											</div>
											<div className="infoRow">
												<label htmlFor="dob" className="infoLabel">
													Date of Birth:
												</label>
												<input
													type="date"
													className="infoInput"
													name="dob"
													id="dob"
													defaultValue={new Date(user.dob)}
													ref={dobRef}
												/>
											</div>
											<div className="infoRow d-flex flex-column">
												<label htmlFor="aboutme" className="infoLabel">
													About Me:
												</label>
												<textarea
													type="text"
													className="infoInputAboutMe"
													name="aboutme"
													id="aboutme"
													defaultValue={user.about}
													ref={aboutRef}
												/>
											</div>
										</div>
									)}
									{updateSection && updateSection !== ABOUT && (
										<div className="updateImage">
											<div className="infoRow">
												<label htmlFor="imgUpdate" className="infoLabel">
													{updateSection}
												</label>
												<input
													type="file"
													name="imgUpdate"
													id="imgUpdate"
													onChange={handleImageUpdate}
												/>
											</div>
											{!imagePreview && (
												<img
													src={
														updateSection === PROFILE_IMAGE
															? user.icon_url
															: user.cover_url
													}
													className="imageModal"
													alt="initial imgUpdate section"
												/>
											)}
											{imagePreview && (
												<img
													src={imagePreview}
													className="imageModal"
													alt="preview update userImage"
												/>
											)}
										</div>
									)}

									<div className="modal-footer">
										<button
											type="button"
											className="btn btn-secondary"
											data-bs-dismiss="modal"
										>
											Cancel
										</button>
										<button
											type="submit"
											className="btn btn-primary"
											data-bs-dismiss="modal"
										>
											Update
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserPage;
