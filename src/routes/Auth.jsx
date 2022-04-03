import React, { useState } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";

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

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} name="email" type="text" placeholder="Email" required value={email}/>
                <input onChange={onChange} name="password" type="password" placeholder="PassWord" required value={password}/>
                <input type="submit" value={newAccount ? 'Create Account' : 'Log In'}/>
            </form>
            {error}
            <span onClick={toggleAccount}>{newAccount ? 'Sign in' : 'Create account'}</span>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    );
}

export default Auth;