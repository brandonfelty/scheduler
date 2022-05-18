import React from "react";
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import "components/Appointment/styles.scss";

const Appointment = (props) => {
  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview && <Show student={props.interview.student} interviewer={props.interview.interviewer} />}
      {!props.interview && <Empty />}
    </article>
  );
}

export default Appointment;