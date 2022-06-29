import React from "react";
import { Routes, Route } from 'react-router-dom';
import Actus from '../layout/Actus';
import NotFound from '../layout/NotFound';
import HomePage from '../layout/Homepage';
import Post from '../components/post/Post';
import Auth from '../utils/Auth';

export default function Router() {
    return (
        <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route element={<Auth />}>
                <Route path="/" element={<Actus />} />
                <Route path="/post/:postId" element={<Post />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}