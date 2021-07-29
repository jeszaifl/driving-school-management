import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useContext
} from 'react'

import PropTypes from 'prop-types';
import ApiCalendar from 'react-google-calendar-api';

import config from '../../utility/api';
import AppointmentDM from '../../utility/dataModel/AppointmentDM';
import { addDays, IsEmpty, removeKeyFromObject } from '../../utility/ToolFct';

import { CalendarContext } from '../../context/CalendarContext';

function AppointmentForm(props, ref) {
  const [fields, setFields] = useState();
  const { selectedDate, formData, isVisbleFunction } = props
  const { getAllEvents } = useContext(CalendarContext)

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
          alert('Delete from Google calendar')

          fetch(`${config.api}appointments/${_id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
              alert('Delete from Api')
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

    if (
      !IsEmpty(title)
      && !IsEmpty(date)
      && !IsEmpty(startTime)
      && !IsEmpty(puTime)
      && !IsEmpty(endTime)
      && !IsEmpty(doTime)
      && !IsEmpty(driver)
      && !IsEmpty(type)
      && !IsEmpty(puLocation)
      && !IsEmpty(instructor)
      && !IsEmpty(vehicle)
      && !IsEmpty(status)
      && !IsEmpty(instrunctionOne)
      && !IsEmpty(instructionTwo)
      && !IsEmpty(notes)
    ) {
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
            console.log(error);
          });
      } else {
        ApiCalendar.updateEvent(eventToGoogle, appointMentModel.googleCalendarId)
          .then((googleRes) => {
            console.log(googleRes)
            alert('Update Data to Google calendar')
            const raw = JSON.stringify({
              ...appointMentModel
            });
            upsertForm(url, raw, method)
          });
      }
    } else {
      alert('Please fill up the form.')
    }
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
    <form>
      <div className="row">
        <div className="twelve column">
          <h4>Appointment Form</h4>
        </div>
      </div>

      <div className="row">
        <div className="twelve columns">
          <label>Title</label>
          <input
            className="u-full-width"
            type="text"
            name="title"
            defaultValue={formData.title}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>

      <div className="row">
        <div className="twelve columns">
          <label>Date</label>
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
          <label>Start Time</label>
          <input
            className="u-full-width"
            type="time"
            name="startTime"
            defaultValue={formData.startTime}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="six columns">
          <label>PU Time</label>
          <input
            className="u-full-width"
            type="time"
            name="puTime"
            defaultValue={formData.puTime}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>

      <div className="row">
        <div className="six columns">
          <label>End Time</label>
          <input
            className="u-full-width"
            type="time"
            name="endTime"
            defaultValue={formData.endTime}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="six columns">
          <label>DO Time</label>
          <input
            className="u-full-width"
            type="time"
            name="doTime"
            defaultValue={formData.doTime}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>

      <div className="row">
        <div className="six columns">
          <label>Driver</label>
          <input
            className="u-full-width"
            type="text"
            name="driver"
            defaultValue={formData.driver}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="six columns">
          <label>Type</label>
          <input
            className="u-full-width"
            type="text"
            name="type"
            defaultValue={formData.type}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>

      <div className="row">
        <div className="six columns">
          <label>PU Location</label>
          <input
            className="u-full-width"
            type="text"
            name="puLocation"
            defaultValue={formData.puLocation}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="six columns">
          <label>Instructor</label>
          <input
            className="u-full-width"
            type="text"
            name="instructor"
            defaultValue={formData.instructor}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>

      <div className="row">
        <div className="six columns">
          <label>Vehicle</label>
          <input
            className="u-full-width"
            type="text"
            name="vehicle"
            defaultValue={formData.vehicle}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="six columns">
          <label>Status</label>
          <input
            className="u-full-width"
            type="text"
            name="status"
            defaultValue={formData.status}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>

      <div className="row">
        <div className="twelve columns">
          <label>Instruction 1</label>
          <input
            className="u-full-width"
            type="text"
            name="instrunctionOne"
            defaultValue={formData.instrunctionOne}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>

      <div className="row">
        <div className="twelve columns">
          <label>Insruction 2</label>
          <input
            className="u-full-width"
            type="text"
            name="instructionTwo"
            defaultValue={formData.instructionTwo}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>

      <div className="row">
        <div className="twelve columns">
          <label>Notes</label>
          <textarea
            className="u-full-width"
            name="notes"
            defaultValue={formData.notes}
            onChange={(e) => handleChange(e)}
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
