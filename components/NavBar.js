import styles from '../styles/NavBar.module.css';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/client';
import authContext from '../store/authContext';
import { useContext } from 'react';

const NavBar = () => {
  const authCtx = useContext(authContext);
  const [session, loading] = useSession();
  const loggedIn = !loading && session;
  const loggedOut = !loading && !session;
  const handleOpenAuth = () => {
    authCtx.setAuthOpen(true);
  };
  return (
    <nav className={styles.navbar}>
      <img className={styles.logo} src='/logo.png' alt='logo' />

      <Link href='/'>
        <a>Blog</a>
      </Link>

      <Link href='/about'>
        <a>About</a>
      </Link>

      <Link href='/contact'>
        <a>Contact</a>
      </Link>

      {loggedOut && <button onClick={handleOpenAuth}>login</button>}
      {loggedIn && <button onClick={signOut}>logout</button>}
    </nav>
  );
};

export default NavBar;
