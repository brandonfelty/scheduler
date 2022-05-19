import React from "react";
import DayListItem from "./DayListItem";

const DayList = (props) => {
  const daysArr = props.days;
  const daysList = daysArr.map((day) => {
    return (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.value}
      setDays={() => props.onChange(day.id)}
      />)
    });
  return (
    <ul>{daysList}</ul>
  );
}

export default DayList;