import '../styles/globals.css';
import Layout from '../components/Layout';
import { AuthContextProvider } from '../store/authContext';
import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </Provider>
  );
}

export default MyApp;
