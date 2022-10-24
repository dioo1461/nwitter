import React from 'react';
import { signInWithPopup, GithubAuthProvider, GoogleAuthProvider, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "fBase";
import AuthForm from 'components/AuthForm.js';

const Auth = () => {
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
            <AuthForm />
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