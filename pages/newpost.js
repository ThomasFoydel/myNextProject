import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/client';

const NewPost = () => {
  const [isLoading, setIsLoading] = useState(true);

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
      <input type='text' />
      <textarea style={{ resize: 'none' }} />
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
