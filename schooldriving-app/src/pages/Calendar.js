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
            <div className="twelve columns">
              <h3>Calendar</h3>
            </div>
          </div>
          <div className="row">
            <div className="twelve columns">
              <SchedulerTable
                schedulerData={calendarEvents}
              />
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  )
}
