import React, {
  useContext,
  useState,
  Fragment,
  useEffect
} from 'react'
import PropTypes from 'prop-types';
import ApiCalendar from 'react-google-calendar-api';
import { withRouter } from 'react-router-dom';

import config from '../utility/api';
import UserDM from '../utility/dataModel/UserDm';
import { IsEmpty, validateFields } from '../utility/ToolFct';
import { AuthContext } from '../context/AuthContext';
import { CalendarContext } from '../context/CalendarContext';

function Login(props) {
  const [fields, setFields] = useState();
  const [registerFields, setRegisterFields] = useState();
  const [formVisible, setFormVisible] = useState(true);
  const [moveToCalendar, setMoveToCalendar] = useState(false);

  const { history } = props
  const { setIsLoggedIn, setUserInfo } = useContext(AuthContext)
  const { getAllEvents } = useContext(CalendarContext)

  useEffect(() => {
    ApiCalendar.onLoad(() => {
      ApiCalendar.listenSign(loginGoogleEvent);
      loginGoogleEvent()
    });
  })

  const loginGoogleEvent = () => {
    const response = ApiCalendar.getBasicUserProfile()
    if (!IsEmpty(response)) {
      getAllEvents()
      history.push('/calendar');
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields({
      ...fields,
      [name]: value
    })
  }

  const registerUser = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify(registerFields);
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${config.api}users/register`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result)
        console.log(result)
        if (!IsEmpty(res.error)) {
          alert(res.error)
        } else {
          // setFields([])
          // fetchUsers()
          window.location.reload()
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }
  const handleregisterChange = (e) => {
    const { name, value } = e.target
    setRegisterFields({
      ...registerFields,
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
          localStorage.setItem('userId', userData._id)
          setIsLoggedIn(true)
          // getAllEvents()
          history.push('/calendar');
        } else {
          alert('Something went wrong')
        }
      })
      .catch((error) => alert(error));

    return true
  }

  return (
    <Fragment>
      <div className="container">
        <div className="twelve columns">
          {
            formVisible
              ? (
                <form className="loginForm">
                  <div className="form">
                    <div className="row">
                      <div className="twelve column">
                        <h4>Login</h4>
                      </div>

                      <div className="twelve column">
                        <button
                          className="button-danger loginBtn"
                          type="button"
                          onClick={(e) => {
                            ApiCalendar.handleAuthClick();
                            setMoveToCalendar(true)
                            loginGoogleEvent()
                          }}
                        >
                          {moveToCalendar ? '' : 'Sign in to Google'}
                        </button>
                      </div>

                      <div className="row">
                        {/* <div className="twelve columns">
                          <label htmlFor="exampleEmailInput"> </label>
                          <input
                            className="u-full-width"
                            placeholder="Username / email"
                            type="email"
                            name="email"
                            onChange={(e) => handleChange(e)}
                            required
                            disabled
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
                            disabled
                          />
                        </div>
                        <div className="twelve columns">
                          <button
                            className="button-primary loginBtn"
                            type="button"
                            disabled
                            onClick={(e) => { loginUser(e) }}
                          >
                            Login
                          </button>
                        </div>
                        <div className="twelve columns">
                          <button
                            className="button loginBtn"
                            type="button"
                            disabled
                            onClick={(e) => { setFormVisible(false) }}
                          >
                            Create Account
                          </button>
                        </div> */}
                      </div>

                    </div>
                  </div>
                </form>
              )
              : (
                <form className="registerForm">
                  <div className="form">
                    <div className="row">
                      <div className="twelve column">
                        <h4>Register</h4>
                      </div>
                      <div className="row">
                        <div className="six columns">
                          <label htmlFor="exampleEmailInput"> </label>
                          <input
                            className="u-full-width"
                            placeholder="First Name"
                            type="text"
                            name="firstName"
                            onChange={(e) => handleregisterChange(e)}
                            required
                          />
                        </div>
                        <div className="six columns">
                          <label htmlFor="exampleEmailInput"> </label>
                          <input
                            className="u-full-width"
                            placeholder="Last Name"
                            type="text"
                            name="lastName"
                            onChange={(e) => handleregisterChange(e)}
                            required
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="twelve columns">
                          <label htmlFor="exampleEmailInput"> </label>
                          <input
                            className="u-full-width"
                            placeholder="Email"
                            type="email"
                            name="email"
                            onChange={(e) => handleregisterChange(e)}
                            required
                          />
                        </div>
                        <div className="twelve columns">
                          <select
                            className="u-full-width"
                            name="type"
                            onChange={(e) => handleregisterChange(e)}
                          >
                            <option selected="true" disabled="disabled">---</option>
                            <option value="admin">Admin</option>
                            <option value="student">Student</option>
                            <option value="driver">Driver</option>
                          </select>
                        </div>
                        <div className="twelve columns">
                          <label htmlFor="exampleEmailInput"> </label>
                          <input
                            className="u-full-width"
                            placeholder="Password"
                            type="password"
                            name="password"
                            onChange={(e) => handleregisterChange(e)}
                            required
                          />
                        </div>
                        <div className="twelve columns">
                          <label htmlFor="exampleEmailInput"> </label>
                          <input
                            className="u-full-width"
                            placeholder="Confirm Password"
                            type="password"
                            name="password"
                            onChange={(e) => handleregisterChange(e)}
                            required
                          />
                        </div>
                        <div className="twelve columns">
                          <button
                            className="button-primary registerBtn"
                            type="button"
                            value="Register"
                            onClick={(e) => { registerUser(e) }}
                          >
                            Register
                          </button>
                        </div>
                        <div className="twelve columns">
                          <button
                            className="button-danger registerBtn"
                            type="button"
                            value="Register"
                            onClick={(e) => { setFormVisible(true) }}
                          >
                            Already have an account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              )
          }
        </div>
      </div>
    </Fragment>
  )
}

Login.defaultProps = {
  history: {}
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.string),
};

export default withRouter(Login)
