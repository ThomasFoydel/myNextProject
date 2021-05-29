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

  const handleOpenAuth = () => authCtx.setAuthOpen(true);

  return (
    <>
      <nav className={styles.navbar}>
        <img className={styles.logo} src='/logo.png' alt='logo' />

        <Link href='/'>
          <a>Blog</a>
        </Link>

        {loggedIn && (
          <>
            <Link href={`/profile/${session.sub}`}>
              <a>Profile</a>
            </Link>
            <button className={styles.btn} onClick={signOut}>
              logout
            </button>
          </>
        )}
        {loggedOut && (
          <button className={styles.btn} onClick={handleOpenAuth}>
            login
          </button>
        )}
      </nav>
      <div className={styles.navSpace} />
    </>
  );
};

export default NavBar;
