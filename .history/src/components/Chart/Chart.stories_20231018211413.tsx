import React from 'react';
import { ApolloProvider } from '@apollo/client';

import { MockedProvider } from '@apollo/client/testing';

import { GET_CHARACTERS } from '../../apollo/people';

import client from '../../apollo/client';

import Chart from './Chart';

export default {
  title: 'Chart',
  component: Chart,
  decorators: [
    (Story) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: GET_CHARACTERS
            },
            result: {
              data: {
                characters: {
                  results: [
                    {
                      name: 'Character 1',
                      created: '2017-01-01T00:00:00.000Z',
                      gender: 'Male'
                    }
                  ]
                }
              }
            }
          }
        ]}
      >
        <Story />
      </MockedProvider>
    )
  ]
};

export const Default = () => (
  <ApolloProvider client={client}>
    <Chart />
  </ApolloProvider>
);
