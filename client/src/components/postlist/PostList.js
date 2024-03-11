import React, { useState, useEffect } from 'react';
import PostListItem from '../postListItem/PostListItem';

const PostList = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if(props.posts) {
      setPosts(props.posts);
    }
  }, []);

  useEffect(() => {
    setPosts(props.posts);
  }, [props.posts])

  return (
    <div id="posts">
      {posts.map((post, index) => (
        <PostListItem
          key={post.id}
          post={post}
          index={index}
          handlePostDelete={props.handlePostDelete}
          handlePostUpdate={props.handlePostUpdate}
         />
      ))}
    </div>
  );
};

export default PostList;