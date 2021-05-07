import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Next Project</title>
        <meta
          name='description'
          content='A simple blog app built with NextJS'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </div>
  );
}
