import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({userObj}) => {
    console.log(userObj)
    
    const getUserDisplay = () => {
        if(userObj.displayName === null) {
            return userObj.email.split('@')[0];
        }else {
            return userObj.displayName;
        }
    };

    return(
        <nav>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/profile'>
                        {getUserDisplay()}
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;