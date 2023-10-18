import { ApolloClient, InMemoryCache } from '@apollo/client';

import { GET_PEOPLE_QRAPHQL } from '../api';

const client = new ApolloClient({
  uri: GET_PEOPLE_QRAPHQL,
  cache: new InMemoryCache()
});

export default client;
