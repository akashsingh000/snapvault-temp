import React from "react";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { wrapper } from "components/redux";
import { ContentLoader } from "components/components/ui-elements/dataLoader";
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from "components/components/AuthProvider/authProvider";
// import { SessionProvider } from "next-auth/react"
function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps, session } = props;
  const Router = useRouter()
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
    //eslint-disable-next-line
  }, []);

  return (
    <AuthProvider>
      <Provider store={store}>
        <ContentLoader loading={loading} />
        <Component {...pageProps} />
        <ToastContainer position="bottom-right" />
      </Provider>
    </AuthProvider>
  );
}

export default App;