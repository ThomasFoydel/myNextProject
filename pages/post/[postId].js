import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../../styles/Post.module.css';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import Image from '../../components/Image';
import { animated, useSpring, config } from 'react-spring';

const Post = () => {
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [session] = useSession();

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
  const deleteComment = (id) =>
    id &&
    axios
      .delete(`/api/comment/${id}`)
      .then(({ data }) => setPost(data))
      .catch((err) => console.log(err));

  const deletePost = () =>
    post._id &&
    axios
      .delete(`/api/post/${post._id}`)
      .then(() => router.push(`/profile/${post.author?._id}`))
      .catch((err) => console.log(err));
  return (
    post && (
      <PostDisplay
        props={{ post, submitComment, deletePost, deleteComment, session }}
        key={post._id}
      />
    )
  );
};
const PostDisplay = ({
  props: { post, submitComment, deletePost, deleteComment, session },
}) => {
  const animation = useSpring({
    from: { opacity: 0, transform: 'translateY(-100px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: config.molasses,
  });
  return (
    <animated.div className='blogpost' style={animation}>
      <h3>{post.title}</h3>

      {session?.sub === post.author._id && (
        <button
          onClick={() => deletePost(post._id)}
          className={styles.deleteBtn}
        >
          X
        </button>
      )}
      <Link href={`/profile/${post.author._id}`}>
        <p className='author'>{post.author.name}</p>
      </Link>
      <time className='date'>
        <span>{new Date(post.createdAt).toLocaleDateString()}, </span>
        <span>{new Date(post.createdAt).toLocaleTimeString()}</span>
      </time>
      {post.imageUrl && (
        <Image
          src={post.imageUrl}
          alt='post picture'
          className='img'
          fallbackSrc={'/logo.png'}
        />
      )}
      <p className='content'>{post.content}</p>
      {post.comments.map((comment) => (
        <Comment
          props={{ comment, deleteComment, session }}
          key={comment._id}
        />
      ))}
      <CommentForm props={{ submitComment }} />
    </animated.div>
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
const Comment = ({ props: { comment, deleteComment, session } }) => {
  return (
    <div className={styles.comment}>
      {session && session.sub === comment.author._id && (
        <button
          onClick={() => deleteComment(comment._id)}
          className={styles.deleteBtn}
        >
          X
        </button>
      )}
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
