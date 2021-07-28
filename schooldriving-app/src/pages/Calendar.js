import React, {
  useState,
  useEffect,
  useRef,
  Fragment
} from 'react'

import ApiCalendar from 'react-google-calendar-api';
import AppointmentForm from '../components/AppointmentForm/AppointmentForm';
import Modal from '../components/Modal/Modal'
import SchedulerTable from '../components/Scheduler/Scheduler'
import Layout from '../components/Layout/Layout';
import config from '../utility/api';
import { addDays } from '../utility/ToolFct';

export default function Calendar() {
  const [appointments, setAppointments] = useState([]);
  const [isGoogleAuth, setIsGoogleAuth] = useState(ApiCalendar.sign)
  const modal = useRef();

  useEffect(() => {
    fetchAppointments()
  }, []);

  const fetchAppointments = () => {
    fetch(`${config.api}appointments`)
      .then((response) => response.json())
      .then((result) => {
        const dataArray = []
        result.map((val, key) => {
          const startDate = new Date(`${val.date} ${val.startTime}`).toISOString()
          const endDate = new Date(`${val.date} ${val.endTime}`).toISOString()
          dataArray.push({
            apiData: val,
            title: val.title,
            startDate,
            endDate
          })
        })
        setAppointments(dataArray)
      })
      .catch((error) => console.log('error', error));
  }

  // const handleItemClick = (event, name) => {
  //   if (name === 'sign-in') {
  //     ApiCalendar.handleAuthClick();
  //   } else if (name === 'sign-out') {
  //     ApiCalendar.handleSignoutClick();
  //   }
  // }

  const getAllEvents = () => {
    if (ApiCalendar.sign) {
      const currentDate = new Date();
      const timeMin = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString()
      const timeMax = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
        .toISOString()

      ApiCalendar.listEvents({
        timeMin,
        timeMax,
        showDeleted: false,
        maxResults: 10,
        orderBy: 'updated'
      }).then(({ result }) => {
        const dataArray = []
        result.items.map((val, key) => {
          const startDate = new Date(`${val.start.dateTime}`).toISOString()
          const endDate = addDays(new Date(`${val.end.dateTime}`), 0.8).toISOString()
          dataArray.push({
            title: val.summary,
            startDate,
            endDate
          })
        })

        const finalAppointmentData = [
          ...appointments,
          ...dataArray
        ]
        setAppointments(finalAppointmentData)
        console.log(finalAppointmentData)
      });
    } else { ApiCalendar.handleAuthClick(); }
  }

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

              {/* <button
                type="button"
                onClick={(e) => handleItemClick(e, 'sign-in')}
              >
                sign-in
              </button>
              <button
                type="button"
                onClick={(e) => handleItemClick(e, 'sign-out')}
              >
                sign-out
              </button> */}

              <button
                type="button"
                onClick={(e) => getAllEvents()}
              >
                Get Events From Google Calendar
              </button>
            </div>
          </div>

          <div className="row">
            <div className="twelve columns">
              <SchedulerTable
                schedulerData={appointments}
              />
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  )
}
