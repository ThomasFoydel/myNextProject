import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Post = () => {
  const router = useRouter();
  const [post, setPost] = useState(null);
  useEffect(() => {
    axios
      .get(`/api/post/${router.query.postId}`)
      .then(({ data }) => setPost(data))
      .catch((err) => console.log(err));
  }, []);
  return <div>post {router.query.postId}</div>;
};

export default Post;
