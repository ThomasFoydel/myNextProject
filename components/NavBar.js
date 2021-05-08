import styles from '../styles/NavBar.module.css';
import Link from 'next/link';
const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <h1>My Next Project</h1>
      </div>
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
