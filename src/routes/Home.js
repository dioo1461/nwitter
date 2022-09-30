import React, { useState, useEffect } from "react";
import { onSnapshot, collection, query, where, orderBy, addDoc } from 'firebase/firestore';
import { dbService } from 'fBase';

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState('');
    const [nweets, setNweets] = useState([]);
    const getNweets = async () => {
        const q = query(collection(dbService, 'nweets'), where('creatorId', '==', userObj.uid), orderBy('createdAt', 'desc'));
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
    const onSubmit = async (event) => {
        event.preventDefault();
        await addDoc(collection(dbService, 'nweets'), {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setNweet("");
    }
    const onChange = (event) => {
        const { target: { value } } = event;
        setNweet(value);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type='text' placeholder="What's on your mind?" maxLength={120} />
                <input type='submit' value='Nweet' />
            </form>
            <div key={nweet.id}>
                {nweets.map(nweet => 
                <div>
                    <h4>{nweet.text}</h4>
                </div>)}
            </div>
        </div>
    );
}  

export default Home;