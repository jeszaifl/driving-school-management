import React, {
  useState,
  useEffect,
  useContext,
  Fragment
} from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import './assets/lib/bootstrap.min.css';
import './assets/lib/sidebar.css';
import './assets/lib/style.css';

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
        {/* <AuthContext.Consumer>
          {
            (value) => {
              return (
                !value.isLoggedIn && <Redirect to="/" />
              )
            }
          }
        </AuthContext.Consumer> */}
        <Route exact path="/" component={Login} />
        <Route path="/home" component={Home} />
        <CalendarProvider>
          <Route path="/calendar" component={Calendar} />
        </CalendarProvider>
        <Route path="/user" component={Users} />
      </Router>
    </AuthContextProvider>
  );
}

export default App;
