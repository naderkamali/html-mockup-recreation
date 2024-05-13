import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from '../components/App';
import Header from '../components/Header';
import FilesList from '../components/FilesList';
import Masthead from "../components/Masthead";

const AppRouter = () => (
  <BrowserRouter>
    <div className="container">
      <Masthead />
      <Header />
      <div className="main-content">
        <FilesList />
        <App />
        {/* <Switch>
          <Route component={App} path="/" exact={true} />
          <Route component={FilesList} path="/list" />
        </Switch> */}
      </div>
    </div>
  </BrowserRouter>
);

export default AppRouter;
