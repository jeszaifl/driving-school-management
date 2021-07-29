import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import config from '../utility/api';
import UserDM from '../utility/dataModel/UserDm';
import { IsEmpty } from '../utility/ToolFct';

export default function Login(props) {
  const [fields, setFields] = useState();
  const { history } = props

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields({
      ...fields,
      [name]: value
    })
  }

  const loginUser = () => {
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
          alert('logged')
          history.push('/calendar');
        } else {
          alert('Something went wrong')
        }
      })
      .catch((error) => alert(error));
  }

  return (
    <div className="container">

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
        <input
          className="button-primary loginBtn"
          type="button"
          value="Login"
          onClick={(e) => { loginUser() }}
        />
        <Link
          className="button-primary loginBtn"
          to="/calendar"
        >
          Login as anonymous
        </Link>
      </div>
    </div>
  )
}

Login.defaultProps = {
  history: {}
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.string),
};
