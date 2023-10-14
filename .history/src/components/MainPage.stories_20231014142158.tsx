import React from 'react';

import { Meta, Story } from '@storybook/react';

import { ApolloProvider } from '@apollo/client';

import client from '../apollo/client';

import MainPage from './MainPage';

export default {
  title: 'MainPage',
  component: MainPage,
  decorators: [
    (Story) => (
      <ApolloProvider client={client}>
        <Story />
      </ApolloProvider>
    ),
  ],
} as Meta;

const Template: Story = (args) => <MainPage {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithDisabledSearch = Template.bind({});
WithDisabledSearch.args = {};

WithDisabledSearch.storyName = 'MainPage with Disabled Search';

WithDisabledSearch.parameters = {
  actions: {
    onSearchChange: () => {},
  },
};
