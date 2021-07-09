import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogPost = ({ props: { post } }) => (
  <div className='blogpost'>
    <Link href={`/post/${post._id}`}>
      <h3 className='title'>{post.title}</h3>
    </Link>
    <p className='date'>
      <span>{new Date(post.createdAt).toLocaleDateString()}, </span>
      <span>{new Date(post.createdAt).toLocaleTimeString()}</span>
    </p>
    <p className='content'>{post.content}</p>
  </div>
);

const index = () => {
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState('content');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    let subscribed = true;
    axios
      .get(`/api/search?type=${type}&data=${searchInput}`)
      .then(({ posts }) => setPosts(posts))
      .catch((err) => console.log(err));
    return () => (subscribed = false);
  }, [type, searchInput]);

  return (
    <div>
      <select value={type} onChange={({ target: { value } }) => setType(value)}>
        <option value='content'>content</option>
        <option value='author'>author</option>
        <option value='title'>title</option>
      </select>
      <input
        type='text'
        value={searchInput}
        onChange={({ target: { value } }) => setSearchInput(value)}
      />
      {posts.map((post) => (
        <BlogPost key={post._id} props={{ post }} />
      ))}
    </div>
  );
};

export default index;
