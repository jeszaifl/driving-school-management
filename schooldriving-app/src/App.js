import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './assets/main.scss';
import './assets/skeleton.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Calendar from './pages/Calendar';
import Users from './pages/Users';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/calendar" component={Calendar} />
      <Route exact path="/user" component={Users} />
    </Router>
  );
}

export default App;
