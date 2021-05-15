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
    <div>
      <p>{post.title}</p>
      <p>{post.content}</p>
    </div>
  );
};

export default Post;
