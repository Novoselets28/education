import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import MainPage from './components/MainPage';

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
      </Routes>
    </div>
  );
};

export default App;
