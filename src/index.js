import React from 'react';
import ReactDOM from 'react-dom/client';
import Spaces from './Spaces';
import './bootstrap.css';
import Home from './Home';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/search' element={<Spaces/>}/>
    </Routes>
    </BrowserRouter>
);
