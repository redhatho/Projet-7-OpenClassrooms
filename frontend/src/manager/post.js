import axios from 'axios';
import { api } from '../utils/api';

const token = JSON.parse(localStorage.getItem('token'));

export function getAllPost(num) {
    return axios
        .get(api + '/api/posts/', {
            headers: { Authorization: 'Bearer ' + token.token }
        })
        .then((response) => {
            const array = response.data.slice(0, num);
            console.log('ALLPOST', response);
            return array;
        })
        .catch((error) => {
            console.log(error.message);
            return error;
        });
}

export function getPost(postId) {
    return axios
        .get(api + '/api/posts/' + postId, {
            headers: { Authorization: 'Bearer ' + token.token }
        })
        .then((response) => {
            console.log('ONE POST BY ID', response);
            return response.data;
        })
        .catch((error) => {
            console.log(error.message);
            return error;
        });
}

export function newPost(description, imagePost) {
    const data = new FormData();
    data.append('description', description);
    data.append('imagePost', imagePost);
    data.append('userId', token.userId);
    return axios
        .post(api + '/api/posts', data, {
            headers: {
                Authorization: 'Bearer ' + token.token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            console.log('CREATE NEWPOST', response);
            return response.data
        })
        .catch((error) => {
            console.log(error.message);
            return error;
        });
}

export function updatePost(postId, imagePost, description) {
    let data = new FormData();
    data.append('description', description);
    if (typeof images === 'object') {
        data.append('images', imagePost);
    }
    if (description || imagePost) {
        return axios
            .post(api + '/api/posts/' + postId, data, {
                headers: {
                    Authorization: 'Bearer ' + token.token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log('UPDATE POST', response);
                return response;
            })
            .catch((error) => {
                console.log(error.message);
                return error;
            });
    }
}

export function deletePost(postId) {
    return axios
        .delete(api + '/api/posts/' + postId, {
            headers: {
                Authorization: 'Bearer ' + token.token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            console.log(response);
            return response.data;
        })
        .catch((error) => {
            console.log(error.message);
            return error;
        });
}

export function postLikes(postId, likes) {
    let dataLikes = {
        likes: likes,
        userId: token.userId
    };
    return axios
        .post(api + '/api/posts' + postId, dataLikes, {
            headers: {
                Authorization: 'Bearer ' + token.token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => {
            console.log('POST LIKED', response);
            return response.data;
        })
        .catch((error) => {
            console.log('POST LIKED ERROR', error.message);
            return error;
        });
}

export function allLikes() {
    return axios
        .get(api + '/api/posts', {
            headers: {
                Authorization: 'Bearer ' + token.token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => {
            console.log('ALL LIKE', response);
            return response.data;
        })
        .catch((error) => {
            console.log('ALL LIKE ERROR', error.message);
            return error;
        })
}