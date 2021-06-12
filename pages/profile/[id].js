import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import styles from '../../styles/Profile.module.css';
import Link from 'next/link';

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

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const [session] = useSession();
  const [user, setUser] = useState({});
  const [ownProfile, setOwnProfile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      axios
        .get(`/api/profile/${router.query.id}`)
        .then(({ data: { user, posts } }) => {
          setUser(user);
          setPosts(posts);
        })
        .catch((err) => console.log(err));
    }

    if (session && router.query.id === session.sub) {
      setOwnProfile(true);
    }
  }, [router.query.id, session]);

  return (
    <div className={styles.profile}>
      <h2>{user.name}</h2>
      {ownProfile && <Link href='/editprofile'>edit profile</Link>}
      {posts.map((post) => (
        <BlogPost props={{ post }} key={post._id} />
      ))}
    </div>
  );
}
