import { authService, dbService } from "fBase";
import { useNavigate } from 'react-router-dom';
import React, { Profiler, useEffect, useState } from "react";
import { query, onSnapshot, collection, where, orderBy } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

 const Profile = ({ userObj, refreshUser }) => {
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        navigate(-1);
    }
    const getMyNweets = async () => {
        const q = query(collection(dbService, 'nweets'), where('creatorId', '==', userObj.uid), orderBy('createdAt', 'desc'));
        onSnapshot(q, (snapshot) => {

        })
    }
    
    const onChange = (event) => {
        const {target:{value},} = event;
        setNewDisplayName(value);
    }
    const onSubmit = async (event) => {
        //event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(authService.currentUser, {
                displayName: newDisplayName
            });
            refreshUser();
        }
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <input type='text' placeholder='Display Name' value={newDisplayName} onChange={onChange}/>
                <input type='submit' value='Update Profile' />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;