import React, {
  useEffect,
  useState,
  Fragment,
  useContext
} from 'react';
import { Link } from 'react-router-dom';
import ApiCalendar from 'react-google-calendar-api';
import PropTypes from 'prop-types';

import './sidebar.style.scss'
import { IsEmpty } from '../../utility/ToolFct';
import { CalendarContext } from '../../context/CalendarContext';

export default function Sidebar(props) {
  const { userInfo } = useContext(CalendarContext)

  useEffect(() => {
    // console.log(userInfo)
  })

  const logout = () => {
    localStorage.clear()
    ApiCalendar.handleSignoutClick()
    window.location.href = '/'
  }

  return (
    <Fragment>
      <div className="sidebar sidebar-hide-to-small sidebar-shrink sidebar-gestures">
        <div className="nano">
          <div className="nano-content">
            <ul>
              <div className="logo">
                <a href="index.html">
                  <img src="assets/images/logo.png" alt="" />
                  <span>SCHOOL</span>
                </a>
              </div>
              <li>
                <Link to="/calendar" className="sidebar-sub-toggle">
                  <i className="ti-home" />
                  Calendar
                </Link>
              </li>
              <li>
                <Link to="/user" className="sidebar-sub-toggle">
                  <i className="ti-home" />
                  User
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="sidebar-sub-toggle"
                  style={{
                    border: 0,
                    color: '#fff'
                  }}
                  onClick={(e) => { logout() }}
                >
                  <i className="ti-home" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="float-left">
                <div className="hamburger sidebar-toggle">
                  <span className="line" />
                  <span className="line" />
                  <span className="line" />
                </div>
              </div>
              <div className="float-right">
                <div className="dropdown dib">
                  <div className="header-icon" data-toggle="dropdown">
                    <i className="ti-bell" />
                    <div className="drop-down dropdown-menu dropdown-menu-right">
                      <div className="dropdown-content-heading">
                        <span className="text-left">Recent Notifications</span>
                      </div>
                      <div className="dropdown-content-body">
                        <ul>
                          <li>
                            <a href="/">
                              <img
                                className="pull-left m-r-10 avatar-img"
                                src="assets/images/avatar/3.jpg"
                                alt=""
                              />
                              <div className="notification-content">
                                <small className="notification-timestamp pull-right">
                                  02:34 PM
                                </small>
                                <div className="notification-heading">Mr. John</div>
                                <div className="notification-text">5 members joined today </div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a href="/">
                              <img
                                className="pull-left m-r-10 avatar-img"
                                src="assets/images/avatar/3.jpg"
                                alt=""
                              />
                              <div className="notification-content">
                                <small className="notification-timestamp pull-right">
                                  02:34 PM
                                </small>
                                <div className="notification-heading">Mariam</div>
                                <div className="notification-text">likes a photo of you</div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a href="/">
                              <img
                                className="pull-left m-r-10 avatar-img"
                                src="assets/images/avatar/3.jpg"
                                alt=""
                              />
                              <div className="notification-content">
                                <small className="notification-timestamp pull-right">
                                  02:34 PM
                                </small>
                                <div className="notification-heading">Tasnim</div>
                                <div className="notification-text">
                                  Hi Teddy, Just wanted to let you
                                  ...
                                </div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a href="/">
                              <img
                                className="pull-left m-r-10 avatar-img"
                                src="assets/images/avatar/3.jpg"
                                alt=""
                              />
                              <div className="notification-content">
                                <small className="notification-timestamp pull-right">
                                  02:34 PM
                                </small>
                                <div className="notification-heading">Mr. John</div>
                                <div className="notification-text">
                                  Hi Teddy, Just wanted to let you
                                  ...
                                </div>
                              </div>
                            </a>
                          </li>
                          <li className="text-center">
                            <a href="/" className="more-a">See All</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dropdown dib">
                  <div className="header-icon" data-toggle="dropdown">
                    <i className="ti-email" />
                    <div className="drop-down dropdown-menu dropdown-menu-right">
                      <div className="dropdown-content-heading">
                        <span className="text-left">2 New Messages</span>
                        <a href="email.html">
                          <i className="ti-pencil-alt pull-right" />
                        </a>
                      </div>
                      <div className="dropdown-content-body">
                        <ul>
                          <li className="notification-unread">
                            <a href="/">
                              <img
                                className="pull-left m-r-10 avatar-img"
                                src="assets/images/avatar/1.jpg"
                                alt=""
                              />
                              <div className="notification-content">
                                <small className="notification-timestamp pull-right">
                                  02:34PM
                                </small>
                                <div className="notification-heading">Michael Qin</div>
                                <div className="notification-text">
                                  Hi Teddy, Just wanted to let you...
                                </div>
                              </div>
                            </a>
                          </li>
                          <li className="notification-unread">
                            <a href="/">
                              <img
                                className="pull-left m-r-10 avatar-img"
                                src="assets/images/avatar/2.jpg"
                                alt=""
                              />
                              <div className="notification-content">
                                <small className="notification-timestamp pull-right">
                                  02:34 PM
                                </small>
                                <div className="notification-heading">Mr. John</div>
                                <div className="notification-text">
                                  Hi Teddy, Just wanted to let you ..
                                </div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a href="/">
                              <img
                                className="pull-left m-r-10 avatar-img"
                                src="assets/images/avatar/3.jpg"
                                alt=""
                              />
                              <div className="notification-content">
                                <small className="notification-timestamp pull-right">
                                  02:34 PM
                                </small>
                                <div className="notification-heading">Michael Qin</div>
                                <div className="notification-text">
                                  Hi Teddy, Just wanted to let you ...
                                </div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a href="/">
                              <img
                                className="pull-left m-r-10 avatar-img"
                                src="assets/images/avatar/2.jpg"
                                alt=""
                              />
                              <div className="notification-content">
                                <small className="notification-timestamp pull-right">
                                  02:34 PM
                                </small>
                                <div className="notification-heading">Mr. John</div>
                                <div className="notification-text">
                                  Hi Teddy, Just wanted to let you ...
                                </div>
                              </div>
                            </a>
                          </li>
                          <li className="text-center">
                            <a href="/" className="more-a">See All</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dropdown dib">
                  <div className="header-icon" data-toggle="dropdown">
                    {
                      !IsEmpty(userInfo.userName)
                      && (
                        <span className="user-avatar">
                          <img
                            alt="profile"
                            src={`${!IsEmpty(userInfo) && userInfo.userImg}`}
                            style={{ width: 30, height: 30, borderRadius: 30 }}
                          />
                          {' '}
                          {!IsEmpty(userInfo) && userInfo.userName}
                          <i className="ti-angle-down f-s-10" />
                        </span>
                      )
                    }

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

// Sidebar.propTypes = {
//   schedulerData: PropTypes.arrayOf(PropTypes.object),
// };

// Sidebar.defaultProps = {
//   schedulerData: []
// }
