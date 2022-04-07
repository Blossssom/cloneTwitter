import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { dbService, storageService } from "myBase";
import React, { useState } from "react";

const Twits = ({twitsObj, isOwner}) => {
    // toggle을 위한 state
    const [editing, setEditing] = useState(false);
    // edit을 위한 내용 state
    const [newTwit, setNewTwit] = useState(twitsObj.text);
    const twitRef = doc(dbService, 'twitClone', `${twitsObj.id}`);
    const imageUrl = ref(storageService, twitsObj.attachmentUrl);

    const onDeleteClick = async () => {
        const deleteCheck = window.confirm('Are you sure want to delete?');

        if(deleteCheck) {
            await deleteDoc(twitRef);
            await deleteObject(imageUrl);
        }
    };

    const toggleEditing = () => {
        setEditing((prev) => !prev);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await updateDoc(twitRef, {text: newTwit});
        setEditing((prev) => !prev);
    };

    const onChange = (e) => {
        const {target: {value}} = e;
        setNewTwit(value);
    };

    return(
        <div>
            <h4>{twitsObj.text}</h4>
            {editing ? 
            (<>
                <form onSubmit={onSubmit}>
                    <input onChange={onChange} placeholder="Edit twits text" type="text" value={newTwit} required />
                    <input type="submit" value='Update Twits' />
                </form>
                <button onClick={toggleEditing}>Cancel</button>
            </>) : 
            (<> 
            {twitsObj.attachmentUrl && (<img src={twitsObj.attachmentUrl} width="50px" height="50px" alt="pic"></img>)}
                {
                    // props로 받아온 isOwner가 true일 경우에만 버튼 활성화
                    isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Twits</button>
                            <button onClick={toggleEditing}>Edit Twits</button>
                        </>
                    )
                }
            </>)
            }
        </div>
    );
}

export default Twits;