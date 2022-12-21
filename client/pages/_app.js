import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/globals.css';
import '../styles/NavbarAndSideBar.css';
import { useEffect } from "react";


function MyApp({ Component, pageProps }) {

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return <Component {...pageProps} />
}

export default MyApp
