import { Box, Container, CssBaseline } from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import { SWRConfig } from 'swr';
import { Nav } from '../components/Nav';
import { grey, orange, blue, green, purple } from '@material-ui/core/colors';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// axios BASE URL
axios.defaults.baseURL = 'http://localhost:3000/api';

// create a custom progress bar
NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});
Router.events.on('routeChangeError', () => {
  NProgress.done();
});

// Create a theme instance.
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[700],
    },
    secondary: {
      main: grey[500],
    },
    error: {
      main: red[500],
    },
    warning: {
      main: orange[700],
    },
    info: {
      main: blue[400],
    },
    success: {
      main: green[600],
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  shape: {
    borderRadius: 10,
  },
});

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>Car Trader App</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>

        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Nav />

          <SWRConfig
            value={{
              fetcher: (url: string) => axios(url).then((res) => res.data),
            }}
          >
            <Container maxWidth={false}>
              <Box marginTop={2}>
                <Component {...pageProps} />
              </Box>
            </Container>
          </SWRConfig>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
