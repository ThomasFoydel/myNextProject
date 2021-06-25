import styles from '../styles/NavBar.module.css';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/client';
import authContext from '../store/authContext';
import { useContext, useState } from 'react';
import { useSpring, animated, config } from 'react-spring';

const NavBar = () => {
  const authCtx = useContext(authContext);
  const [session, loading] = useSession();
  const loggedIn = !loading && session;
  const loggedOut = !loading && !session;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const close = () => setDrawerOpen(false);
  const handleOpenAuth = () => {
    authCtx.setAuthOpen(true);
    close();
  };

  const links = (
    <>
      {loggedIn && (
        <>
          <Link href={`/profile/${session.sub}`}>
            <a onClick={close}>Profile</a>
          </Link>
          <Link href={'/newpost'}>
            <a onClick={close}>New Post</a>
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
    </>
  );

  return (
    <>
      <nav className={styles.navbar}>
        <Link href='/' onClick={close}>
          <img className={styles.logo} src='/logo.png' alt='logo' />
        </Link>

        {links}
      </nav>
      <nav className={styles.navbarSmall}>
        <Link href='/' onClick={close}>
          <img className={styles.logo} src='/logo.png' alt='logo' />
        </Link>
        <button
          className={styles.hamburgerBtn}
          onClick={() => setDrawerOpen((o) => !o)}
        >
          <img
            className={styles.hamburger}
            src='/images/hamburger.png'
            alt='open menu'
          />
        </button>
      </nav>
      <div className={styles.navSpace} />
      <Drawer props={{ open: drawerOpen, links }} />
    </>
  );
};

const Drawer = ({ props: { open, links, close } }) => {
  const animation = useSpring({
    transform: open ? 'translateY(0px)' : 'translateY(-100%)',
    opacity: open ? 1 : 0.5,
    config: config.smooth,
  });

  return (
    <animated.nav style={animation} className={styles.drawer} onClick={close}>
      {links}
    </animated.nav>
  );
};

export default NavBar;
