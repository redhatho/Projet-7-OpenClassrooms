import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiLogIn } from 'react-icons/bi';

export default function Logout() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/home');
        window.location.reload();
    };

    return (
        <>
            <button onClick={logout} className=" button-logout" aria-label="Déconnexion">
                <BiLogIn className=" button-logout-icon-logout" aria-label="Déconnexion" />
            </button>
        </>
    );
}
