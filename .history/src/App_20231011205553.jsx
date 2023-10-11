import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainPage from './components/MainPage';
import Chart from './components/Chart';
import Header from './components/Header';
import { AppWrapper } from './styles/App';

const App = () => {
  
  return (
    <AppWrapper>
      <Header/>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/chart' element={<Chart/>}/>
      </Routes>
    </AppWrapper>
  );
};

export default App;
