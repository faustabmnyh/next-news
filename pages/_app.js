import "../styles/globals.css";
import Toolbar from "../components/Toolbar";

function MyApp({ Component, pageProps }) {
  return (
    <content>
      <Toolbar />
      <Component {...pageProps} />
    </content>
  );
}

export default MyApp;
