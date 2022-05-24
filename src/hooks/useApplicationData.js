import {useState, useEffect} from "react";
import axios from "axios";

const useApplicationData = () => {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState({...state, day});
  
  const bookInterview = (id, interview) => { 
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
        
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then((response) => {
      setState({
        ...state,
        appointments
      });
    })          
  };

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

    
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then((response) => {
      setState({
        ...state,
        appointments
      })
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