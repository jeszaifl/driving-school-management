import React from 'react'
import Panel from '../components/Panel/Panel'

export default function Login() {
  return (
    <div className="container">
      <div className="row">
        <div className="twelve column">
          <h1 className="title">
            Welcome to School Driving Scheduler!
            <br />
            <a href="/calendar">Proceed</a>
          </h1>

        </div>
      </div>
      {/* <div className="row">
        <div className="twelve columns">
          <div className="">
            <Panel>
              <div className="row">
                <div className="twelve columns">
                  <label htmlFor="exampleEmailInput">User</label>
                  <input
                  className="u-full-width"
                  type="email"
                   placeholder="First Name"
                   id="exampleEmailInput" />
                </div>
                <div className="twelve columns">
                  <label htmlFor="exampleEmailInput">Password</label>
                  <input
                  className="u-full-width"
                  type="email"
                  placeholder="Last Name"
                  id="exampleEmailInput" />
                </div>
                <input className="button-primary" type="submit" value="Login" />
              </div>
            </Panel>
          </div>
        </div>
      </div> */}
    </div>
  )
}
