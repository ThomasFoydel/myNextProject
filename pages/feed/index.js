import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/Blog.module.css';
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

export default function Feed() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [showNextBtn, setShowNextBtn] = useState(true);
  const fetchPosts = (inc) => {
    axios
      .get('/api/feed', { skip: offset + inc })
      .then(({ data }) => {
          console.log("DATA: ", data)
        if (inc === -1) setShowNextBtn(true);
        if (inc === 1 && data[0]._id === blogPosts[0]._id) {
          setShowNextBtn(false);
        } else {
          setBlogPosts(data);
        }
          setOffset((o) => o + inc);
      })
      .catch((err) => console.log(err));
  };

  useEffect(()=> {
    fetchPosts(0)
  }, [])

  const animation = useTransition(blogPosts, (item) => item._id, {
    from: { opacity: '0', transform: 'translateY(-100px)' },
    enter: { opacity: '1', transform: 'translateY(0px)' },
    trail: 520,
    config: config.wobbly,
  });

  return (
    <div className={styles.blog}>
      <h2>Feed</h2>
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
