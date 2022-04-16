import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App3 from './App3';
// import App2 from './App2';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
      <App3 />
  </BrowserRouter> 
    ,
  document.getElementById('root')
);

