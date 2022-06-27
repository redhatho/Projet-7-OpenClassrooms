import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BiUpload } from 'react-icons/bi';

import { getPost } from '../../Manager/postManager';
import { api } from '../../Utils/api';
import axios from 'axios';
import NavBar from '../navBar';

export default function Post(props) {
    const params = useParams(props);
    const postId = params.postId;
    const token = JSON.parse(localStorage.getItem('token'));

    const [currentPost, setCurrentPost] = useState({
        postId: null,
        imagePost: '',
        description: '',
    });

    const [post, setPost] = useState({
        postId: props.postId,
        imagePost: props.imagePost,
        description: props.description,
    });
    useEffect(() => {
        getPost(postId)
            .then((response) => {
                setCurrentPost(response);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [postId]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentPost({ ...currentPost, [name]: value });
    };

    const updateCurrentPost = () => {
        const data = {
            postId: currentPost.postId,
            description: currentPost.description,
            imagePost: currentPost.imagePost,
        };

        axios
            .put(api + '/api/posts/' + postId, data, {
                headers: {
                    Authorization: 'Bearer ' + token.token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(() => {
                setCurrentPost({ ...currentPost });
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const [imagePost, setImagePost] = useState(null);

    const updateImagePost = () => {
        const formData = new FormData();
        formData.append('images', imagePost);
        axios
            .put(api + '/api/posts/' + postId, formData, {
                headers: {
                    Authorization: 'Bearer ' + token.token,
                    'Content-Type': 'application/json'
                },
            })
            .then(() => {
                setImagePost();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <NavBar />
            {currentPost ? (
                <div className="content-edit">
                    <form className="form-edit" onSubmit={updateCurrentPost}>
                        <div className="post-edit-content">
                            <label className="post-edit-label" htmlFor='description'>
                                Votre post :
                            </label>
                            <input
                                type="text"
                                className="form-post-description"
                                id="description"
                                name="description"
                                placeholder="Ecrivez un nouveau titre ici"
                                value={currentPost.description}
                                onChange={handleInputChange}
                                aria-label="Ecrivez un nouveau titre ici"
                            />
                        </div>
                        <button className="input-button" type="submit" aria-label="modifier le titre du post">
                            valider
                        </button>
                    </form>
                    <div className="post-content">
                        {currentPost.imagePost ? (
                            <img className="image-post" alt="post" src={currentPost.imagePost}></img>
                        ) : null}
                    </div>

                    <form className="form-edit" onSubmit={updateImagePost}>
                        <label className="label-file" htmlFor="file">
                            <BiUpload className="icon-post" />
                            Veuillez trouver une autre image
                        </label>
                        <input
                            className="input-file"
                            type="file"
                            id="file"
                            name="image"
                            accept=".png, .jpg, .jpeg, .gif"
                            onChange={(e) => setImagePost(e.target.file[0])}
                        ></input>
                        <button className="input-button" type="submit" aria-label="envoyer une nouvelle image">
                            Valider
                        </button>
                    </form>
                </div>
            ) : (
                <div></div>
            )}
            <div className="back">
                <Link className="button-post-link" aria-label="retour au fil d'actualités" to={`/`}>
                    Retournez aux actus
                </Link>
            </div>
        </div>
    );
}
