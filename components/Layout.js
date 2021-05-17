import NavBar from './NavBar';
import Footer from './Footer';
import Auth from './auth/Auth';

const Layout = ({ children }) => {
  return (
    <>
      <title>My Next Project</title>
      <NavBar />
      {children}
      {true && <Auth />}
      <Footer />
    </>
  );
};

export default Layout;
