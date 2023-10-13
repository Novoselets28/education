import React from 'react';
import { Meta, Story } from '@storybook/react';

import Header from './Header';

export default {
  title: 'Header',
  component: Header
} as Meta;

const Template: Story = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithMenuIcon = Template.bind({});
WithMenuIcon.args = {
  // Add props to customize your Header component, if needed
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  // Add props to customize your Header component, e.g., backgroundColor
};
