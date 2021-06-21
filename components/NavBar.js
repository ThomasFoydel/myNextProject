import styles from '../styles/NavBar.module.css';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/client';
import authContext from '../store/authContext';
import { useContext, useState } from 'react';

const NavBar = () => {
  const authCtx = useContext(authContext);
  const [session, loading] = useSession();
  const loggedIn = !loading && session;
  const loggedOut = !loading && !session;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenAuth = () => authCtx.setAuthOpen(true);

  return (
    <>
      <nav className={styles.navbar}>
        <Link href='/'>
          <img className={styles.logo} src='/logo.png' alt='logo' />
        </Link>

        {loggedIn && (
          <>
            <Link href={`/profile/${session.sub}`}>
              <a>Profile</a>
            </Link>
            <Link href={'/newpost'}>
              <a>New Post</a>
            </Link>
            <button className={styles.btn} onClick={signOut}>
              Logout
            </button>
          </>
        )}
        {loggedOut && (
          <button className={styles.btn} onClick={handleOpenAuth}>
            Login
          </button>
        )}
      </nav>
      <nav className={styles.navbarSmall}>
        <img className={styles.logo} src='/logo.png' alt='logo' />
        <img
          onClick={() => setDrawerOpen(true)}
          className={styles.hamburger}
          src='/images/hamburger.png'
          alt='open menu'
        />
      </nav>
      <div className={styles.navSpace} />
    </>
  );
};

export default NavBar;
