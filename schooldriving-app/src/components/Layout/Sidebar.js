import * as React from 'react';
import PropTypes from 'prop-types';
import './sidebar.style.scss'

export default function Sidebar(props) {
  return (
    <div id="mySidenav" className="sidenav">
      {/* <a href="/">Home</a> */}
      <a href="/user">User</a>
      {/* <a href="/">Driver</a> */}
      <a href="/calendar">Calendar</a>
      {/* <a href="/">Contact</a> */}
    </div>
  )
}

// Sidebar.propTypes = {
//   schedulerData: PropTypes.arrayOf(PropTypes.object),
// };

// Sidebar.defaultProps = {
//   schedulerData: []
// }
