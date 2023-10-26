import React from 'react'
import { Button } from '@mui/material' 

export default {
    title: 'Button',
    component: Button
}

const Template = (arg) => <Button {...arg}/>

export const Default = () => Template.bind({});
Default.args = {
    name: 'Click me'
} 