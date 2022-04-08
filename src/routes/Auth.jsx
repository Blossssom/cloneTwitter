import React from "react"
import { GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { authService } from "myBase";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle, faTwitter } from "@fortawesome/free-brands-svg-icons";

const Auth = () => {

    // social login function
    const onSocialClick = async (e) => {
        const {target: {name}} = e;
        let provider;
        if(name === 'google') {
            provider = new GoogleAuthProvider();
            
        }else if(name === 'github') {
            provider = new GithubAuthProvider();
        }
        const data = signInWithPopup(authService, provider);
        console.log(data);
    };

    return(
        <div className="authContainer">
            <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="3x" style={{marginBottom: '30px'}} />
            <AuthForm />
            <div className="authBtns">
                <button className="authBtn" onClick={onSocialClick} name="google">
                    Continue with Google <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button className="authBtn" onClick={onSocialClick} name="github">
                    Continue with Github <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </div>
    );
}

export default Auth;