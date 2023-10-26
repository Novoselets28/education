import React, { useState } from 'react';

import { Button } from '@mui/material';


const Storybook = () => {
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
