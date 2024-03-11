import axios from 'axios';

export function getPosts() {
    return axios({
        method: 'GET',
        url: 'http://localhost:5000/api/posts',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json'
        }
    })
}

export function getPost(id) {
    return axios({
        method: 'GET',
        url: `http://localhost:5000/api/posts/${id}`,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json'
        }
    })
}

export function newPost(post) {
    return axios({
        method: 'POST',
        url: 'http://localhost:5000/api/posts',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json'
        },
        data: post
    })
}

export function updatePost(id, post) {
    return axios({
        method: 'PUT',
        url: `http://localhost:5000/api/posts/${id}`,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json'
        },
        data: post
    })
}

export function deletePost(id) {
    return axios({
        method: 'DELETE',
        url: `http://localhost:5000/api/posts/${id}`,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json'
        }
    })
}

export function getFaker() {
    return axios({
        method: 'GET',
        url: 'http://localhost:5000/api/faker',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json'
        }
    })
}