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
      .post(`/api/comment/q?postId=${post._id}`, comment)
      .then(({ data }) => setPost(data))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {post && <PostDisplay props={{ post, submitComment }} key={post._id} />}
    </div>
  );
};

const PostDisplay = ({ props: { post, submitComment } }) => {
  console.log(post);
  return (
    <div className='blogpost'>
      <h3>{post.title}</h3>
      <p>{post.author.name}</p>
      <p className='date'>
        <date>{new Date(post.createdAt).toLocaleDateString()}, </date>
        <time>{new Date(post.createdAt).toLocaleTimeString()}</time>
      </p>
      <p className='content'>{post.content}</p>
      <CommentForm props={{ submitComment }} />
      {post.comments.map((comment) => (
        <Comment props={{ comment }} key={comment._id} />
      ))}
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
const Comment = ({ props: { comment } }) => {
  return (
    <div className={styles.comment}>
      <p>{comment.content}</p>
      <p>{comment.author.name}</p>
      <p className='date'>
        <date>{new Date(comment.createdAt).toLocaleDateString()}, </date>
        <time>{new Date(comment.createdAt).toLocaleTimeString()}</time>
      </p>
    </div>
  );
};

export default Post;
