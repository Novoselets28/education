import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { linkTo } from '@storybook/addon-links';

import { action } from '@storybook/addon-actions';

import { Meta, Story } from '@storybook/react';

import Header from './Header';

export default {
  title: 'Header',
  component: Header,
  decorators: [(Story) => <MemoryRouter>{Story()}</MemoryRouter>]
} as Meta;

type CustomColorArgs = {
  backgroundColor: string;
  hoverBackgroundColor: string;
};

const Template: Story<CustomColorArgs> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const CustomColor = Template.bind({});
CustomColor.args = {
  backgroundColor: 'blue',
  hoverBackgroundColor: 'red'
};

export const WithLinks = Template.bind({});
WithLinks.args = {
  backgroundColor: 'green',
  hoverBackgroundColor: 'yellow'
};

WithLinks.storyName = 'Header with Links';

export const NavigateToAnotherStory = () => {
  return (
    <button onClick={() => {
      action('Button Clicked')();
      linkTo('Header', 'Header with Links')();
    }}>
      Navigate to Header with Links
    </button>
  );
};
