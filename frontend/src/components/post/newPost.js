import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { newPost } from '../../manager/postManager';
import { BiUpload } from 'react-icons/bi';
import { FaShare } from 'react-icons/fa';

export default function Newpost(props) {
    const dispatch = useDispatch();
    const [post, setPost] = useState({
        description: '',
        imagePost: '',
        userId: '',
    });

    const handleSubmit = () => {
        if (!post.description && !post.imagePost) {
            alert('Votre message est vide');
        } else {
            async function awaitPost() {
                const result = await newPost(
                    post.description,
                    post.imagePost,
                    post.userId,
                );
                if (!result) {
                    console.log('erreur');
                } else {
                    dispatch({
                        type: 'NEW_POST',
                        payload: post,
                    });
                    setPost({
                        description: '',
                        imagePost: null,
                    });
                }
            }
            window.location.reload(false);
            awaitPost();
        }
    };

    const handleInput = (e) => {
        if (e.target.id === 'publish-description') {
            setPost({
                ...post,
                imagePost: e.target.files[0],
            });
        }
    };

    return (
        <form className="edit-post" onSubmit={handleSubmit} key={props.postId}>
            <h2 className="title-post">Créer une publication</h2>

            <input
                value={post.description}
                onChange={handleInput}
                id="publish-description"
                aria-label="votre texte ici"></input>

            <br />
            <label className="label-file" htmlFor="file">
                <BiUpload className="icon-post" />
                Choisir une image
                <input className="input-file" id="file" accept="image/*" onChange={handleInput} aria-label="Choisissez une image poru votre post" />
            </label>

            <button className="publish-post" type="button" onClick={handleSubmit} aria-label="envoyer un post modifié">
                <FaShare className="edit-post-share-icon" />
            </button>
        </form>
    );
}