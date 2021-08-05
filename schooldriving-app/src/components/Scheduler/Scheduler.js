import React, {
  Fragment,
  useRef,
  useState,
  useEffect,
  useContext
} from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import {
  QueryBuilder,
  Person,
  Create,
  DriveEta,
  LocationOn,
  List,
} from '@material-ui/icons';

import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  MonthView,
  AppointmentTooltip,
  Appointments,
  ViewSwitcher,
  Toolbar,
  DateNavigator,
  AppointmentForm,
  WeekView
  // ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';
import ApiCalendar from 'react-google-calendar-api';

import AppointmentFormComponent from '../AppointmentForm/AppointmentForm'

import './scheduler.styles.css'
import { convertTimeTo12Hours, formatDateYYYYMMDD, IsObjEmpty } from '../../utility/ToolFct';
import AppointmentDM from '../../utility/dataModel/AppointmentDM';
import { CalendarContext } from '../../context/CalendarContext';

export default function SchedulerTable(props) {
  const [hasDeleteBtn, setHasDeleteBtn] = useState(false);
  const [isAppointmentFormVisble, setIsAppointmentFormVisble] = useState(false);

  const { getUserInfo } = useContext(CalendarContext)

  const { schedulerData } = props
  const form = useRef();

  useEffect(() => { }, [])

  const AppointmentFormLayout = (data) => {
    const { appointmentData } = data
    const date = appointmentData.startDate
    const selectedDate = formatDateYYYYMMDD(date)

    let formData = new AppointmentDM()
    if (!IsObjEmpty(appointmentData.apiData)) {
      formData = appointmentData.apiData
      setHasDeleteBtn(true)
    } else {
      setHasDeleteBtn(false)
    }

    return (
      <Fragment>
        <div className="container">
          <AppointmentFormComponent
            ref={form}
            selectedDate={selectedDate}
            formData={formData}
            isVisbleFunction={(e) => { setIsAppointmentFormVisble(false) }}
          />
        </div>
      </Fragment>
    )
  }

  const CommandButton = () => {
    return (
      <Fragment>
        <div style={{
          width: '100%',
          background: '#fff',
          textAlign: 'right',
          padding: 15,
          height: 30,
        }}
        >
          {hasDeleteBtn && <input id="deleteButton" className="button-primary" type="button" value="Delete" onClick={(e) => upsertButton('delete')} />}
          <input id="saveButton" className="button-primary" type="button" value="Submit" onClick={(e) => upsertButton('edit')} />
        </div>
      </Fragment>
    )
  }

  const upsertButton = (str) => {
    form.current.upsertFromParents(str)
  }

  const Appointment = ({
    // eslint-disable-next-line react/prop-types
    children, style, ...restProps
  }) => {
    const { data } = restProps
    let color;
    switch (data.apiData.status) {
      case 'Open':
        color = '#33b5e5';
        break;
      case 'In Progress':
        color = '#ffbb33';
        break;
      case 'Cancelled':
        color = '#ff3547';
        break;
      case 'Confirmed':
        color = '#00c851';
        break;
      default:
        color = 'pink'
    }

    return (
      <Appointments.Appointment
        {...restProps}
        style={{
          ...style,
          backgroundColor: color,
          borderRadius: 0,
          fontSize: 14,
          padding: 10,
        }}
      >
        <div style={{ color: '#fff' }}>
          <p className="color-white">
            <b>
              <QueryBuilder style={{
                float: 'left',
                marginRight: 5,
              }}
              />

              {convertTimeTo12Hours(data.apiData.startTime)}
              {' '}
              -
              {' '}
              {convertTimeTo12Hours(data.apiData.endTime)}
            </b>
          </p>
          <p className="color-white">
            <Create style={{
              float: 'left',
              marginRight: 5,
            }}
            />
            {data.apiData.title}
          </p>
          <p className="color-white">
            <Person style={{
              float: 'left',
              marginRight: 5,
            }}
            />
            {data.apiData.driver}
          </p>
        </div>
        {/* {children} */}
      </Appointments.Appointment>
    )
  };

  const setVisibility = (e) => {
    if (!ApiCalendar.sign) {
      ApiCalendar.handleAuthClick()
      getUserInfo()
    }

    if (ApiCalendar.sign) {
      setIsAppointmentFormVisble(e)
    }
  }
  const customTooltip = (e) => {
    let classColor = 'red'
    switch (e.appointmentData.apiData.status) {
      case 'Open':
        classColor = 'open';
        break;
      case 'In Progress':
        classColor = 'Progress';
        break;
      case 'Cancelled':
        classColor = 'Cancelled';
        break;
      case 'Confirmed':
        classColor = 'Confirmed';
        break;
      default:
        classColor = 'pink'
    }

    return (
      <div className="popup">
        <p
          className={classColor}
          style={{
            float: 'left',
            margin: 7,
            height: 20,
            width: 20,
            borderRadius: 100,
          }}
        />
        <h3
          className="text-ellipsis"
          style={{
            margin: 0,
            fontSize: 20,
            width: 300,
          }}
        >
          {e.appointmentData.apiData.title}
        </h3>
        <p style={{ marginBottom: 10, borderBottom: '1px solid #EEEE', paddingBottom: 7 }}>
          {new Date(e.appointmentData.apiData.date).toDateString()}
          {' '}
          -
          {' '}
          {convertTimeTo12Hours(e.appointmentData.apiData.startTime)}
          {' '}
          -
          {' '}
          {convertTimeTo12Hours(e.appointmentData.apiData.endTime)}
        </p>
        <div style={{ marginLeft: 5 }}>
          <p style={{ marginBottom: 7 }}>
            <Person style={{
              fontSize: 22,
              float: 'left',
              marginRight: 7,
            }}
            />
            {e.appointmentData.apiData.driver}
          </p>
          <p style={{ marginBottom: 7 }}>
            <Person style={{
              fontSize: 22,
              float: 'left',
              marginRight: 7,
            }}
            />
            {e.appointmentData.apiData.instructor}
          </p>
          <p style={{ marginBottom: 7 }}>
            <DriveEta style={{
              fontSize: 22,
              float: 'left',
              marginRight: 7,
            }}
            />
            {e.appointmentData.apiData.vehicle}
          </p>
          <p style={{ marginBottom: 7 }}>
            <LocationOn style={{
              fontSize: 22,
              float: 'left',
              marginRight: 7,
            }}
            />
            {e.appointmentData.apiData.puLocation}
          </p>
          <p style={{ marginBottom: 15 }}>
            <List style={{
              fontSize: 22,
              float: 'left',
              marginRight: 7,
            }}
            />
            {e.appointmentData.apiData.type}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Paper>
        <Scheduler
          data={schedulerData}
        >
          <ViewState />
          <MonthView />
          <WeekView />
          <DayView
            startDayHour={0}
            endDayHour={24}
          />
          <Appointments appointmentComponent={Appointment} />
          <AppointmentTooltip
            contentComponent={customTooltip}
          />
          <AppointmentForm
            visible={isAppointmentFormVisble}
            onVisibilityChange={(e) => { setVisibility(e) }}
            basicLayoutComponent={AppointmentFormLayout}
            commandLayoutComponent={CommandButton}
          />
          <Toolbar />
          <DateNavigator />
          <ViewSwitcher />
        </Scheduler>
      </Paper>
    </div>
  )
}

SchedulerTable.propTypes = {
  schedulerData: PropTypes.arrayOf(PropTypes.object),
};

SchedulerTable.defaultProps = {
  schedulerData: []
}
