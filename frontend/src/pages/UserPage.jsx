import React from 'react';
import './UserPage.css';
// import { useParams } from "react-router";
import { useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import { InfoContext } from '../components/InfoProvider';
import PostCreation from '../components/PostCreation';
import Post from '../components/Post';
import NavBar from '../components/NavBar';

const UserPage = (props) => {
    const context = useContext(InfoContext);
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState({});
    const {userID} = useParams();
    console.log("USERID: ", userID);

    useEffect(() => {
        let posts = context.posts.filter(post => post.user_id === userID);
        let user = context.users.find(user => user.id === userID);
        console.log("USER: ", user);
        setUser(user);
        setUserPosts(posts);
    }, [userID])

    return (
        <>
            <NavBar/>
            <div className='userProfile bg-light'>
                <div className="profileTop">
                    <div className="userImages">
                        <img src="/assets/cover-1.jpg" className="coverImg" alt={`profile page user icon ${user.icon_url}`} />
                        <img src={user.icon_url} className="profileImg" alt={`profile page user icon ${user.icon_url}`} />
                    </div>
                    <div className="userNameSection">
                        <p>{user.full_name}</p>
                        <p>({user.name})</p>
                    </div>

                </div>
                
                <div className="userContent container">
                    <div className="row">
                        <div className="userInfo col-12-sm col-4 bg-light">
                            <div className='about'>About {user.name}</div>
                            <div className='infoRow'>
                                <div className='infoLabel'>Full Name:</div>
                                <div className='infoData'>{user.full_name}</div>
                            </div>
                            <div className='infoRow'>
                                <div className='infoLabel'>Preffer Name:</div>
                                <div className='infoData'>{user.name}</div>
                            </div>
                            <div className='infoRow'>
                                <div className='infoLabel'>Gender:</div>
                                <div className='infoData'>{user.gender}</div>
                            </div>
                            <div className='infoRow'>
                                <div className='infoLabel'>Date Of Birth:</div>
                                <div className='infoData'>{user.gender}</div>
                            </div>
                            <div className='infoRow'>
                                <div className='infoLabel'>About Me:</div>
                                <div className='infoData'>{user.about}</div>
                            </div>
                        </div>

                        <div className="userPost col-12-sm col-8">
                            {userID === context.currentUser.id && <PostCreation/>}
                            {userPosts.map(post => <Post key={post.id} post={post}/>)}
                        </div>

                    </div>
                </div>    
            </div> 
        </>
    );
};

export default UserPage;