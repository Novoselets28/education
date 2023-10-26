import React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import Storybook from './Storybook';

const meta: Meta = {
  title: 'Storybook',
  component: Storybook,
}satisfies Meta<typeof Storybook>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Storybook />,
};
