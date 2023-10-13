import React from 'react';

import { Meta, Story } from '@storybook/react';
import { actions } from '@storybook/addon-actions';

import Storybook from './Storybook';

export default {
  title: 'Storybook',
  component: Storybook
} as Meta;

const Template = (arg) => (
    <Storybook btn={'Click'} {...arg} {...actions('onClick')} />
  );
  
export const Default = Template.bind({});
Default.args = {
    name: 'Press me'
};
