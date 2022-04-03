import { addDoc, collection, doc, getDocs, query } from "firebase/firestore";
import { dbService } from "myBase";
import React, { useEffect, useState } from "react"

const Home = () => {
    const [twitC, setTwitC] = useState('');
    const [twits, setTwits] = useState([]);
    
    // twit db에서 데이터 리스트 호출
    const getTwits = async () => {
        const getQuery = query(collection(dbService, "twitClone"));
        const querySnapshot = await getDocs(getQuery);
        querySnapshot.forEach((tData) => {
            const twitsObj = {
                ...tData.data(),
                id: tData.id
            }
            setTwits((prev) => [twitsObj, ...prev]);
        })
    };

    useEffect(() => {
        getTwits();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        // firebase db에 doc 생성
        await addDoc(collection(dbService, "twitClone") , {
            twitC,
            createdAt: Date.now()
        });
        setTwitC('');
    };
    const onChange = (e) => {
        const {target: {value}} = e;
        setTwitC(value);
    };
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input value={twitC} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="twitterClone" />
            </form>
            <div>
                {twits.map((v) => {
                    return(<div key={v.id}>
                        <h4>{v.twitC}</h4>
                    </div>);
                })}
            </div>
        </div>
    );
};

export default Home;