import React from 'react';
import footerLogo from '../Assets/icon-left-font.png';

export default function Footer() {
    return (
        <footer className='footer'>
            <img className='footer-logo'
                src={footerLogo}
                alt='logo Groupomania'
                style={{ height: 150, width: 150 }}
                height='150'
                width='150'
            />
        </footer>
    )
}
