import App from 'next/app'
import { ApolloProvider } from '@apollo/react-hooks'
import { ThemeProvider } from 'styled-components'

import { useApollo } from '../lib/apolloClient'


const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  )
}