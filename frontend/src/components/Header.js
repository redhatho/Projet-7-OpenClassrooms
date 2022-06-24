import React from 'react';
import imgFromAssets from '../../assets/icon-left-font-monochrome-black.png';

export default function Header() {
    return (
        <div className="header-box">
            <img className="logo" src={imgFromAssets} alt="logo Groupomania" />
        </div>
    );
}