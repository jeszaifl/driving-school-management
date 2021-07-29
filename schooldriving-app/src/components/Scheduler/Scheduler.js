import React, {
  Fragment,
  useRef,
  useState,
  useEffect
} from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
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
  AppointmentForm
  // ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';
import AppointmentFormComponent from '../AppointmentForm/AppointmentForm'

import './scheduler.styles.css'
import { formatDateYYYYMMDD, IsObjEmpty } from '../../utility/ToolFct';
import AppointmentDM from '../../utility/dataModel/AppointmentDM';

export default function SchedulerTable(props) {
  const [hasDeleteBtn, setHasDeleteBtn] = useState(false);
  const [isAppointmentFormVisble, setIsAppointmentFormVisble] = useState(false);

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
          padding: 15
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
  }) => (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        backgroundColor: '#FFC107',
        borderRadius: '8px',
        fontSize: 18
      }}
    >
      {children}
    </Appointments.Appointment>
  );

  return (
    <div>
      <Paper>
        <Scheduler
          data={schedulerData}
        >
          <ViewState />
          <MonthView />
          <DayView
            startDayHour={0}
            endDayHour={24}
          />
          <Appointments appointmentComponent={Appointment} />
          <AppointmentTooltip
            // headerComponent={Header}
            // contentComponent={AppointmentForm}
            // commandButtonComponent={CommandButton}
            showCloseButton
          />
          <AppointmentForm
            visible={isAppointmentFormVisble}
            onVisibilityChange={(e) => { setIsAppointmentFormVisble(e) }}
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
