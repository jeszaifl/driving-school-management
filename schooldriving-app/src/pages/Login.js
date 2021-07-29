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
    <div className="authincation h-100">
      <div className="container-fluid h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <h4 className="text-center mb-4">Sign in your account</h4>
                    <form action="index.html">
                      <div className="form-group">
                        <label><strong>Email</strong></label>
                        <input
                          disabled
                          type="email"
                          className="form-control"
                          value="hello@example.com"
                        />
                      </div>
                      <div className="form-group">
                        <label><strong>Password</strong></label>
                        <input disabled type="password" className="form-control" value="Password" />
                      </div>
                      <div className="form-row d-flex justify-content-between mt-4 mb-2">
                        <div className="form-group">
                          <div className="form-check ml-2">
                            <input className="form-check-input" type="checkbox" id="basic_checkbox_1" />
                            <label className="form-check-label">
                              Remember me
                            </label>
                          </div>
                        </div>
                        <div className="form-group">
                          <a href="page-forgot-password.html">Forgot Password?</a>
                        </div>
                      </div>
                      <div className="text-center">
                        <Link
                          to="/calendar"
                          className="btn btn-primary btn-block"
                        >
                          Sign me in
                        </Link>
                      </div>
                    </form>
                    <div className="new-account mt-3">
                      <p>
                        Dont have an account?
                        <a className="text-primary" href="./page-register.html">Sign up</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
