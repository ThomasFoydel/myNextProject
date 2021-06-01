import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

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
  return <div>{post && <PostDisplay props={{ post }} key={post._id} />}</div>;
};

const PostDisplay = ({ props: { post } }) => {
  return (
    <div className='blogpost'>
      <h3>{post.title}</h3>
      <p className='date'>
        <span>{new Date(post.createdAt).toLocaleDateString()}, </span>
        <span>{new Date(post.createdAt).toLocaleTimeString()}</span>
      </p>
      <p className='content'>{post.content}</p>
    </div>
  );
};

export default Post;
