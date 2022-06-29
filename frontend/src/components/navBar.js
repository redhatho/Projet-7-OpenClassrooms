import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logout from './log/Logout';
import axios from 'axios';
import { api } from '../utils/api';

export default function Nav() {
    const [userData, setUserData] = useState('nav');
    const accessToken = JSON.parse(localStorage.getItem('token')).token;
    const id = JSON.parse(localStorage.getItem('token')).userId;

    useEffect(() => {
        const dataAxios = async () => {
            const res = await axios.get(api + 'api/auth/' + id, {
                headers: {
                    authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            setUserData({
                email: res.data.email,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
            });
        };
        dataAxios();
    }, [id, accessToken]);

    return (
        <nav>
            <div className="nav-box">
                {id ? (
                    <div className="nav-box-greeting">
                        <h1>Bonjour {userData.firstName}</h1>
                    </div>
                ) : (
                    <div></div>
                )}
                <div className="nav-item">
                    <NavLink className="nav-link" to="/">
                        Actus
                    </NavLink>
                    <Logout />
                </div>
            </div>
        </nav>
    );
}