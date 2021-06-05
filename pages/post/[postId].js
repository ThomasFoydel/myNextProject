import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../../styles/Post.module.css';
const Post = () => {
  const router = useRouter();
  const [post, setPost] = useState(null);
  useEffect(() => {
    let subscribed = true;
    router.query.postId &&
      axios
        .get(`/api/post/${router.query.postId}`)
        .then(({ data }) => subscribed && setPost(data))
        .catch((err) => console.log(err));
    return () => (subscribed = false);
  }, [router.query.postId]);

  const submitComment = (comment) => {
    axios
      .post(`/api/comment/q?postId=${post._id}`, comment)
      .then(({ data }) => setPost(data))
      .catch((err) => console.log(err));
  };
  return post && <PostDisplay props={{ post, submitComment }} key={post._id} />;
};

const PostDisplay = ({ props: { post, submitComment } }) => {
  return (
    <div className='blogpost'>
      <h3>{post.title}</h3>
      <p>{post.author.name}</p>
      <time className='date'>
        <span>{new Date(post.createdAt).toLocaleDateString()}, </span>
        <span>{new Date(post.createdAt).toLocaleTimeString()}</span>
      </time>
      <p className='content'>{post.content}</p>
      {post.comments.map((comment) => (
        <Comment props={{ comment }} key={comment._id} />
      ))}
      <CommentForm props={{ submitComment }} />
    </div>
  );
};

const CommentForm = ({ props: { submitComment } }) => {
  const [content, setContent] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content || content.length < 15 || content.length > 500) return;
    submitComment({ content });
    setContent('');
  };
  return (
    <form className={styles.commentForm} onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={({ target }) => setContent(target.value)}
      />
      <button type='submit'>submit</button>
    </form>
  );
};
const Comment = ({ props: { comment } }) => {
  return (
    <div className={styles.comment}>
      <p>{comment.content}</p>
      <p>{comment.author.name}</p>
      <time className='date'>
        <span>{new Date(comment.createdAt).toLocaleDateString()}, </span>
        <span>{new Date(comment.createdAt).toLocaleTimeString()}</span>
      </time>
    </div>
  );
};

export default Post;
