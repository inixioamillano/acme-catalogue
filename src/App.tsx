import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Catalogue from './screens/Catalogue';
import DetailedView from './screens/DetailedView';
import Login from './screens/Login';
function App() {
  require('dotenv').config()
  console.log(process)
  return (
    <div>
        <BrowserRouter>
          <Route exact path="/" component={Catalogue} />
          <Route exact path='/login' component={Login} />
          <Route path="/detailed/:id" component={DetailedView} />
        </BrowserRouter>
    </div>
  );
}

export default App;
