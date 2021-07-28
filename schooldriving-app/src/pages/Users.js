import React, {
  useState,
  useEffect,
  useRef,
  Fragment
} from 'react'

import Layout from '../components/Layout/Layout'
import Panel from '../components/Panel/Panel'
import config from '../utility/api'

export default function Users() {
  useEffect(() => {
    fetchUsers()
  })

  const fetchUsers = () => {
    fetch(`${config.api}users`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
      })
      .catch((error) => console.log('error', error));
  }

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="twelve columns">
            <h1>Users</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <Panel>
          <div className="row">
            <div className="six columns">
              <label htmlFor="exampleEmailInput">First Name</label>
              <input className="u-full-width" type="email" placeholder="First Name" id="exampleEmailInput" />
            </div>
            <div className="six columns">
              <label htmlFor="exampleEmailInput">Last Name</label>
              <input className="u-full-width" type="email" placeholder="Last Name" id="exampleEmailInput" />
            </div>
            <div className="row">
              <div className="six columns">
                <label htmlFor="exampleEmailInput">Email</label>
                <input className="u-full-width" type="email" placeholder="Your email" id="exampleEmailInput" />
              </div>
              <div className="six columns">
                <label htmlFor="exampleEmailInput">Password</label>
                <input className="u-full-width" type="password" placeholder="Your password" id="exampleEmailInput" />
              </div>
            </div>
            <input className="button-primary" type="submit" value="Add User" />
          </div>
        </Panel>
      </div>
      <div className="container">
        <Panel>
          <div className="grid">
            <div
              className="card"
            >
              <h3>User</h3>
              <p>Driver</p>
            </div>

            <div
              className="card"
            >
              <h3>Calendar</h3>
              <p>Find in-depth information client schedules.</p>
            </div>
            <div
              className="card"
            >
              <h3>User</h3>
              <p>Driver</p>
            </div>
            <div
              className="card"
            >
              <h3>User</h3>
              <p>Driver</p>
            </div>
            <div
              className="card"
            >
              <h3>User</h3>
              <p>Driver</p>
            </div>
            <div
              className="card"
            >
              <h3>User</h3>
              <p>Driver</p>
            </div>
          </div>
        </Panel>
      </div>
    </Layout>

  )
}
