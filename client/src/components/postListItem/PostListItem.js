import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './postListItem.scss';
import 'animate.css';
import { formatDate } from '../../utils/utils';

const DeleteBtn = (props) => {
  return (
    <button className="btn delete" onClick={props.handleDelete}>Delete Post</button>
  )
}

const EditBtn = (props) => {
  return (
    <button className="btn edit" onClick={props.handleUpdate}>Edit Post</button>
  )
}

const CancelEditBtn = (props) => {
  return (
    <button className="btn" onClick={props.handleCloseEdit}>Cancel</button>
  )
}

function SubmitEditBtn(props) {
  const fields = [props.title, props.content, props.author];
  // if any fields are blank, disable the button
  if(fields.some(field => field === '')) {
    return (
      <button className="btn btn-danger" disabled>Submit Edit</button>
    )
  } else {
    return (
      <button type="submit" className="btn btn-danger" onClick={props.handleSubmit}>Submit Edit</button>
    )
  }
}

const EditForm = (props) => {
  const [title, setTitle] = useState(props.post.title);
  const [content, setContent] = useState(props.post.content);
  const [author, setAuthor] = useState(props.post.author);
  const [titleTouched, setTitleTouched] = useState(false);
  const [contentTouched, setContentTouched] = useState(false);
  const [authorTouched, setAuthorTouched] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit()     <EditForm />')
    props.handlePostUpdate(props.post.id, {title, content, author})
      .then(res => {
        console.log(res);
        if(res.status === 200) {
          console.log('item updated');
          props.setUpdating(false);
          
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  const handleCloseEdit = (e) => {
    e.preventDefault();
    props.setUpdating(false);
  }

  const handleBlur = (e) => {
    let formEl = e.target.id;
    switch(formEl) {
      case 'title':
        setTitleTouched(true);
        break;
      case 'content':
        setContentTouched(true);
        break;
      case 'author':
        setAuthorTouched(true);
        break;
      default:
        break;
    }
  }

  return (
    <div className="editForm">
      <h2>{props.post.title}</h2>
      <h5>Edit Post</h5>
      <form className="container mt-5" >
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className={`form-control ${titleTouched && title.trim() === '' ? 'invalid' : '' }`}
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleBlur}
            required
          />
          <hr />
            <div className="mb-3">
            <label htmlFor="content" className="form-label">Content</label>
            <textarea
                className={`form-control ${contentTouched && content.trim() === '' ? 'invalid' : '' }`}
                id="content"
                rows="3"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onBlur={handleBlur}
                required
            ></textarea>
            </div>
            <div className="mb-3">
            <label htmlFor="author" className="form-label">Author</label>
            <ul>
              
            </ul>
            <input
                type="text"
                className={`form-control ${authorTouched && author.trim() === '' ? 'invalid' : '' }`}
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                onBlur={handleBlur}
                required
            />
            </div>
            <SubmitEditBtn title={title} content={content} author={author} handleSubmit={handleSubmit} />
            <br />
            <CancelEditBtn handleCloseEdit={handleCloseEdit} />
            <br />
        </form>
    </div>
  )
}


const PostListItem = ({ post, index, handlePostDelete, handlePostUpdate }) => {
  const [updating, setUpdating] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    handlePostDelete(post.id)
      .then(res => {
        if(res.status === 204) {
          toast('Post deleted :]', {
            position: 'top-center'
          })
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(`handleUpdate()     PostListItem`)
    console.log(post);
    setUpdating(!updating);
  }
  return (
    <div className={`post ${index < 4 ? 'animate__animated animate__fadeIn' : ''}`}>


      {updating ? (
        <div>
          <EditForm post={post} setUpdating={setUpdating} handlePostUpdate={handlePostUpdate} />
        </div>
      ): (
        <div>
          <div className="postWrap">
            <Link to={`/posts/${post.id}`}><h2>{post.title}</h2></Link>
            <p>{post.content}</p>
            <small>Author: {post.author}</small>
            <br />
            <small>Post.ID: {post.id}</small>
            <br />
            <small>{formatDate(post.created_at)}</small>
          </div>
          <div className="btnWrap">
            <DeleteBtn handleDelete={handleDelete} />
            <EditBtn handleUpdate={handleUpdate} />
          </div>
        </div>
      )}

      <br />
      <hr />
    </div>
  );
};

export default PostListItem;
