import React from 'react';
import { useContext } from 'react';
// import pic1 from '../assets/2.png'
import './Badge.css';
import {InfoContext} from './InfoProvider';

const Bagde = (props) => {
    const context = useContext(InfoContext);
    console.log("USER: ", context.users);
    const submitDuration = (submittedTime) => {
        let timeSubmitted = new Date(submittedTime);
        //Temp
        let currentTime = new Date(timeSubmitted.getTime() - new Date());
    }
    return (
        <div className='userBagde'>
            <img src='/assets/1.png' alt="testing" className='userIcon'/>
            <div className='userName' style={{color: props.color}}>John Snow</div>
        </div>
    );
};

export default Bagde;