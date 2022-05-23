import React from "react";
import Header from "./Header"
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  
  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  //console.log("props",props)

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    }
    
    transition(SAVING)

    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);

    });

  };
    
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && <Form onSave={save} interviewers={props.interviewers} onCancel={() => back(EMPTY)}/>}
      {mode === SAVING && <Status />}
    </article>
  );
}

export default Appointment;