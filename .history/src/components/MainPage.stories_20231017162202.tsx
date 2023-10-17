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
  // Pagination configuration
  borderType: 'default',
  color: 'primary',
  currentPage: 1,
  itemsCount: 1000,
  onChange: () => {}, // You can provide the actual function
  onPerPageSelect: () => {}, // You can provide the actual function
  perPage: 100,
  size: 'large'
};
WithPagination.storyName = 'With Pagination';

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true
};
