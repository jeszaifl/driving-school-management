import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef
} from 'react'

import PropTypes from 'prop-types';

import ApiCalendar from 'react-google-calendar-api';

import config from '../../utility/api';

import AppointmentDM from '../../dataModel/AppointmentDM';
import { addDays, IsEmpty, removeKeyFromObject } from '../../utility/ToolFct';

function AppointmentForm(props, ref) {
  const [fields, setFields] = useState();
  const { selectedDate, formData } = props

  useEffect(() => {
    setFields({
      ...formData,
      date: selectedDate
    })
  }, [formData, selectedDate])

  useImperativeHandle((ref), () => ({
    upsertFromParents(res) {
      res === 'edit' ? submitForm() : deleteForm()
    }
  }))

  const deleteForm = () => {
    if (!IsEmpty(fields._id)) {
      const requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };

      fetch(`${config.api}appointments/${fields._id}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          ApiCalendar.deleteEvent('2eo85lmjkkd2i63uo3lhi8a2cq').then(console.log);
        })
        .catch((error) => console.log('error', error));
    }
  }

  const submitForm = () => {
    let method = 'POST'
    let url = `${config.api}appointments/`;
    const myHeaders = new Headers();

    if (!IsEmpty(fields._id)) {
      method = 'PUT'
      url = `${config.api}appointments/${fields._id}`
    }
    myHeaders.append('Content-Type', 'application/json');

    const appointMentModel = new AppointmentDM()
    appointMentModel.readFromObj(fields)
    removeKeyFromObject(appointMentModel, ['_id', 'createdAt'])
    const raw = JSON.stringify({
      ...appointMentModel
    });

    const requestOptions = {
      method,
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const eventToGoogle = {
          apiData: result,
          summary: appointMentModel.title,
          start: {
            dateTime: new Date(appointMentModel.date).toISOString(),
          },
          end: {
            dateTime: addDays(new Date(appointMentModel.date), 0.5).toISOString()
          }
        };

        ApiCalendar.createEvent(eventToGoogle)
          .then((googleRes) => {
            if (method === 'POST') {
              alert('Save Data to Google calendar')
            } else {
              alert('Update Data to Google calendar')
            }
            console.log(googleRes)
            // window.location.reload()
          })
          .catch((error) => {
            console.log(error);
          });
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
  formData: {}
}

AppointmentForm.propTypes = {
  selectedDate: PropTypes.string,
  formData: PropTypes.objectOf(PropTypes.string),
};

export default forwardRef(AppointmentForm)
