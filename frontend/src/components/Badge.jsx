import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { msToDuration } from '../utilities/Helpers';
import './Badge.css';
import {InfoContext} from './InfoProvider';

const Bagde = (props) => {
    const context = useContext(InfoContext);
    const [postDuration, setPostDuration] = useState('');

    //MOCK USER DATA
    // {
    //     id: "1",
    //     name: "nathan",
    //     full_name: "nathan bui",
    //     icon_url: "/assets/1.png",
    //     gender: "male",
    //     dob: "22/03/2000",
    //     about: "love doing stuff"
    // }
    const user = context.users[0];
    //POST
    const post = {
        id: "1",
        user_id: "1",
        post_time: '2022-11-09T06:20:11.514Z',
        image_url: '/assets/1.png',
        caption: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. \
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an \
        unknown printer took a galley of type and scrambled it to make a type specimen book",
        like_count: 10,
        comments_count: 20
    };

    useEffect(() => {
        setPostDuration(submitDuration(post.post_time))
    }, [])

    const submitDuration = (submittedTime) => {
        //Temp
        console.log("DATE RECEIVED: ", submittedTime);
        let timeSubmitted = new Date(submittedTime);
        console.log("DATE: ", timeSubmitted)
        let diffTime = new Date().getTime() - timeSubmitted.getTime();
        return msToDuration(diffTime);
    }

    return (
        <div className='userBagde'>
            <img src={user.icon_url} alt={user.icon_url} className='userIcon'/>
            <div className='bagdeInfo'>
                <p className='userName'>{user.name}</p>
                <p className='timeDuration'>{postDuration}</p>
            </div>
        </div>
    );
};

export default Bagde;