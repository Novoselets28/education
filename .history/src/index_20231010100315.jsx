import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';

import { Router } from 'react-router-dom';

import client from './apollo/client';

import App from './App';

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </StrictMode>,
  document.getElementById('root')
);
