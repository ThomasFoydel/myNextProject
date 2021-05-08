import NavBar from './NavBar';
import Footer from './Footer';
const Layout = ({ children }) => {
  return (
    <>
      <title>My Next Project</title>
      <NavBar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
