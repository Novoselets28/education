import React, { useState } from 'react';
import PropTypes from 'prop-types';

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

Button.propTypes = {
    name: PropTypes.string,
    onClick: PropTypes.func
}

export default Storybook;
