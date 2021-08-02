import React, {
  useState,
  useEffect,
  useRef,
  Fragment
} from 'react'

import Layout from '../components/Layout/Layout'
import Modal from '../components/Modal/Modal'
import Panel from '../components/Panel/Panel'
import config from '../utility/api'
import { IsEmpty } from '../utility/ToolFct'

export default function Users() {
  const [user, setUsers] = useState([])
  const [fields, setFields] = useState();

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = () => {
    fetch(`${config.api}users`)
      .then((response) => response.json())
      .then((result) => {
        setUsers(result)
      })
      .catch((error) => console.log('error', error));
  }

  const upsertUser = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify(fields);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${config.api}users/register`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setFields([])
        fetchUsers()
      })
      .catch((error) => console.log('error', error));
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields({
      ...fields,
      [name]: value
    })
  }

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <Modal buttonText="Add User">
              <div className="row">
                <div className="col-lg-6">
                  <label>First Name</label>
                  <input
                    className="u-full-width"
                    type="text"
                    name="firstName"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="col-lg-6">
                  <label>Last Name</label>
                  <input
                    className="u-full-width"
                    type="text"
                    name="lastName"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="col-lg-6">
                  <label>Type</label>
                  <input
                    className="u-full-width"
                    type="text"
                    name="type"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="col-lg-12">
                  <label>Email</label>
                  <input
                    className="u-full-width"
                    type="text"
                    name="email"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="col-lg-12">
                  <label>Password</label>
                  <input
                    className="u-full-width"
                    type="password"
                    name="password"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <input
                  className="button-primary"
                  type="button"
                  value="Add User"
                  onClick={(e) => upsertUser()}
                />
              </div>
            </Modal>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          {
            !IsEmpty(user)
            && user.map((val, key) => {
              return (
                <div className="col-lg-3">
                  <div className="card p-0">
                    <div className="stat-widget-three home-widget-three">
                      <div className="stat-content" style={{ margin: 0 }}>
                        <div className="stat-digit">
                          {val.firstName}
                          {' '}
                          {val.lastName}
                        </div>
                        <div className="stat-text">{val.email}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </Layout>
  )
}
