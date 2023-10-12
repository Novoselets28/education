import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainPage from './components/MainPage';
import Chart from './components/Chart';
import Header from './components/Header';
import { AppWrapper } from './styles/App';
import Storybook from './components/Storybook';

const App = () => {
  
  return (
    <AppWrapper>
      <Header/>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/chart' element={<Chart/>}/>
        <Route path='/storybook' element={<Storybook/>}/>
      </Routes>
    </AppWrapper>
  );
};

export default App;
