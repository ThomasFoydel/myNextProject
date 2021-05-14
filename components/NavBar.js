import styles from '../styles/NavBar.module.css';
import Link from 'next/link';
const NavBar = () => {
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
    </nav>
  );
};

export default NavBar;
