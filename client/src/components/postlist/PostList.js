import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../post/Post';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios({
        method: 'get',
        url: 'http://localhost:5000/posts',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json'
        }
    })
      .then(response => {
        console.log(response);
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <div>
        <h2>PostList</h2>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;