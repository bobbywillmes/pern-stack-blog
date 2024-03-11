import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getPost } from '../../api/posts';
import './post.scss';
import { formatDate } from '../../utils/utils';

const Post = (props) => {
  const { id } = useParams();
  let [title, setTitle] = useState('');
  let [content, setContent] = useState('');
  let [author, setAuthor] = useState('');
  let [created_at, setCreated_at] = useState('');

  useEffect(() => {
    getPost(id)
      .then(res => {
        if(res.status === 200) {
          setTitle(res.data.title);
          setContent(res.data.content);
          setAuthor(res.data.author);
          setCreated_at(res.data.created_at);
        } else {
          console.log('res.status not 200..', res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [id, props]);

  return (
    <div id="post" className="container">
      <h1>{title}</h1>
      <h6 id="id">#{id}</h6>
      <h6>by {author}</h6>
      <h6>{formatDate(created_at)}</h6>
      <hr />
      <p>{content}</p>
      {/* Display comments or other post details here */}
    </div>
  );
}

export default Post