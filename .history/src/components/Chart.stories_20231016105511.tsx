import React from 'react';
import { ApolloProvider } from '@apollo/client';

import { MockedProvider } from '@apollo/client/testing';

import { GET_CHARACTERS } from '../apollo/people';

import client from '../apollo/client';
import Chart from './Chart';

export default {
  title: 'CharacterCreationChart', // Define the title for your Storybook story
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
                    // Define your mock data here
                    {
                      name: 'Character 1',
                      created: '2017-01-01T00:00:00.000Z',
                      gender: 'Male'
                    },
                    // Add more character data as needed
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
