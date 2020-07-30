import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Catalogue from './screens/Catalogue';
import DetailedView from './screens/DetailedView';
import Login from './screens/Login';
import NotFound from './screens/NotFound';
function App() {
  require('dotenv').config()
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Catalogue} />
          <Route exact path='/login' component={Login} />
          <Route path="/detailed/:id" component={DetailedView} />
          <Route component={NotFound}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
