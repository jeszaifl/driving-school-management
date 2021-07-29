import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import './sidebar.style.scss'
import { Link } from 'react-router-dom';
import ApiCalendar from 'react-google-calendar-api';
import { IsEmpty } from '../../utility/ToolFct';

export default function Sidebar(props) {
  const [userInfo, setUserInfo] = useState({ userName: '', userImg: '' })

  useEffect(() => {
    ApiCalendar.onLoad(() => {
      const response = ApiCalendar.getBasicUserProfile()
      console.log(response.getImageUrl())
      setUserInfo({
        userName: response.getName(),
        userImg: response.getImageUrl(),
      })
    });
  }, [])

  return (
    // <div id="mySidenav" className="sidenav">
    //   {/* <a href="/">Home</a> */}
    //   <Link to="/user">User</Link>
    //   {/* <Link to="/">Driver</Link> */}
    //   <Link to="/calendar">Calendar</Link>
    //   {/* <Link to="/">Contact</Link> */}
    // </div>
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
                <a href="/" className="sidebar-sub-toggle">
                  <i className="ti-home" />
                  Calendar
                </a>
              </li>
              <li>
                <a href="/" className="sidebar-sub-toggle">
                  <i className="ti-home" />
                  User
                </a>
              </li>
              <li>
                <a href="/" className="sidebar-sub-toggle">
                  <i className="ti-home" />
                  Logout
                </a>
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
                            <a href="/" className="more-link">See All</a>
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
                            <a href="/" className="more-link">See All</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dropdown dib">
                  <div className="header-icon" data-toggle="dropdown">
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
