import React from "react";
import classNames from "classnames";
import 'components/DayListItem.scss';

// returns the correct phrase with spots remaining
const formatSpots = (spots) => {
  if (spots === 0) {
    return 'no spots remaining';
  }
  if (spots === 1) {
    return '1 spot remaining';
  }
  return `${spots} spots remaining`;
};

// shows the day, relevant styling, and spots remaining
export default function DayListItem(props) {
  const dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });
  const spots = formatSpots(props.spots);
  return (
    <li onClick={props.setDay} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spots}</h3>
    </li>
  );
}