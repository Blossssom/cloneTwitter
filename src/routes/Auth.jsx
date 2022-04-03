import React, { useState } from "react"
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { authService } from "myBase";

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState('');

    const onChange = (e) => {
        const {target: {name, value}} = e;
        if(name === 'email') {
            setEmail(value);
        }else if(name === 'password') {
            setPassword(value);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        // 따로 실행시키지 않고 지정할 경우 에러가 난다. (왜지)?
        const auth = getAuth();
        let data;
        try {
            if(newAccount) {
                // create account
                data = await createUserWithEmailAndPassword(auth, email, password);
            }else {
                // login
                data = await signInWithEmailAndPassword(auth, email, password);
            }
            console.log(data);
        }catch(err) {
            setError(err.message);
        }
    };

    // login, create 버튼 토글 함수
    const toggleAccount = () => {
         setNewAccount(prev => {
            return !prev;
         });
    };

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
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} name="email" type="text" placeholder="Email" required value={email}/>
                <input onChange={onChange} name="password" type="password" placeholder="PassWord" required value={password}/>
                <input type="submit" value={newAccount ? 'Create Account' : 'Log In'}/>
            </form>
            <div>{error}</div>
            <span onClick={toggleAccount}>{newAccount ? 'Sign in' : 'Create account'}</span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    );
}

export default Auth;