// import React from 'react';

// import { Meta, Story } from '@storybook/react';

// import Storybook from './Storybook';

// export default {
//   title: 'Storybook',
//   component: Storybook
// } as Meta;

// const Template: Story = (args) => <Storybook {...args} />;

// export const Default = Template.bind({});
// Default.args = {
//     name: 'Press me'
// };
import React from 'react';

import Storybook from './Storybook';

import { Button } from '@mui/material';

import type { Meta, StoryObj } from '@storybook/react';


const meta: Meta<typeof Storybook> = {
    component: Storybook
  };

  export default meta;
  type Story = StoryObj<typeof Storybook>;

  export const Primary: Story = {
    render: () => <Button variant="contained">Button</Button>
  };