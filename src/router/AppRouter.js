import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from '../components/App';
import Header from '../components/Header';
import FilesList from '../components/FilesList';

const AppRouter = () => (
  <BrowserRouter>
    <div className="container">
      <Header />
      <div className="main-content">
        <FilesList />
        <App />
      </div>
    </div>
  </BrowserRouter>
);

export default AppRouter;
