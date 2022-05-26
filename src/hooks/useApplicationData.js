import {useState, useEffect} from "react";
import axios from "axios";

const useApplicationData = () => {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  // resets the day state 
  const setDay = day => setState({...state, day});

  // counts the spots in a given day
  const countSpots = (state) => {

    const currentDay = state.days.find(day => day.name === state.day);
    const appointmentIds = currentDay.appointments;

    const spots = appointmentIds.filter(id => 
      state.appointments[id].interview === null).length;

    return spots;
  };

  // function returns state with updated spots available
  const updateSpots = (state) => {
    const updatedState = { ...state };
    const updatedDays = [ ...state.days ];
    const updatedDay = { ...state.days.find(day => day.name === state.day) };
    
    const spots = countSpots(state);
    updatedDay.spots = spots;

    const updatedDayIndex = state.days.findIndex((day) => day.name === state.day);
    updatedDays[updatedDayIndex] = updatedDay;

    updatedState.days = updatedDays;

    return updatedState;
  }
  
  // adds appointment to database and updates state with new appointment
  const bookInterview = (id, interview) => { 
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const updatedState = {
      ...state,
      appointments
    };

    const updatedStateSpots = updateSpots(updatedState)
        
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then((response) => {
      setState((prev) => ({
        ...updatedStateSpots
      }));
    })          
  };

  // removes appointment from database and updates state to remove interview
  const cancelInterview = (id) => {
    console.log("id", id)

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const updatedState = {
      ...state,
      appointments
    };

    const updatedStateSpots = updateSpots(updatedState)
    
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then((response) => {
      setState(prev => ({
        ...updatedStateSpots
      }))
    });
  };

  const editInterview = (id, interview) => {
    console.log("id", id, "interview", interview)
  };


  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    })}
    ,[]);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    editInterview
  };
};

export default useApplicationData;