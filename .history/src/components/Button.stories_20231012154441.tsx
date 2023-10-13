import { Meta, StoryObj } from '@storybook/react';
import Storybook from './Storybook';
import React from 'react';

const meta: Meta<typeof Storybook> = {
  component: Storybook,
};

export default meta;
type Story = StoryObj<typeof Storybook>;

export const Primary: Story = {
  render: () => <Storybook />,
};
