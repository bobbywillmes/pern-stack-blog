import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './newPost.scss';

function SubmitPostBtn({ title, content, author, handleSubmit}) {
  const fields = [title, content, author];
  // if any fields are blank, disable the button
  if(fields.some(field => field === '')) {
    return (
      <button type="submit" className="btn btn-danger" disabled>Submit Post</button>
    )
  } else {
    return (
      <button type="submit" className="btn btn-danger" onClick={handleSubmit}>Submit Post</button>
    )
  }
}

function LoremBtn(props) {
  return (
    <button id="loremBtn" className="btn btn-info" onClick={props.fillLorem}>Lorem</button>
  )
}

function NewPost(props) {
  const [title, setTitle]     = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor]   = useState('');
  const [titleTouched, setTitleTouched]     = useState(false);
  const [contentTouched, setContentTouched] = useState(false);
  const [authorTouched, setAuthorTouched]   = useState(false);

  let postObj = {title, content, author}

  const resetForm = () => {
    setTitle('');
    setContent('');
    setAuthor('');
    setTitleTouched(false);
    setContentTouched(false);
    setAuthorTouched(false);
  }

  const handleSubmit = async (e) => {
    // submit the post, & if successful(res.status === 201), show the Toast alert
      e.preventDefault();
      props.submitPost(postObj)
        .then(res => {
          if(res.status === 201) {
            resetForm();
            props.showHideNewPost()
            props.showToastAlert('Post submitted :]');
          } else {
            console.log('submitPost !== 201', res)
          }
        })
        .catch(err => {
          console.log(err);
        })
    }

  const handleBlur = (e) => {
    // each form element has this onBlur, which initializes it & will then show as invalid if blank (by conditions in the element classNames below)
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

  const fillLorem = (e) => {
    e.preventDefault(); // prevent form submission
    // fill the form with random (lorem-ipsum) text, which is generated on the server
    let ranNum = Math.floor(Math.random() * props.loremBlogs.length);
    let post = props.loremBlogs[ranNum];
    setTitle(post.title);
    setContent(post.content);
    setAuthor(post.author);
  }

  return (
    <div id="newPost">
      <h2>Write a Post</h2>
      <p>Or hit the Lorem button to fill the form with random (lorem-ipsum) text.</p>
      <form className="container mt-5">

        {/* title field */}
        <label htmlFor="title" className="form-label">Title</label>
        <input
          type="text"
          className={`form-control ${titleTouched && !title ? 'invalid' : ''}`}
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlur}
          required
        />

        {/* content field */}
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
              className={`form-control ${contentTouched && !content ? 'invalid' : ''}`}
              id="content"
              rows="3"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onBlur={handleBlur}
              required
          ></textarea>
        </div>

        {/* author field */}
        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author</label>
          <input
            type="text"
            className={`form-control ${authorTouched && !author ? 'invalid' : '' }`}
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            onBlur={handleBlur}
            required
          />
        </div>

          <SubmitPostBtn title={title} content={content} author={author} handleSubmit={handleSubmit} />
          &nbsp;
          <LoremBtn fillLorem={fillLorem} />
          <br />
      </form>
    </div>
  );
};

export default NewPost;