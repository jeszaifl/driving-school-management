import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useContext,
  createRef
} from 'react'

import PropTypes from 'prop-types';
import ApiCalendar from 'react-google-calendar-api';

import config from '../../utility/api';
import AppointmentDM from '../../utility/dataModel/AppointmentDM';
import {
  addDays,
  IsEmpty,
  removeKeyFromObject,
  validateFields
} from '../../utility/ToolFct';

import { CalendarContext } from '../../context/CalendarContext';
import Notification from '../Notification/Notification';

function AppointmentForm(props, ref) {
  const [fields, setFields] = useState();
  const { selectedDate, formData, isVisbleFunction } = props
  const { getAllEvents } = useContext(CalendarContext)
  const notification = useRef(null);
  const appointmentFormREF = useRef();

  useEffect(() => {
    setFields({
      ...formData,
      date: selectedDate
    })
  }, [formData, selectedDate])

  useImperativeHandle((ref), () => ({
    upsertFromParents(res) {
      if (ApiCalendar.sign) {
        res === 'edit' ? submitForm() : deleteForm()
      } else {
        ApiCalendar.handleAuthClick()
      }
    }
  }))

  const deleteForm = () => {
    const { _id, googleCalendarId } = fields

    if (!IsEmpty(_id) && !IsEmpty(googleCalendarId)) {
      const requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };

      ApiCalendar
        .deleteEvent(googleCalendarId)
        .then((res) => {
          notification.current.success('Delete from Google calendar')
          fetch(`${config.api}appointments/${_id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
              notification.current.success('Delete from Api')
              getAllEvents()
              isVisbleFunction()
            })
            .catch((error) => console.log('error', error));
        });
    }
  }

  const submitForm = () => {
    const {
      _id,
      title,
      date,
      startTime,
      puTime,
      endTime,
      doTime,
      driver,
      type,
      puLocation,
      instructor,
      vehicle,
      status,
      instrunctionOne,
      instructionTwo,
      notes,
    } = fields

    const div = appointmentFormREF.current
    console.log(div)
    if (!validateFields(div)) {
      return false
    }

    let method = 'POST'
    let url = `${config.api}appointments/`;

    if (!IsEmpty(_id)) {
      method = 'PUT'
      url = `${config.api}appointments/${_id}`
    }

    const appointMentModel = new AppointmentDM()
    appointMentModel.readFromObj(fields)
    removeKeyFromObject(appointMentModel, ['_id', 'createdAt'])

    const startDateTime = new Date(`${appointMentModel.date} ${appointMentModel.startTime}`).toISOString();
    const endDateTime = new Date(`${appointMentModel.date} ${appointMentModel.endTime}`).toISOString();

    const eventToGoogle = {
      summary: appointMentModel.title,
      start: {
        dateTime: new Date(startDateTime).toISOString(),
      },
      end: {
        dateTime: new Date(endDateTime).toISOString()
      }
    };

    if (method === 'POST') {
      ApiCalendar.createEvent(eventToGoogle)
        .then((googleRes) => {
          const { result } = googleRes
          const raw = JSON.stringify({
            ...appointMentModel,
            googleCalendarId: result.id
          });
          upsertForm(url, raw, method)
        })
        .catch((error) => {
          notification.current.error(error.result.error.message)
          console.log(error);
        });
    } else {
      ApiCalendar.updateEvent(eventToGoogle, appointMentModel.googleCalendarId)
        .then((googleRes) => {
          notification.current.success('Update Data to Google calendar')
          const raw = JSON.stringify({
            ...appointMentModel
          });
          upsertForm(url, raw, method)
        }).catch((error) => {
          notification.current.error(error.result.error.message)
        });
    }

    return true
  }

  const upsertForm = (url, raw, method) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      method,
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((res) => {
        // window.location.reload()
        getAllEvents()
        isVisbleFunction()
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
    <form
      ref={appointmentFormREF}
    >
      <div className="row">
        <div className="twelve column">
          <h4>Appointment Form</h4>
        </div>
        <Notification ref={notification} />
      </div>

      <div className="row">
        <div className="twelve columns">
          <label>
            Title
            {' '}
            <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            className="u-full-width"
            type="text"
            name="title"
            defaultValue={formData.title}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="twelve columns">
          <label>
            Date
            {' '}
            <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            className="u-full-width"
            type="date"
            name="date"
            disabled
            defaultValue={selectedDate}
          />
        </div>
      </div>

      <div className="row">
        <div className="six columns">
          <label>
            Start Time
            {' '}
            <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            className="u-full-width"
            type="time"
            name="startTime"
            defaultValue={formData.startTime}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="six columns">
          <label>
            PU Time
            {' '}
            <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            className="u-full-width"
            type="time"
            name="puTime"
            id="teest"
            defaultValue={formData.puTime}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="six columns">
          <label>
            End Time
            {' '}
            <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            className="u-full-width"
            type="time"
            name="endTime"
            defaultValue={formData.endTime}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="six columns">
          <label>
            DO Time
            {' '}
            <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            className="u-full-width"
            type="time"
            name="doTime"
            defaultValue={formData.doTime}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="six columns">
          <label>
            Driver
            {' '}
            <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            className="u-full-width"
            type="text"
            name="driver"
            defaultValue={formData.driver}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="six columns">
          <label>
            Type
            {' '}
            <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            className="u-full-width"
            type="text"
            name="type"
            defaultValue={formData.type}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="six columns">
          <label>
            PU Location
            {' '}
            <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            className="u-full-width"
            type="text"
            name="puLocation"
            defaultValue={formData.puLocation}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="six columns">
          <label>
            Instructor
            {' '}
            <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            className="u-full-width"
            type="text"
            name="instructor"
            defaultValue={formData.instructor}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="six columns">
          <label>
            Vehicle
            {' '}
            <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            className="u-full-width"
            type="text"
            name="vehicle"
            defaultValue={formData.vehicle}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="six columns">
          <label>
            Status
            {' '}
            <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            className="u-full-width"
            type="text"
            name="status"
            defaultValue={formData.status}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="twelve columns">
          <label>
            Instruction 1
            {' '}
            <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            className="u-full-width"
            type="text"
            name="instrunctionOne"
            defaultValue={formData.instrunctionOne}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="twelve columns">
          <label>
            Insruction 2
            {' '}
            <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            className="u-full-width"
            type="text"
            name="instructionTwo"
            defaultValue={formData.instructionTwo}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="twelve columns">
          <label>
            Notes
            {' '}
            <span style={{ color: 'red' }}>*</span>
          </label>
          <textarea
            className="u-full-width"
            name="notes"
            defaultValue={formData.notes}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
      </div>

      {/*
      <input
        className="button-primary"
        type="button"
        value="Submit"
        onClick={() => submitForm()}
        /> */}
    </form>
  )
}

AppointmentForm.defaultProps = {
  selectedDate: '',
  formData: {},
  isVisbleFunction: ''
}

AppointmentForm.propTypes = {
  selectedDate: PropTypes.string,
  formData: PropTypes.objectOf(PropTypes.string),
  isVisbleFunction: PropTypes.func
};

export default forwardRef(AppointmentForm)
