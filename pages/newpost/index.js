import { useState, useEffect } from 'react';
import { useSession, getSession } from 'next-auth/client';
import axios from 'axios';
import styles from '../../styles/NewPost.module.css';
import { useSpring, animated, config } from 'react-spring';

const NewPost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');
  const [session] = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post('/api/post/new', { title, content, imageUrl })
      .then(
        () => session?.sub && (window.location.href = `/profile/${session.sub}`)
      )
      .catch((err) => console.log({ err }));
  };
  useEffect(() => {
    getSession().then((foundSession) => {
      setIsLoading(false);
      if (!foundSession) window.location.href = '/';
    });
  }, []);

  const animation = useSpring({
    from: { opacity: 0, transform: 'translateY(-100%) translateX(-50%)' },
    to: { opacity: 1, transform: 'translateY(0%) translateX(-50%)' },
    config: config.smooth
  })

  if (isLoading) return <p>loading!</p>;

  return (
    <animated.div style={animation} className={styles.newPost}>
      <h2>new post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Title</label>
        <input
          id='title'
          placeholder='title'
          value={title}
          type='text'
          onChange={({ target: { value } }) => setTitle(value)}
        />
        <label htmlFor='content'>Content</label>
        <textarea
          id='content'
          placeholder='content'
          value={content}
          style={{ resize: 'none' }}
          onChange={({ target: { value } }) => setContent(value)}
        />
        <label htmlFor='imageUrl'>Image URL</label>
        <input
          id='imageUrl'
          placeholder='image url'
          value={imageUrl}
          type='text'
          onChange={({ target: { value } }) => setImageUrl(value)}
        />
        <input
          id='tags'
          placeholder='tags'
          value={tags}
          type='text'
          onChange={({ target: { value } }) => setTags(value)}
        />
        <button type='submit'>submit</button>
      </form>
    </animated.div>
  );
};

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

export default NewPost;
