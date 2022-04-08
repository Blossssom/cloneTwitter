import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";

const AuthForm = () => {
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

    const toggleAccount = () => {
        setNewAccount(prev => {
           return !prev;
        });
    };

    return(
        <>
            <form onSubmit={onSubmit} className="container">
                <input className="authInput" onChange={onChange} name="email" type="text" placeholder="Email" required value={email}/>
                <input className="authInput" onChange={onChange} name="password" type="password" placeholder="PassWord" required value={password}/>
                <input className="authInput authSubmit" type="submit" value={newAccount ? 'Create Account' : 'Log In'}/>
            </form>
            <div>{error && <span className="authError" >{error}</span>}</div>
            <span className="authSwitch" onClick={toggleAccount}>{newAccount ? 'Sign in' : 'Create account'}</span>
        </>
    );
};

export default AuthForm;