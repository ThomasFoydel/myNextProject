import { useState } from 'react';
import Post from '../models/Post';
import User from '../models/User';
import mongoose from 'mongoose';
import axios from 'axios';
import styles from '../styles/Blog.module.css';
import Link from 'next/link';
import { useTransition, animated, config } from 'react-spring';

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

export default function Home({ posts }) {
  const [blogPosts, setBlogPosts] = useState(posts);
  const [offset, setOffset] = useState(0);
  const [showNextBtn, setShowNextBtn] = useState(true);
  const fetchPosts = (inc) => {
    setOffset((o) => o + inc);
    axios
      .get('/api/blog', { skip: offset + inc })
      .then(({ data }) => {
        if (inc === -1) setShowNextBtn(true);
        if (inc === 1 && data[0]._id === blogPosts[0]._id) {
          setShowNextBtn(false);
        } else {
          setBlogPosts(data);
        }
      })
      .catch((err) => console.log(err));
  };

  const animation = useTransition(posts, (item) => item._id, {
    from: { opacity: '0', transform: 'translateY(-100px)' },
    enter: { opacity: '1', transform: 'translateY(0px)' },
    trail: 520,
    config: config.wobbly,
  });

  return (
    <div className={styles.blog}>
      <h2>Blog</h2>
      {animation.map(({ item, props, key }) => {
        return (
          <animated.div style={props} key={key}>
            <BlogPost props={{ post: item }} />
          </animated.div>
        );
      })}

      <button
        className={`${styles.btn} ${offset <= 0 && styles.btnInactive}`}
        onClick={() => offset > 0 && fetchPosts(-1)}
      >
        prev
      </button>
      <button
        className={`${styles.btn} ${!showNextBtn && styles.btnInactive}`}
        onClick={() => showNextBtn && fetchPosts(1)}
      >
        next
      </button>
    </div>
  );
}

export async function getStaticProps() {
  return mongoose
    .connect(process.env.mongodburl)
    .then(async () => {
      try {
        const thomas = await User.findOne({ email: 'thomasjfoydel@gmail.com' });

        const posts = await Post.find({ author: thomas._id })
          .select('-comments')
          .lean()
          .sort({ createdAt: 'desc' })
          .limit(15);

        const stringIdPosts = posts.map(
          ({ _id, author, createdAt, updatedAt, ...post }) => ({
            ...post,
            _id: _id.toString(),
            author: author.toString(),
            createdAt: createdAt.toString(),
            updatedAt: updatedAt.toString(),
          })
        );

        return {
          props: { posts: stringIdPosts },
          revalidate: 21600,
        };
      } catch (err) {
        return { props: { posts: [] }, revalidate: 21600 };
      }
    })
    .catch((err) => ({ props: { posts: [] }, revalidate: 21600 }));
}
