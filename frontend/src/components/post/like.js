import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { api } from '../../utils/api';
import { BiLike } from 'react-icons/bi';

function Like(props) {
    const [likes, setLikes] = useState(0);
    const [likedAction, setLikedAction] = useState(false);
    const token = JSON.parse(localStorage.getItem('token'));
    const userId = JSON.parse(localStorage.getItem('token')).userId;

    const getLikes = async () => {
        const { data } = await axios.get(
            api + '/api/post/like',
            { postPostId: props.postPostId },
            {
                headers: {
                    Authorization: 'Bearer ' + token.token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        );
        setLikes(data.likes.length);
        data.likes.map((like) => {
            if (like.userId === userId && like.postPostId === props.postPostId) {
                setLikedAction(true);
            }
        });
    };

    useEffect(() => {
        getLikes();
    }, []);

    const likePost = (postId) => {
        axios
            .post(
                api + '/api/post/' + postId,
                { postPostId: props.postPostId },
                {
                    headers: {
                        Authorization: 'Bearer ' + token.token,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
            .then((res) => {
                if (res.data.message === 'like supprimé du post') {
                    setLikedAction(false);
                } else if (res.data.message === 'like ajouté au post') {
                    setLikedAction(true);
                }
                getLikes();
            });
    };

    return (
        <>
            <div className="like-content">
                <button
                    aria-label="like ou supprime un like "
                    className="post-like"
                    onClick={() => {
                        likePost();
                    }}
                >
                    {likedAction ? (
                        <div className="icon-like">
                            <BiLike className="icon-like-liked " />
                        </div>
                    ) : (
                        <div className="icon-like">
                            <BiLike className="icon-like-nolike" />
                        </div>
                    )}
                </button>
            </div>
        </>
    );
}

export default Like;
