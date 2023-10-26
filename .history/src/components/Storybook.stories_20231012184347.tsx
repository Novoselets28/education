import React from 'react';

import { Story, Meta } from '@storybook/react';

import Storybook from './Storybook';

export default {
  title: 'Storybook',
  component: Storybook,
} as Meta;

const Template: Story = (args) => <Storybook {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Goodbye = Template.bind({});
Goodbye.args = { name: 'Goodbye' };

export const CustomColor = Template.bind({});
CustomColor.args = { color: 'secondary' };
