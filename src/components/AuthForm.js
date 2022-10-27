import React, { useState, } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { authService } from 'fBase';

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isNewAccount, setIsNewAccount] = useState(true);

    const toggleAccount = () => setIsNewAccount(prev => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        const auth = authService;
        if (isNewAccount) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    // ...
                })
                .catch((error) => {
                    const errorMessage = error.message; const errorCode = error.code;
                    alert(error.message);
                });
            setIsNewAccount(false);
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                })
                .catch((error) => {
                    alert(error.message);
                });
        }
    };
    const onChange = (event) => {
        const { target: { name, value } } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }
    return (
        <>
            <form onSubmit={onSubmit} className="container">
                <input 
                    name="email" 
                    type="text" 
                    placeholder="Email" 
                    required value={email} 
                    onChange={onChange} 
                    className="authInput"
                />
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Password" 
                    required value={password} 
                    className="authInput"
                    onChange={onChange} 
                />
                <input 
                    type="submit" 
                    className="authInput authSubmit"
                    value={isNewAccount ? "Create Account" : "Log in"} 
                />
            </form>
            <span onClick={toggleAccount} className="authSwitch">{isNewAccount ? 'Log in' : 'Create account'} </span>
        </>
    )
}

export default AuthForm;