import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { api } from '../../Utils/api';
import { deletePost } from '../../Manager/postManager';
import Like from './like';

import {
    FaRegTrashAlt,
    FaPencilAlt,
} from 'react-icons/fa';

import { Link } from 'react-router-dom';

//permet de mettre la date sur post et commentaires en FR
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

export default function Cardpost(props) {
    const dispatch = useDispatch();
    const [post, setPost] = useState({
        postId: props.id,
        description: props.description,
        imagePost: props.imagePost,
    });

    const { postArray, userInfo } = useSelector((state) => ({
        ...state.postReducer,
        ...state.userReducer,
    }));

    const token = JSON.parse(localStorage.getItem('token'));
    const id = JSON.parse(localStorage.getItem('token')).userId;
    useEffect(() => {
        axios
            .get(api + '/api/posts/', {
                headers: { Authorization: `Bearer ${token.token}` },
            })
            .then((response) => {
                setPost(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [token.token]);

    const handleDeletePost = (postId) => {
        async function awaitDeletePost() {
            const result = await deletePost(postId);
            if (!result) {
                console.log('erreur DELETE POST');
            } else {
                dispatch({
                    type: 'DELETE_POST',
                    payload: postId,
                });
                console.log(postId + ' delete');
            }
        }
        awaitDeletePost();
        window.location.reload();
    };

    return (
        <ul className="container-cards ">
            <li className="container-cards card" id={props.id}>
                <article className="card-container">
                    <div className="profil-post ">
                        <p className=" firstname-post "> {props.firstname}</p>
                        <p className=" lastname-post"> {props.lastname}</p>
                    </div>
                    <div className="header-post">
                        <p className="date-post">{moment(props.createdAt).format('LLL')}</p>
                        <h3 className="description-post">{props.description}</h3>
                    </div>
                    <div className="post-content">
                        {props.imagePost ? (
                            <img className="img-post" alt="illustration" src={props.imagePost} ></img>
                        ) : null}
                    </div>

                    <div className="utils-post"></div>
                    <div className="button-content">
                        {token.userId === props.userId || token.admin ? (
                            <div className="post-button-content">
                                <Link
                                    className="button-post"
                                    aria-label="lien vers le post"
                                    to={`/post/${props.id}`}
                                >
                                    <FaPencilAlt className="post-button-icon-pencil" />
                                </Link>
                                <button
                                    type="button"
                                    className="button-post"
                                    aria-label="Suppression du post"
                                    onClick={(e) => e.preventDefault(handleDeletePost(props.id))}
                                >
                                    <FaRegTrashAlt className="post-button-icon-trash" />
                                </button>
                            </div>
                        ) : null}
                    </div>
                    <div className="post-like_com">
                        <Like userId={props.userId} postPostId={props.id} />
                    </div>
                </article>
            </li>
        </ul>
    );
}