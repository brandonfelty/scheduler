export function getAppointmentsForDay(state, day) {
  
  // returns array of appointments for the day
  const results =[];

  const filteredDayArr = state.days.filter(dayObj => dayObj.name === day)

  if (!filteredDayArr[0]) {
    return [];
  }

  const appointmentsArray = [...filteredDayArr[0].appointments];
  
  appointmentsArray.map((item) => results.push(state.appointments[item]))

  return results;
}

export function getInterview(state, interview) {
  // return new object with interview data 
  let results = {};
  
  if (!interview) {
    return null;
  }
  
  results = {...interview,
    interviewer: state.interviewers[interview.interviewer]}

  return results;
}