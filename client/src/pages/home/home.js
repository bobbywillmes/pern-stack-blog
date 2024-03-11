import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewPost from "../../components/newPost/NewPost";
import PostList from "../../components/postlist/PostList";
import './home.scss';

const Home = (props) => {
  const [showNewPost, setShowNewPost] = useState(false);

  const showHideNewPost = (e) => {
    setShowNewPost(!showNewPost)
  }

  const showToastAlert = (alertText) => {
    toast(alertText, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  }

  return (
      <div className="App">
        <ToastContainer />
          <p className="message">{props.message}</p>
          <div className="container">
            <button className="btn btn-primary" onClick={showHideNewPost}>Create Post</button>
            {showNewPost ? 
              <NewPost
                submitPost={props.submitPost}
                showHideNewPost={showHideNewPost}
                showToastAlert={showToastAlert}
                loremBlogs={props.loremBlogs}
              />
              : <div></div>  }
            <h1>Blog</h1>
            <PostList
              posts={props.posts}
              handlePostDelete={props.handlePostDelete}
              handlePostUpdate={props.handlePostUpdate}
            />
          </div>
      </div>
  );
}

export default Home