import TwitFactory from "components/TwitFactory";
import Twits from "components/Twits";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "myBase";
import React, { useEffect, useState } from "react"

const Home = ({userObj}) => {
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

    return(
        <div>
            <TwitFactory userObj={userObj} />
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