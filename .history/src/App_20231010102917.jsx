import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import MainPage from './components/MainPage';
import Chart from './components/Chart';

const App = () => {
  
  return (

    <div>
       <nav>
          <ul>
            <li>
              <Link to="/">MainPage</Link>
            </li>
            <li>
              <Link to="/chart">Chart</Link>
            </li>
          </ul>
        </nav>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/chart' element={<Chart/>}/>
      </Routes>
    </div>
  );
};

export default App;
