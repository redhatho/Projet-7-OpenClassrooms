import React from 'react';
import { userNavigation } from 'react-router-dom';

export default function NotFound() {
    const navigation = userNavigation();
    return (
        <div>
            <h1>Erreur 404, la page que vous avez demandé n'existe pas.</h1>
            <button aria-label="Retour à l'accueil" onClick={() => navigation('/')}>
                Retourner à l'accueil
            </button>
        </div>
    )
}