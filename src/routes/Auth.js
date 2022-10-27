import React from 'react';
import { signInWithPopup, GithubAuthProvider, GoogleAuthProvider, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "fBase";
import AuthForm from 'components/AuthForm.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGoogle, faGithub,} from "@fortawesome/free-brands-svg-icons";

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
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#FF0000"}
                size="3x"
                style={{marginBottom:30}}
                />
            <AuthForm />
            <div className="authBtns">
                <button onClick={onSocialClick} name='google' className="authBtn">
                    Continue with Google
                    <FontAwesomeIcon icon={faGoogle} />
                    </button>
                <button onClick={onSocialClick} name='github' className="authBtn">
                    Continue with Github
                    <FontAwesomeIcon icon={faGithub} />
                    </button>
            </div>
        </div>
    );
}
export default Auth;
//Automatic Import :
//export default() => <span>Auth</span>;