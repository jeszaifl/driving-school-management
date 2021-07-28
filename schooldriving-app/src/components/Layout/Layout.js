import React, {
  Fragment
} from 'react'

import PropTypes from 'prop-types';
import Sidebar from './Sidebar'

export default function Layout(props) {
  const { children } = props

  return (
    <Fragment>
      <Sidebar />
      <div className="main-container">
        {children}
      </div>
    </Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {}
