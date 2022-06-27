
import React from 'react';
import logo from '../Assets/icon-left-font.png';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="homagepage">
            <div className="hompage-content">
                <div className="homepage-link">
                    <p className="homepage-text">
                        Inscrivez-vous et connectez-vous pour accéder
                        aux actualités du réseau social Groupomania !
                    </p>
                    <button className="homepage-link-content">
                        <Link to="/">Inscription et connexion</Link>{' '}
                    </button>
                    <img src={logo} className="homepage-logo" alt="logo groupomania" />
                </div>
            </div>
        </div>
    );
};

export default HomePage;