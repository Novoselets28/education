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

import { Button } from '@mui/material';

import Storybook from './Storybook';

import type { Meta, Story } from '@storybook/react';


export default {
      title: 'Storybook',
      component: Storybook
    } as Meta;

const Template: Story = (args) => <Storybook {...args} />;

  export const Default = Template.bind({})
  Default.args = {
    render: () => <Button variant="contained">Button</Button>
  };

