import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import styles from '../../styles/Profile.module.css';
import Link from 'next/link';
import { animated, useTransition, config } from 'react-spring';

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
  const [following, setFollowing] = useState(true);
  const [ownProfile, setOwnProfile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      axios
        .get(`/api/profile/${router.query.id}`)
        .then(({ data: { user, posts, following } }) => {
          setUser(user);
          setFollowing(following);
          setPosts(posts);
        })
        .catch((err) => console.log(err));
    }

    if (session && router.query.id === session.sub) {
      setOwnProfile(true);
    }
  }, [router.query.id, session]);

  const handleFollow = () =>
    user._id &&
    axios
      .post(`/api/follow/${user._id}`)
      .then(({ data }) => console.log(data))
      .catch((err) => console.log(err));

  const transition1 = useTransition([user, ...posts], (item) => item._id, {
    from: { opacity: '0', transform: 'translateY(-100px)' },
    enter: { opacity: '1', transform: 'translateY(0px)' },
    config: config.smooth,
  });

  return (
    <div className={styles.profile}>
      {transition1.map(({ item, props, key }, i) => {
        if (i === 0) {
          return (
            <animated.div style={props} key={key}>
              <h2>{user.name}</h2>
              {user.profilePic && (
                <div className={styles.imgContainer}>
                  <img
                    className={styles.profilePic}
                    src={user.profilePic}
                    alt={`${user.name}'s profile`}
                  />
                  <div className={styles.shade} />
                </div>
              )}
              <div className={styles.links}>
                {user.github && (
                  <a href={`https://github.com/${user.github}`} target='_blank'>
                    github
                  </a>
                )}
                {ownProfile && (
                  <Link href='/editprofile'>
                    <a>edit profile</a>
                  </Link>
                )}
                {!following && <button onClick={handleFollow}>follow</button>}
              </div>
            </animated.div>
          );
        } else {
          return (
            <animated.div style={props} key={key}>
              <BlogPost props={{ post: item }} />
            </animated.div>
          );
        }
      })}
    </div>
  );
}
