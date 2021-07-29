import React, {
  useState,
  createContext,
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import config from '../utility/api';

export const CalendarContext = createContext();

const CalendarProvider = (props) => {
  const [calendarEvents, setCalendarEvents] = useState()

  const { children } = props

  useEffect(() => {
    getAllEvents()
  }, []);

  const getAllEvents = () => {
    fetch(`${config.api}appointments`)
      .then((response) => response.json())
      .then((result) => {
        const dataArray = []
        result.map((val, key) => {
          const {
            title,
            date,
            startTime,
            endTime
          } = val
          const startDate = new Date(`${date} ${startTime}`).toISOString()
          const endDate = new Date(`${date} ${endTime}`).toISOString()

          dataArray.push({
            apiData: val,
            title,
            startDate,
            endDate
          })
        })
        setCalendarEvents(dataArray)
      })
      .catch((error) => console.log('error', error));
  }

  const payload = {
    calendarEvents,
    getAllEvents,
  };

  return <CalendarContext.Provider value={payload}>{children}</CalendarContext.Provider>;
};

CalendarProvider.defaultProps = {};

CalendarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CalendarProvider;
