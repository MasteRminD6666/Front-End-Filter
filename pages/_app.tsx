import * as React from 'react';
import Head from 'next/head';
import '../styles/globals.css'
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../config/theme';
import createEmotionCache from '../config/createEmotionCache';
// Our app Context i used react context rather than Redux  because it Requires minimal Setup
import AppContext from '../components/AppContext';
import EmployeeName from './../components/Filters/EmployeeName';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [filters, setFilters] = React.useState({
    logId: '',
    applicationId: '',
    EmployeeName: '',
    actionType: '',
    applicationType: '',
    fromDate: '',
    toDate: '',

  })
  const [data, setData] = React.useState([]);

  return (

    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AppContext.Provider value={{ filters, setFilters, data, setData }}>
          <Component {...pageProps} />
        </AppContext.Provider>
      </ThemeProvider>
    </CacheProvider>

  );
}