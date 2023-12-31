import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainPage from './components/MainPage';
import Chart from './components/Chart';
import Header from './components/Header';

const App = () => {
  
  return (

    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/chart' element={<Chart/>}/>
      </Routes>
    </div>
  );
};

export default App;
