import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="err">
            <h1>Erreur, cette page n'existe pas</h1>
            <button className="err post-button" onClick={() => navigate('/')} aria-label=" page d'erreur retour à l'actualités ">
                Retourner à l'accueil
            </button>
        </div>
    );
};

export default NotFound;