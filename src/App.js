import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Posts from './Posts';

import 'bootstrap/dist/css/bootstrap.css';
import Pagination from './Pagination';



function App()
{

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(5)

  useEffect(() =>
  {
    const fetchPosts = async () =>
    {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
      setPosts(res.data);
      setLoading(false)
    }

    fetchPosts();
  }, [])


  //get current post
  const lastPostInd = currentPage * postsPerPage;
  const firstPostInd = lastPostInd - postsPerPage;
  const currenPosts = posts.slice(firstPostInd, lastPostInd)

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)


  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">Hey There</h1>
      <Posts posts={currenPosts} loading={loading} />
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
    </div>
  );



}

export default App;
