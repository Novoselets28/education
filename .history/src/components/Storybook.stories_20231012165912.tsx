import React from 'react';
import { Meta, Story } from '@storybook/react';
import Storybook from './Storybook';

export default {
  title: 'Storybook',
  component: Storybook,
} as Meta;

const Template: Story = (args) => <Storybook {...args} />;

export const Default = Template.bind({});
Default.args = {};
