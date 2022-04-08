import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({userObj}) => {
    console.log(userObj);
    const getUserDisplay = () => {
        if(userObj.displayName === null) {
            return userObj.email.split('@')[0];
        }else {
            return userObj.displayName;
        }
    };

    return(
        <nav>
            <ul style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                <li>
                    <Link to='/' style={{marginRight: '10px'}}>
                        <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
                    </Link>
                </li>
                <li>
                    <Link to='/profile' style={{marginRight: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '12px'}}>
                        <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
                        <span>
                            {getUserDisplay()}
                        </span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;