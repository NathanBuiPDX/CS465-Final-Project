import React from 'react';
// import pic1 from '../assets/2.png'
import './Badge.css'
const Bagde = () => {
    return (
        <div className='userBagde'>
            <img src='/assets/1.png' alt="testing" className='userIcon'/>
            <div className='userName'>John Snow</div>
        </div>
    );
};

export default Bagde;