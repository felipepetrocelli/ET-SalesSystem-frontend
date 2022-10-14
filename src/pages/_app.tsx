import "../styles/globals.css";
import { AppProvider } from "../app/data/context/AppContext";
import { AuthProvider } from "../app/data/context/AuthContext";

import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Head from "next/head";
import theme from '../theme';
import createEmotionCache from '../createEmotionCache';
import { CacheProvider, EmotionCache } from "@emotion/react";
import React from "react";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export  function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    
      <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AuthProvider>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
      </AuthProvider>
    </CacheProvider>
    
  );
}

export default MyApp;
