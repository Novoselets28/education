import { Button } from '@mui/material';
import React, { useState } from 'react';

const Storybook = () => {
  const [btn, setName] = useState('Hello');

  const handleButtonClick = () => {
    setName(btn === 'Hello' ? 'Goodbye' : 'Hello');
  };

  return (
    <div>
      <Button onClick={handleButtonClick}>{btn}</Button>
    </div>
  );
};

export default Storybook;
