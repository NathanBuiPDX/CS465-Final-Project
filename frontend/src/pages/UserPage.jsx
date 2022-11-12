import React from 'react';
import './UserPage.css';
// import { useParams } from "react-router";
import { useState, useEffect, useContext } from 'react';
import { InfoContext } from '../components/InfoProvider';
import PostCreation from '../components/PostCreation';
import Post from '../components/Post';
import { useRadioGroup } from '@material-ui/core';

const UserPage = (props) => {
    const context = useContext(InfoContext);
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState({});
    // const userID = useParams().user_id;
    const userID = "1";

    useEffect(() => {
        let posts = context.posts.filter(post => post.user_id === userID);
        let user = context.users.find(user => user.id === userID);
        console.log("USER: ", user);
        setUser(user);
        setUserPosts(posts);
    }, [userID])

    // {
    //     id: "4",
    //     name: "john",
    //     full_name: "john snow",
    //     icon_url: "/assets/2.png",
    //     gender: "female",
    //     dob: "22/03/2000",
    //     about: "love doing stuff"
    // }
    return (
        <div className='userProfile'>
            <div className="userImages">

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
    );
};

export default UserPage;