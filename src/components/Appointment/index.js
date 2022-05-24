import React from "react";
import Header from "./Header"
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
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
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  
  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  //console.log("props",props)

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    }
    
    transition(SAVING);

    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    })
    .catch((error) => {
      transition(ERROR_SAVE, true);
    });

  };

  const confirm = () => {
    transition(CONFIRMING)
  };

  const remove = () => {
    transition(DELETING, true)
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY)
    })
    .catch((error) => {
      transition(ERROR_DELETE, true);
    });
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
      {mode === ERROR_SAVE && 
      <Error
        message={"Could not save appointment."}
        onClose={() => back(EMPTY)}
      />}
      {mode === ERROR_DELETE && 
      <Error 
        message="Could not delete appointment."
        onClose={() => back(EMPTY)}
      />} 
      
    </article>
  );
}

export default Appointment;