import * as React from 'react';
import PropTypes from 'prop-types';
import './sidebar.style.scss'
import { Link } from 'react-router-dom';

export default function Sidebar(props) {
  return (
    <div id="mySidenav" className="sidenav">
      {/* <a href="/">Home</a> */}
      <Link to="/user">User</Link>
      {/* <Link to="/">Driver</Link> */}
      <Link to="/calendar">Calendar</Link>
      {/* <Link to="/">Contact</Link> */}
    </div>
  )
}

// Sidebar.propTypes = {
//   schedulerData: PropTypes.arrayOf(PropTypes.object),
// };

// Sidebar.defaultProps = {
//   schedulerData: []
// }
