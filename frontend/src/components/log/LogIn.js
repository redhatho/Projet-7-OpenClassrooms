import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';


export default function Log() {
    const [signInForm, setSignInForm] = useState(false);
    const [signUpForm, setSignUpForm] = useState(true);

    const handleForm = (e) => {
        if (e.target.id === 'register') {
            setSignInForm(false);
            setSignUpForm(true);
        } else if (e.target.id === 'login') {
            setSignInForm(true);
            setSignUpForm(false);
        }
    };
    return (
        <>
            <div className="connection-form">
                <ul>
                    <li onClick={handleForm} id="register" className={signInForm ? 'button-activation' : null}>
                        Se connecter
                    </li>
                </ul>
                {signInForm && <SignIn />}
                {signUpForm && <SignUp />}
            </div>
        </>
    );
}