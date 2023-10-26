import { Button } from '@mui/material';
import React, { useState } from 'react';

const Storybook = ({name}) => {
  const [name, setName] = useState('Hello');

  const handleButtonClick = () => {
    setName(name === 'Hello' ? 'Goodbye' : 'Hello');
  };

  return (
    <div>
      <Button onClick={handleButtonClick}>{name}</Button>
    </div>
  );
};

export default Storybook;
