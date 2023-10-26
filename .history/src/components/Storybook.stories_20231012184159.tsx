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

export const StorybookSecondary = Template.bind({});
StorybookSecondary.args = {
  render: () => <Button color="secondary">Button</Button>
};

export const StorybookError = Template.bind({});
StorybookError.args = {
  render: () => <Button color="error">Button</Button>
};

export const StorybookSuccess = Template.bind({});
StorybookSuccess.args = {
  render: () => <Button color="success">Button</Button>
};

export const StorybookWarning = Template.bind({});
StorybookWarning.args = {
  render: () => <Button color="warning">Button</Button>
};

