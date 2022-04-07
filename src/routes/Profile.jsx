import { updateProfile } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { authService, dbService } from "myBase";
import React, { useEffect, useState } from "react"

const Profile = ({refreshUser, userObj}) => {
    const getUserDisplay = () => {
        if(userObj.displayName === null) {
            return userObj.email.split('@')[0];
        }else {
            return userObj.displayName;
        }
    };

    const [newDisplayName, setNewDisplayName] = useState(getUserDisplay);

    // logout function
    const onLogOutClick = () => {
        authService.signOut();
    };

    const getMyTwit = async () => {
        const twitQuery = query(collection(dbService, 'twitClone'), orderBy('createdAt'), where("creatorId", "==", userObj.uid));
        const querySnapshot = await getDocs(twitQuery);
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
    };

    useEffect(() => {
        getMyTwit();
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        if(getUserDisplay !== newDisplayName) {
            await updateProfile(authService.currentUser, {displayName: newDisplayName});
        }
        refreshUser();
    }

    const onChange = (e) => {
        const {target: {value}} = e;
        setNewDisplayName(value);
    };

    return(
        <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={newDisplayName} type="text" placeholder="Display Name" />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
};

export default Profile; 