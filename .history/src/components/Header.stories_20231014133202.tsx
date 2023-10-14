import React from 'react';
import { MemoryRouter, Link } from 'react-router-dom';
import { linkTo } from '@storybook/addon-links';

import { Meta, Story } from '@storybook/react';

import Header from './Header';

export default {
  title: 'Header',
  component: Header,
  decorators: [(Story) => <MemoryRouter initialEntries={['/']}>{Story()}</MemoryRouter>]
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

export const MainPageLink = () => {
  return (
    <Link to="/mainpage">
      Go to MainPage
    </Link>
  );
};

export const AnotherPageLink = () => {
  return (
    <Link to="/anotherpage">
      Go to Another Page
    </Link>
  );
};

export const StorybookPageLink = () => {
  return (
    <Link to="/storybookpage">
      Go to Storybook Page
    </Link>
  );
};

export const NavigateToMainPage = () => {
  return (
    <button onClick={() => linkTo('Header', 'MainPageLink')()}>
      Navigate to MainPage
    </button>
  );
};

export const NavigateToAnotherPage = () => {
  return (
    <button onClick={() => linkTo('Header', 'AnotherPageLink')()}>
      Navigate to Another Page
    </button>
  );
};

export const NavigateToStorybookPage = () => {
  return (
    <button onClick={() => linkTo('Header', 'StorybookPageLink')()}>
      Navigate to Storybook Page
    </button>
  );
};
