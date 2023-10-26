import React from 'react';

import { Button } from '@mui/material';

import Storybook from './Storybook';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Storybook',
  component: Storybook
} as Meta;

const Template: Story = (args) => <Storybook {...args} />;

export const StorybookPrimary = Template.bind({});
StorybookPrimary.args = {
  render: () => <Button>Button</Button>
};


