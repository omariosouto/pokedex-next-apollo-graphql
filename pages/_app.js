import React from 'react';
import { ThemeProvider } from 'styled-components'
import {
  ApolloProvider,
} from '@apollo/client';
import { apolloClientBuilder } from '../infra/apolloClientBuilder';

const client = apolloClientBuilder();

export default function MyApp({ Component, pageProps }) {

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={{ colors: { primary: 'red' } }}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  )
}