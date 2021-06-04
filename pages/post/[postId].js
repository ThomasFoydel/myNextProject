import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../../styles/Post.module.css';
const Post = () => {
  const router = useRouter();
  const [post, setPost] = useState(null);
  useEffect(() => {
    router.query.postId &&
      axios
        .get(`/api/post/${router.query.postId}`)
        .then(({ data }) => setPost(data))
        .catch((err) => console.log(err));
  }, [router.query.postId]);
  const submitComment = (comment) => {
    axios
      .post(`/api/comment?postid=${post._id}`, comment)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {post && <PostDisplay props={{ post, submitComment }} key={post._id} />}
    </div>
  );
};

const PostDisplay = ({ props: { post, submitComment } }) => {
  return (
    <div className='blogpost'>
      <h3>{post.title}</h3>
      <p className='date'>
        <span>{new Date(post.createdAt).toLocaleDateString()}, </span>
        <span>{new Date(post.createdAt).toLocaleTimeString()}</span>
      </p>
      <p className='content'>{post.content}</p>
      <CommentForm props={{ submitComment }} />
    </div>
  );
};

const CommentForm = ({ props: { submitComment } }) => {
  const [content, setContent] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    submitComment({ content });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input onChange={({ target }) => setContent(target.value)} />
      <button type='submit'>submit</button>
    </form>
  );
};

export default Post;
