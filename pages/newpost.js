import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/client';
import axios from 'axios';

const NewPost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post('/api/post/new', { title, content })
      .then((result) => console.log(result))
      .catch((err) => console.log({ err }));
  };
  useEffect(() => {
    getSession().then((session) => {
      setIsLoading(false);
      if (!session) {
        window.location.href = '/';
      }
    });
  }, []);

  if (isLoading) return <p>loading!</p>;

  return (
    <div>
      <h2>new post</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          type='text'
          onChange={({ target: { value } }) => setTitle(value)}
        />
        <textarea
          value={content}
          style={{ resize: 'none' }}
          onChange={({ target: { value } }) => setContent(value)}
        />
        <button type='submit'>submit</button>
      </form>
    </div>
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
