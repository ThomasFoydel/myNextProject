import styles from '../styles/NavBar.module.css';
const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <h1>My Next Project</h1>
      </div>
      <a>Blog</a>
      <a>About</a>
      <a>Contact</a>
    </nav>
  );
};

export default NavBar;
