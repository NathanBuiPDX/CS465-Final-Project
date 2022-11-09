import React, { useState } from 'react';
import {Users} from  '../mockdata';

export const InfoContext = React.createContext();


const InfoProvider = ({children}) => {
    const [users, setUser] = useState([...Users]);
    const [currentUser, setCurrentUser] = useState({});
    const [recentlySearch, setRecentlySearch] = useState([]);

    const addRecentlySearch = (newSearch) => {
        setRecentlySearch(currentArraySearch => {
            let updatedArray = [...currentArraySearch];
            if (updatedArray.length > 6) updatedArray.pop();
            updatedArray.push(newSearch);
            return updatedArray;
        })
    } 

    const addCurrentUser = (currentUser) => {
        setCurrentUser(currentUser);
    }

    return (
        <InfoContext.Provider
            value = {{
                addRecentlySearch : addRecentlySearch,
                users: users,
                setCurrentUser : addCurrentUser
            }}
        >
            {children}
        </InfoContext.Provider>
    );
};

export default InfoProvider;