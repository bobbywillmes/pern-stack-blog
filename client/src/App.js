import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import { getPosts, newPost, getFaker, deletePost, updatePost, getPost } from './api/posts';
import Home from './pages/home/home';
import Post from './pages/post/post';
import About from './pages/about/about';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">My Blog</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">Contact</a>
              </li>
            </ul>
            </div>
        </div>
    </nav>
  );
};

const Contact = () => {
  return (
    <div>
      <h2>Contact</h2>
    </div>
  )
}

function App() {
  const [message, setMessage]       = useState('');
  const [posts, setPosts]           = useState(null);
  const [people, setPeople]         = useState(null);
  const [dogs, setDogs]             = useState(null);
  const [colors, setColors]         = useState(null);
  const [hackerLog, setHackerLog]   = useState(null);
  const [loremBlogs, setLoremBlogs] = useState(null);

  useEffect(() => {
    getPosts()
      .then(res => {
        setPosts(res.data);
        })
    fetch('/api/message')
      .then(response => response.text())
      .then(data => setMessage(data));
    getFaker()
      .then(res => {
        console.log(res.data);
        if(res.status === 200) {
          setPeople(res.data.people);
          setDogs(res.data.dogs);
          setColors(res.data.colors);
          setHackerLog(res.data.hackerLog);
          setLoremBlogs(res.data.loremBlogs);
        }
      })
  }, []);

  if (!posts) {
      return <div>Loading...</div>
  }

  const updatePosts = (newPost) => {
      setPosts([newPost, ...posts])
  }

  const submitPost = (post) => {
    return new Promise((resolve, reject) => {
      newPost(post)
      .then(res => {
        if(res.status === 201) {
          updatePosts(res.data);
          resolve(res)
        }
        else {
          console.log(res);
        }
      })
      .catch(err => {
        reject(err);
      })
    })
  }

  const getPostByid = (id) => {
    return new Promise((resolve, reject) => {
      getPost(id)
        .then(res => {
          if(res.status === 200) {
              resolve(res)
          } else {
              reject(res)
          }
        })
        .catch(err => reject(err))
    })
  }

  const handlePostDelete = (id) => {
    return new Promise((resolve, reject) => {
      deletePost(id)
        .then(res => {
          if(res.status === 204) {
            let newPosts = posts.filter(post => {
              return post.id !== id
            })
            setPosts(newPosts);
            resolve(res);
          } else {
            console.log('something went wrong with deleting post', res);
            reject(res);
          }
        })
        .catch(err => {
          console.log(err);
          reject(err);
        })
    })
  }

  const handlePostUpdate = (id, data) => {
      return new Promise((resolve, reject) => {
          updatePost(id, data)
              .then(res => {
                  resolve(res);
              })
              .catch(err => {
                console.log('error with handlePostUpdate', err);
                reject(err);
              })
      })
  }

  return (
    <div className="app">
      <Header />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Home
            message={message}
            posts={posts}
            loremBlogs={loremBlogs}
            submitPost={submitPost}
            handlePostDelete={handlePostDelete} 
            handlePostUpdate={handlePostUpdate} 
          />}
        />
        <Route path = "/posts/:id" element={
          <Post
              getPostByid={getPostByid}
              />}
            />
        <Route path="/about" element={
          <About
            people={people}
            dogs={dogs}
            colors={colors}
            hackerLog={hackerLog}
          />}
        />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
