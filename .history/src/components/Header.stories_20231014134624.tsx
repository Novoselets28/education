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
  const handleLinkClick = () => {
    // Use linkTo to simulate navigation to MainPage
    linkTo('MainPage');
  };

  return (
    <Link to="/mainpage" onClick={handleLinkClick}>
      Go to MainPage
    </Link>
  );
};

export const StorybookPageLink = () => {
  const handleLinkClick = () => {
    // Use linkTo to simulate navigation to StorybookPage
    linkTo('StorybookPage');
  };

  return (
    <Link to="/storybookpage" onClick={handleLinkClick}>
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

export const NavigateToStorybookPage = () => {
  return (
    <button onClick={() => linkTo('Header', 'StorybookPageLink')()}>
      Navigate to Storybook Page
    </button>
  );
};
