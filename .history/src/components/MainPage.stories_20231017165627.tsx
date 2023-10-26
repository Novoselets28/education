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
    )
  ]
} as Meta;

const Template: Story = (args) => <MainPage disabled={false} {...args} />;

export const Default = Template.bind({});
Default.args = {
  disabled: false
};

export const WithPagination = Template.bind({});
WithPagination.args = {
  disabled: false,
  pageSize: 5
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true
};
