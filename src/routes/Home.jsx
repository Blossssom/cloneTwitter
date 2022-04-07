import Twits from "components/Twits";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService, storageService } from "myBase";
import React, { useEffect, useRef, useState } from "react"
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";

const Home = ({userObj}) => {
    const [twitC, setTwitC] = useState('');
    const [twits, setTwits] = useState([]);
    const [attachment, setAttachment] = useState('');
    const attachmentFile = useRef();
    

    useEffect(() => {
        // useEffect를 활용해 실시간으로 db 데이터 호출
        // orderBy가 없을 시 순서가 뒤죽박죽으로 출력됨
        const twitQuery = query(collection(dbService, 'twitClone'), orderBy('createdAt'));
        onSnapshot(twitQuery, (snapshot) => {
            const twitList = snapshot.docs.map((doc) => {
                return {id: doc.id, ...doc.data()};
                
            })
            setTwits(twitList);
        });
    }, []);

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
        <div>
            <form onSubmit={onSubmit}>
                <input value={twitC} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input onChange={onFileChange} type="file" accept="image/*" ref={attachmentFile} />
                <input type="submit" value="twitterClone" />
                {attachment &&
                <div>
                    <img src={attachment} width='50px' height='50px' alt="pic" />
                    <button onClick={onClearAttachmentClick}>Cancel upload</button>
                </div>
                }
            </form>
            <div>
                {/* db에서 가져온 twits 출력 */}
                {twits.map((v) => {
                    return(<Twits key={v.id} twitsObj={v} isOwner={v.creatorId === userObj.uid} />);
                })}
            </div>
        </div>
    );
};

export default Home;