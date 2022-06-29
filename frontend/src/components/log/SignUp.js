import React, { useState } from 'react';
import SignIn from './SignIn';
import axios from 'axios';
import { api } from '../../utils/api';

export default function SignUp() {
    const [formSubmit, setFormSubmit] = useState(true);

    const [user, setUser] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        msgError: '',
    });

    const handleForm = (e) => {
        const errorUser = document.QuerySelector('.errorUser');
        e.preventDefault();
        let data = {
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName
        };

        axios
            .post(api + '/api/user/signup/', data)
            .then((res) => {
                if (res.data.error) {
                    errorUser.innerHTML = 'Cette adresse mail est déjà utilisée. Veuillez en choisir une autre';
                } else {
                    setFormSubmit(false);
                    setUser({
                        email: '',
                        firstName: '',
                        lastName: '',
                        password: '',
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleInput = (e) => {
        if (e.target.classList.contains('input-firstName')) {
            const newObjectState = { ...user, firstName: e.target.value };
            setUser(newObjectState);
        } else if (e.target.classList.contains('input-lastName')) {
            const newObjectState = { ...user, lastName: e.target.value };
            setUser(newObjectState);
        } else if (e.target.classList.contains('input-email')) {
            const newObjectState = { ...user, email: e.target.value };
            setUser(newObjectState);
        } else if (e.target.classList.contains('input-password')) {
            const newObjectState = { ...user, password: e.target.value };
            setUser(newObjectState);
        }
    };

    return (
        <>
            {formSubmit ? (
                <div className="card-log signup">
                    <form className="form form-signup" action="" onSubmit={handleForm} id="sign-up">
                        <h2>S'enregistrer</h2>
                        <div className="title-content">
                            <label>
                                Prénom
                                <br />
                                <input
                                    className="input-firstName"
                                    type="name"
                                    placeholder="Prénom"
                                    onChange={handleInput}
                                    value={user.firstName}
                                    maxLength="20"
                                    pattern="[a-zA-Z]{2,30}"
                                    title="Insérez au minimum 2 caractères"
                                    autoComplete="on"
                                    required />
                            </label>
                        </div>

                        <div className="title-content">
                            <label>
                                Nom
                                <br />
                                <input
                                    className="input-lastName"
                                    type="name"
                                    placeholder="Nom"
                                    onChange={handleInput}
                                    value={user.lastName}
                                    maxLength="20"
                                    pattern="[a-zA-Z]{2,30}"
                                    title="Insérez au minimum 2 caractères"
                                    autoComplete="on"
                                    required />
                            </label>
                        </div>

                        <div className="title-content">
                            <label>
                                Adresse mail
                                <br />
                                <input
                                    className="input-email"
                                    type="email"
                                    placeholder="Adresse mail"
                                    onChange={handleInput}
                                    value={user.email}
                                    pattern="^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$"
                                    title="Veuillez vérifiez le format de votre adresse email"
                                    required />
                            </label>
                        </div>

                        <div className="title-content">
                            <label>
                                Mot de passe
                                <br />
                                <input
                                    className="input-password"
                                    type="password"
                                    placeholder="Mot de passe"
                                    onChange={handleInput}
                                    value={user.password}
                                    pattern="(?=.*\d)(?=.*[a-z]).{8,20}"
                                    title="Votre mot de passe doit faire au moins 8 caractères, 20 au maximum, contenir au moins 1 chiffre et ne doit pas faire d'espaces."
                                    required />
                            </label>
                        </div>

                        <button className="log-button" type="submit" value="S'inscrire" aria-label="Inscription">
                            S'inscrire
                        </button>
                        <div className="errorUser"></div>
                    </form>
                </div>
            ) : (
                <>
                    <SignIn />
                    <h4 className="succes"> "Inscription réussie! Connectez-vous !"</h4>
                </>
            )}
        </>
    );
}