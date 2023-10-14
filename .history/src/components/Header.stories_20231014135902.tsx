import React from 'react';
import { MemoryRouter, Link, Route, BrowserRouter as Routes } from 'react-router-dom';

import { Meta, Story } from '@storybook/react';

import Header from './Header';
import MainPage from './MainPage';

export default {
  title: 'Header',
  component: Header
  // decorators: [(Story) => <MemoryRouter initialEntries={['/']}>{Story()}</MemoryRouter>]
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

export const HeaderWithMainPageLink = () => {
  return (
    <Routes>
      <Header backgroundColor={''} hoverBackgroundColor={''} />
      <Link to="/">Go to Main Page</Link>
      <Route path="/" Component={MainPage} />
    </Routes>
  );
};
