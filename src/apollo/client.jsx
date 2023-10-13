import { ApolloClient, InMemoryCache } from '@apollo/client';

import { GET_CHARACTERS_QRAPHQL } from '../api';

const client = new ApolloClient({
  uri: GET_CHARACTERS_QRAPHQL,
  cache: new InMemoryCache()
});

export default client;
