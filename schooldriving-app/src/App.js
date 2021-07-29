import React, { useState, useContext, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './assets/main.scss';
import './assets/skeleton.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Calendar from './pages/Calendar';
import Users from './pages/Users';
import CalendarProvider from './context/CalendarContext';
import AuthContextProvider, { AuthContext } from './context/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <CalendarProvider>
          <Route exact path="/calendar" component={Calendar} />
        </CalendarProvider>
        <Route exact path="/user" component={Users} />
      </Router>
    </AuthContextProvider>
  );
}

export default App;
