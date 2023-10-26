import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button } from '@mui/material';

export default {
  title: 'Button',
  component: Button,
} as Meta;

const Template: Story = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'Press me',
};
