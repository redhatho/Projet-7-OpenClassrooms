import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiLogIn } from 'react-icon/bi';

export default function Logout() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/home');
        window.location.reload();
    };

    return (
        <>
            <button onClick={logout} className="logout-button" aria-label="Déconnexion">
                <BiLogIn className="logout-icon-button" aria-label="Déconnexion" />
            </button>
        </>
    );
}