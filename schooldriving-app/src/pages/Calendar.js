import React, {
  useState,
  useEffect,
  useRef,
  Fragment,
  useContext
} from 'react'

import SchedulerTable from '../components/Scheduler/Scheduler'
import Layout from '../components/Layout/Layout';
import config from '../utility/api';

import { CalendarContext } from '../context/CalendarContext';
import { IsArrayEmpty } from '../utility/ToolFct';

export default function Calendar() {
  // Context
  const { calendarEvents, getAllEvents } = useContext(CalendarContext)

  useEffect(() => {
    console.log(calendarEvents)
  });

  return (
    <Fragment>
      <Layout>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3">
              <div className="card">
                <div className="card-title pr">
                  <h4>All Appointments</h4>

                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table student-data-table m-t-20">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          !IsArrayEmpty(calendarEvents)
                          && calendarEvents.map((val) => {
                            return (
                              <tr>
                                <td>{val.apiData.title}</td>
                                <td>{val.apiData.date}</td>
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
            <div className="col-lg-9">
              <div className="card">
                <div className="card-body">
                  <SchedulerTable
                    schedulerData={calendarEvents}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  )
}
