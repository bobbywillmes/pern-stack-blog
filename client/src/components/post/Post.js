import React from 'react';
import './post.scss';

const Post = ({ post }) => {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <small>Author: {post.author}</small>
      <hr />
    </div>
  );
};

export default Post;