import { authService } from "myBase";
import React from "react"

const Profile = () => {
    // logout function
    const onLogOutClick = () => {
        authService.signOut();
    };

    return(
        <button onClick={onLogOutClick}>Log Out</button>
    )
};

export default Profile;