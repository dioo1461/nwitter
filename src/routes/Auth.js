import React, { useState } from "react";
import { signInWithPopup, GithubAuthProvider, GoogleAuthProvider, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "fBase";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isNewAccount, setIsNewAccount] = useState(true);
    const onChange = (event) => {
        const { target: { name, value } } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        const auth = getAuth();
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

    const toggleAccount = () => setIsNewAccount(prev => !prev);
    const onSocialClick = async (event) => {
        const { target: { name } } = event;
        let provider;
        if (name === 'google') {
            provider = new GoogleAuthProvider();
        } else if (name === 'github') {
            provider = new GithubAuthProvider();
        }

        const auth = getAuth();
        await signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const errorEmail = error.customData.email;
            const credential = GoogleAuthProvider.credential;
        })
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="text" placeholder="Email" required value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
                <input type="submit" value={isNewAccount ? "Create Account" : "Log in"} />
            </form>
            <span onClick={toggleAccount}>{isNewAccount ? 'Log in' : 'Create account'} </span>
            <div>
                <button onClick={onSocialClick} name='google'>Continue with Google</button>
                <button onClick={onSocialClick} name='github'>Continue with Github</button>
            </div>
        </div>
    );
}
export default Auth;
//Automatic Import :
//export default() => <span>Auth</span>;