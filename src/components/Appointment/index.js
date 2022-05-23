import React from "react";
import Header from "./Header"
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRMING = "CONFIRMING";
  const EDIT = "EDIT";
  
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

  const confirm = () => {
    transition(CONFIRMING)
  };

  const remove = () => {
    transition(DELETING)
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY)
    })
  };

  const edit = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    }
    transition(EDIT)
    console.log("props", props)
    props.editInterview(props.id, interview)
  }; 

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}
          onEdit={edit}
        />
      )}
      {mode === CREATE && 
        <Form 
          onSave={save}
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
        />}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === DELETING && <Status message="Deleting"/>}
      {mode === CONFIRMING && 
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={() => back(EMPTY)}
          onConfirm={remove} 
      />}
      {mode === EDIT && 
        <Form 
          onSave={save}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
        />}  
      
    </article>
  );
}

export default Appointment;