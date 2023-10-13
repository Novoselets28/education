import Header from './Header';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Header',
  component: Header,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLinks: Story = {
  // You can add additional props or data here if needed
};
