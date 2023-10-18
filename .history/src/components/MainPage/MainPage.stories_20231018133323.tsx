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

const Template: Story = (args) => <MainPage disabled={false} paginationPosition={''} {...args} />;

export const PaginationLeft = Template.bind({});
PaginationLeft.args = {
  paginationPosition: 'left',
  disabled: false
};

export const PaginationRight = Template.bind({});
PaginationRight.args = {
  paginationPosition: 'right',
  disabled: false
};

export const Disabled = Template.bind({});
Disabled.args = {
  paginationPosition: 'left',
  disabled: true
};
