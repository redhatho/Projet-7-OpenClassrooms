import React from 'react';
import footerLogo from '../Assets/icon-left-font-monochrome-white.png';

export default function Footer() {
    return (
        <footer className='footer'>
            <img className='footer-logo'
                src={footerLogo}
                alt='logo Groupomania'
                style={{ height: 300, width: 300 }}
                height='300'
                width='300'
            />
        </footer>
    )
}
