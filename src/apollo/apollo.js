import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://swapi.dev/api/people/',
  cache: new InMemoryCache()
});

export default client;
