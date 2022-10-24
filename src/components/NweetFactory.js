import React, {useState} from 'react';
import { dbService, storageService } from 'fBase';
import Nweet from 'components/Nweet';
import { v4 as uuidv4 } from 'uuid';
import {addDoc, collection} from 'firebase/firestore';
import { ref, uploadString, getDownloadURL, deleteObject } from 'firebase/storage';

const NweetFactory = ({userObj}) => {
    const [nweet, setNweet] = useState('');
    const [attachment, setAttachment] = useState();
    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentURL = '';
        if (attachment != null) {
            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(attachmentRef, attachment, 'data_url');
            attachmentURL = await getDownloadURL(ref(storageService, attachmentRef));
        }
        await addDoc(collection(dbService, 'nweets'), {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentURL,
        });
        setNweet("");
        setAttachment("");
        
    }
    const onChange = (event) => {
        const { target: { value } } = event;
        setNweet(value);
    }
    const onFileChange=(event) => {
        const {target:{files}} = event;
        const newFile=files[0];
        const reader= new FileReader();
        reader.readAsDataURL(newFile);
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: {result},
            } = finishedEvent;
            setAttachment(result);
        }
    }
    const onClearAttachment = () => setAttachment(null);
    return (
        <form onSubmit={onSubmit}>
                <input value={nweet} 
                    onChange={onChange} 
                    type='text' 
                    placeholder="What's on your mind?" 
                    maxLength={120} 
                />
                <input type='file' accept='image/*' onChange={onFileChange}/>
                <input type='submit' value='Nweet' />
                {attachment && (
                    <div>
                        <img src={attachment} width='50px' height='50px' />
                        <button onClick={onClearAttachment}>Clear Photo</button>
                    </div>
                    )}
            </form>
    )
}

export default NweetFactory;