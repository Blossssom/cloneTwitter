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
        <div className="container">
            <form className="profileForm" onSubmit={onSubmit}>
                <input className="formInput" onChange={onChange} value={newDisplayName} type="text" placeholder="Display Name" autoFocus />
                <input className="formBtn" type="submit" value="Update Profile" style={{marginTop: '10px'}} />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>Log Out</span>
        </div>
    )
};

export default Profile; 