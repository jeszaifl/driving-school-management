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
      <div className="content-wrap">
        <div className="main">
          <div className="container-fluid">
            <div className="row">
              {children}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {}
