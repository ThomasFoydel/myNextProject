import '../styles/globals.css';
import Layout from '../components/Layout';
import { AuthContextProvider } from '../store/authContext';
import { Provider } from 'next-auth/client';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel='preload'
          href='/fonts/OpenDyslexic/OpenDyslexic-Regular.otf'
          as='font'
          crossOrigin=''
        />
        <link
          rel='preload'
          href='/fonts/OpenDyslexic/OpenDyslexic-Bold.otf'
          as='font'
          crossOrigin=''
        />
        <title>My Next Project</title>
      </Head>
      <Provider session={pageProps.session}>
        <AuthContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthContextProvider>
      </Provider>
    </>
  );
}

export default MyApp;
