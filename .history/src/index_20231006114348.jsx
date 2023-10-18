import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';

import client from './apollo/client';

import App from './App';

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
  document.getElementById('root')
);
