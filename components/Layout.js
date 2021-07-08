import NavBar from './NavBar';
import Footer from './Footer';
import Auth from './auth/Auth';

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
      <Auth />
      <Footer />
    </>
  );
};

export default Layout;
