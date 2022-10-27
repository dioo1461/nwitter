import React, { useState } from 'react';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { dbService, storageService } from 'fBase';
import { deleteObject, ref } from 'firebase/storage';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
            target: { value },
        } = event;
        setNewNweet(value);
    }
    return (
        <div className="nweet">
            {editing ? (
                <>
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input 
                            type='text' 
                            placeholder='Edit your Nweet' 
                            onChange={onChange} 
                            value={newNweet} 
                            required
                            autoFocus
                            className="formInput" 
                        />
                        <input type='submit' value='Update Nweet' className="formBtn" />
                    </form>
                    <span onClick={toggleEditing} className="formBtn cancelBtn">Cancel</span>
                </>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentURL && <img src={nweetObj.attachmentURL} />}
                    {isOwner && (
                        <div className="nweet__actions">
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Nweet;