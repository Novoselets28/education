import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { Meta, Story } from '@storybook/react';

import Header from './Header';

export default {
  title: 'Header',
  component: Header,
  decorators: [(Story) => <MemoryRouter>{Story()}</MemoryRouter>]
} as Meta;

type CustomColorArgs = {
  backgroundColor: string;
};

const Template: Story<CustomColorArgs> = (args) => {
  return <>
            <Header {...args} />
            <ul>
              <li>a</li>
              <li>b</li>
              <li>c</li>
              <li>d</li>
              <li>e</li>
              <li>f</li>
              <li>g</li>
              <li>h</li>
              <li>i</li>
              <li>j</li>
              <li>k</li>
              <li>l</li>
              <li>m</li>
              <li>n</li>
              <li>o</li>
              <li>p</li>
              <li>q</li>
              <li>r</li>
              <li>s</li>
              <li>t</li>
              <li>u</li>
              <li>v</li>
              <li>w</li>
              <li>x</li>
              <li>y</li>
            </ul>
          </>;};

export const Default = Template.bind({});
Default.args = {
  isSticky: true,
  backgroundColor: 'blue',
  hoverBackgroundColor: 'red'
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  backgroundColor: 'blue',
  hoverBackgroundColor: 'red'
};

export const StickyHeader = Template.bind({});
StickyHeader.args = {
  isSticky: true
};
