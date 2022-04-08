import React, { useRef, useState } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { dbService, storageService } from "myBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const TwitFactory = ({userObj}) => {
    const [attachment, setAttachment] = useState('');
    const attachmentFile = useRef();
    const [twitC, setTwitC] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        let attachmentUrl = '';

        if(attachment !== "" && twitC.length > 0) {
            const attachmentRef = ref(storageService, `${userObj.uid}/${v4()}`);
            const response = await uploadString(attachmentRef, attachment, 'data_url');
            attachmentUrl = await getDownloadURL(response. ref);
        }

        const twitForm = {
            text: twitC,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        };

        // firebase db에 doc 생성
        if(twitC.length > 0) {
            await addDoc(collection(dbService, "twitClone") , twitForm);
        }else {
            return;
        }
        setAttachment('');
        setTwitC('');
        attachmentFile.current.value = '';
    };

    const onChange = (e) => {
        const {target: {value}} = e;
        setTwitC(value);
    };

    const onFileChange = (e) => {
        // 선택한 사진 file 데이터
        const {target: {files}} = e;
        const imgFile = files[0];
        // fileReader API
        const reader = new FileReader();
        // file loading
        reader.onloadend = (finisheEvent) => {
            const {currentTarget: {result}} = finisheEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(imgFile);
    };

    const onClearAttachmentClick = () => {
        attachmentFile.current.value = '';
        setAttachment('');
    };

    return(
        <form className="factoryForm" onSubmit={onSubmit}>
            <div className="factoryInput__container">
                <input className="factoryInput__input" value={twitC} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input className="factoryInput__arrow" type="submit" value="&rarr;"  />
            </div>
            <label className="factoryInput__label" htmlFor="attach-file">
                <span>Add Photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input id="attach-file" onChange={onFileChange} type="file" accept="image/*" ref={attachmentFile} style={{opacity: 0}} />


            {attachment &&
            (<div className="factoryForm__attachment">
                <img src={attachment} style={{backgroundImage: attachment}} alt="pic" />
                <div className="factoryForm__clear" onClick={onClearAttachmentClick}>
                    <span>Remove</span>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
            </div>)
            }
        </form>
    );
};

export default TwitFactory;