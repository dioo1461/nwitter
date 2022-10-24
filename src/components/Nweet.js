import React, { useState } from 'react';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { dbService, storageService } from 'fBase';
import { deleteObject, ref } from 'firebase/storage';

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm('Are you sure you want to delete this nweet?');
        if (ok) {
            await deleteDoc(doc(dbService, `nweets/${nweetObj.id}`));
            if (nweetObj.attachmentURL != '') {
                await deleteObject(ref(storageService, nweetObj.attachmentURL));
            };
        }
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        //storageService.ref().child()
        const originDocRef = doc(dbService, 'nweets', nweetObj.id);
        await updateDoc(originDocRef, { text: newNweet });
        setEditing(false);
    }
    const onChange = (event) => {
        const {
            target:{value},
        } = event;
        setNewNweet(value);
    }
    return (
        <div> 
            { editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input type='text' placeholder='Edit your Nweet' onChange={onChange} value={newNweet} required/>
                        <input type='submit' value='Update Nweet' />
                    </form>    
                    <button onClick={toggleEditing}>Cancel</button>
                </>
                ) : 
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentURL && <img src={nweetObj.attachmentURL} width='50px' height='50px' />}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </>
                    )}
                </>
            }
        </div>
    );
}

export default Nweet;