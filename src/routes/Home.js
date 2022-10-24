import React, { useState, useEffect } from "react";
import { onSnapshot, collection, query, where, orderBy, addDoc } from 'firebase/firestore';
import {dbService, storageService} from "fBase";
import NweetFactory from "components/NweetFactory";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
    
    const [nweets, setNweets] = useState([]);
    
    const getNweets = async () => {
        const q = query(collection(dbService, 'nweets'), /*where('creatorId', '==', userObj.uid),*/ orderBy('createdAt', 'desc'));
        onSnapshot(q, (snapshot) => {
            const nweetArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArr);
        });
    }
    useEffect(() => {
        getNweets();
    }, [])
    
    return (
        <div>
            <NweetFactory userObj={userObj}/>
            {<div>
                {nweets.map(nweet =>
                    <Nweet 
                        key={nweet.id} 
                        nweetObj={nweet} 
                        isOwner={nweet.creatorId === userObj.uid} 
                    />
                )}
            </div>}
        </div>
    );
}

export default Home;