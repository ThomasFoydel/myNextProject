import NavBar from './NavBar';
import Footer from './Footer';
import Auth from './auth/Auth';

const Layout = ({ children }) => {
  return (
    <>
    <head>
      <link
        rel="preload"
        href="/fonts/OpenDyslexic/OpenDyslexic-Regular.otf"
        as="font"
        crossOrigin=""
      />
      <link
        rel="preload"
        href="/fonts/OpenDyslexic/OpenDyslexic-Bold.otf"
        as="font"
        crossOrigin=""
      />

      <meta charset="UTF-8"/>
      <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    
      <title>My Next Project</title>

    </head>
    <body>
      <NavBar />
      {children}
      <Auth />
      <Footer />
    </body>
    </>
  );
};

export default Layout;
