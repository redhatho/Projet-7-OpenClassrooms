import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../components/navBar";
import CardPost from '../components/post/cardPost'
import Newpost from '../components/post/newPost';
import { getAllPost } from '../Manager/postManager';

export default function Actus() {
    const dispatch = useDispatch();
    const { postArray } = useSelector((state) => ({
        ...state.postReducer,
    }));

    useEffect(() => {
        async function allPosts() {
            const result = await getAllPost();
            if (!result) {
                console.log('erreur');
            } else {
                dispatch({
                    type: 'GET_POST',
                    payload: result,
                });
            }
        }
        allPosts();
    }, []);

    return (
        <>
            <NavBar />
            <div className="feed">
                <Newpost />
                <div className="feed-box">
                    {postArray.length > 0 ? (
                        <section id="publications" className="feed-content">
                            {postArray.map((item) => (
                                <CardPost
                                    key={'id' + item.postId}
                                    id={item.postId}
                                    createdAt={item.createdAt}
                                    updatedAt={item.updatedAt}
                                    userId={item.userId}
                                    firstname={item['user.firstName']}
                                    lastname={item['user.lastName']}
                                    imagePost={item.imagePost}
                                    description={item.description}
                                    likes={item.likes}
                                />
                            ))}
                        </section>
                    ) : (
                        <section className="no-feed" id="publications">
                            <p className="empty">Aucune publication</p>
                        </section>
                    )}
                </div>
            </div>
        </>
    );
}