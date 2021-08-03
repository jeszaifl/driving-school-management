import React, {
  useState,
  useEffect,
} from 'react'

import Layout from '../components/Layout/Layout'
import Modal from '../components/Modal/Modal'
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
        const res = JSON.parse(result)

        if (!IsEmpty(res.error)) {
          alert(res.error)
        } else {
          setFields([])
          fetchUsers()
        }
      })
      .catch((error) => {
        console.log(error)
      });
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
                  <select
                    className="u-full-width"
                    name="type"
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="admin">Admin</option>
                    <option value="student">Student</option>
                    <option value="driver">Driver</option>
                  </select>
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
          <div className="col-md-6">
            <div className="card">
              <div className="card-title pr">
                <h4>All Users</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table student-data-table m-t-20">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        !IsEmpty(user)
                        && user.map((val, key) => {
                          return (
                            <tr>
                              <td>
                                {val.firstName}
                                {' '}
                                {val.lastName}
                              </td>
                              <td>
                                {val.email}
                              </td>
                              <td>
                                {val.type}
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
