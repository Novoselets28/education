import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import Header from './Header';
import MainPage from './MainPage';

export default {
  title: 'Header',
  component: Header,
} as Meta;

type CustomColorArgs = {
  backgroundColor: string;
  hoverBackgroundColor: string;
};

const Template: Story<CustomColorArgs> = (args) => {
  const [showMainPage, setShowMainPage] = useState(false);

  return (
    <div>
      <Header {...args} />
      <button onClick={() => setShowMainPage(true)}>Go to Main Page</button>
      {showMainPage && <MainPage />}
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const CustomColor = Template.bind({});
CustomColor.args = {
  backgroundColor: 'blue',
  hoverBackgroundColor: 'red',
};
