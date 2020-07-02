import {
  ApolloClient,
  HttpLink,
  InMemoryCache
} from '@apollo/client';

export function apolloClientBuilder() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'https://graphql-pokemon.now.sh/'
    })
  })

  return client;
}