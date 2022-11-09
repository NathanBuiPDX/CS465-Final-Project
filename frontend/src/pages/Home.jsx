import React from 'react';
import NavBar from "../components/NavBar";
import NewsFeed from './NewsFeed';
import './Home.css';

const Home = () => {
    return (
        <div>
            <NavBar/>
            <div className='homePage'>
                <NewsFeed/>
            </div>
        </div>
    );
};

export default Home;