import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const FourOhFour = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 4500);
  }, []);
  return (
    <div className='fourohfour'>
      <h2>OH NO!</h2>
      <h3>Page not found!</h3>
      <p>
        head back to the{' '}
        <Link href='/'>
          <a>home page</a>
        </Link>
      </p>
    </div>
  );
};

export default FourOhFour;
