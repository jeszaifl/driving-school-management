import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types';
import ApiCalendar from 'react-google-calendar-api';
import { withRouter } from 'react-router-dom';

import config from '../utility/api';
import UserDM from '../utility/dataModel/UserDm';
import { IsEmpty, validateFields } from '../utility/ToolFct';
import { AuthContext } from '../context/AuthContext';

function Login(props) {
  const [fields, setFields] = useState();
  const { history } = props
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields({
      ...fields,
      [name]: value
    })
  }

  const loginUser = (e) => {
    // user: test@test.com
    // password: test1234
    e.preventDefault()

    const div = e.target.closest('.loginForm')

    if (!validateFields(div)) {
      return false
    }

    const raw = JSON.stringify(fields);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${config.api}users/login`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const userData = new UserDM()
        userData.readFromObj(JSON.parse(result))

        if (!IsEmpty(userData._id)) {
          history.push('/calendar');
          setIsLoggedIn(true)
        } else {
          alert('Something went wrong')
        }
      })
      .catch((error) => alert(error));

    return true
  }

  const handleItemClick = (e, name) => {
    if (ApiCalendar.sign) {
      history.push('/calendar');
    } else {
      if (name === 'sign-in') {
        ApiCalendar.handleAuthClick();
        // history.push('/calendar');
      } else if (name === 'sign-out') {
        ApiCalendar.handleSignoutClick();
      }
    }
  }

  return (
    <div className="container">
      <form className="loginForm">
        <div className="form">
          <div className="row">
            <div className="twelve column">
              <h4>Login</h4>
            </div>
            <div className="row">
              <div className="twelve columns">
                <label htmlFor="exampleEmailInput"> </label>
                <input
                  className="u-full-width"
                  placeholder="Username / email"
                  type="email"
                  name="email"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <div className="twelve columns">
                <label htmlFor="exampleEmailInput"> </label>
                <input
                  className="u-full-width"
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="six columns">
              <input type="checkbox" />
              <span className="label-body">Remember Me</span>
            </div>
          </div>
          <button
            className="button-primary loginBtn"
            type="button"
            onClick={(e) => { loginUser(e) }}
          >
            Login
          </button>

          {/* <input
          id="deleteButton"
          className="button-primary loginBtn"
          type="button"
          value="Login google"
          onClick={(e) => handleItemClick(e, 'sign-in')}
        /> */}
          {/* <Link
          className="button-primary loginBtn"
          to="/calendar"
        >
          Login as anonymous
        </Link> */}
        </div>
      </form>
    </div>
  )
}

Login.defaultProps = {
  history: {}
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.string),
};

export default withRouter(Login)
