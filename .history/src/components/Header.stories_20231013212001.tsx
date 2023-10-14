import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { linkTo } from '@storybook/addon-links';

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

WithLinks.storyName = 'Main Page';

export const NavigateToAnotherStory = () => {
  return (
    <button onClick={() => linkTo('Main Page', 'MainPage')()}>
      Navigate to Header with Links
    </button>
  );
};

