import Twits from "components/Twits";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "myBase";
import React, { useEffect, useState } from "react"

const Home = ({userObj}) => {
    const [twitC, setTwitC] = useState('');
    const [twits, setTwits] = useState([]);
    

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
        // firebase db에 doc 생성
        if(twitC.length > 0) {
            await addDoc(collection(dbService, "twitClone") , {
                text: twitC,
                createdAt: Date.now(),
                creatorId: userObj.uid
            });
        }else {
            return;
        }
        
        setTwitC('');
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
        reader.onloadend = (finisheEvent) => {
            console.log(finisheEvent);
        }
        reader.readAsDataURL(imgFile);
    };

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input value={twitC} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input onChange={onFileChange} type="file" accept="image/*" />
                <input type="submit" value="twitterClone" />
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