import React from 'react'
import { Route, Routes } from 'react-router-dom';

import MainPage from './components/MainPage/MainPage';
import Chart from './components/Chart/Chart';
import Header from './components/Header/Header';
import { AppWrapper } from './styles/App';
import Storybook from './components/Storybook/Storybook';

const App = () => {
  
  return (
    <AppWrapper>
      <Header backgroundColor={''} isSticky={false}/>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/chart' element={<Chart/>}/>
        <Route path='/storybook' element={<Storybook/>}/>
      </Routes>
    </AppWrapper>
  );
};

export default App;
