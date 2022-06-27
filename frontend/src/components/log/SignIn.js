import React, { useState } from 'react';
import axios from 'axios';
import { api } from '../../Utils/api';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: '',
        msgError: '',
    });

    const handleLogin = (e) => {
        e.preventDefault();
        if (user.email === '' || user.password === '') {
            setUser({
                ...user,
                msgError: 'Tous les champs doivent être remplis',
            });
        } else {
            let data = {
                email: user.email,
                password: user.password,
            };
            axios
                .post(api + '/api/auth/login/', data)
                .then((response) => {
                    localStorage.setItem('token', JSON.stringify(response.data));
                    navigate('/');
                    window.location.reload();
                })
                .catch((err) => {
                    const auth = localStorage.getItem('token');

                    if (!auth) {
                        setUser({
                            ...user,
                            msgError:
                                'Utilisateur non trouvé, vérifiez vos informations ou contactez un admin ',
                        });

                        console.log('No Token');
                    }
                    console.log(err);
                });
        }
    };

    const handleInput = (e) => {
        if (e.target.classList.contains('input-email')) {
            const newObjectState = { ...user, email: e.target.value };
            setUser(newObjectState);
        } else if (e.target.classList.contains('input-password')) {
            const newObjectState = { ...user, password: e.target.value };
            setUser(newObjectState)
        }
    };

    return (
        <>
            <div className="card-log signin">
                <form className="form form-signin" action="" onSubmit={handleLogin} id="sign-up">
                    <h2>Se connecter</h2>
                    <div className="title-content">
                        <label>
                            Adresse email
                            <br />
                            <input className="input-email" type="email" placeholder="Adresse email" onChange={handleInput} value={user.email} />
                        </label>
                    </div>

                    <div className="title-content">
                        <label>
                            Mot de passe
                            <br />
                            <input className="input-password" type="password" placeholder="Mot de passe" id="password" onChange={handleInput} value={user.password} />
                        </label>
                    </div>
                    <button className="log-button" type="submit" value="Se connecter" aria-label='Connexion'>
                        Envoyer
                    </button>
                    <p className="userNotFound"></p>
                </form>
            </div>
            <p className="userNotFound">{user.msgError}</p>
        </>
    );
}