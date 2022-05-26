import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

// renders form component
const Form = (props) => {

  // state for student, interviewer, error
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // checks if student or interviewer are blank and returns appropriate error
  const validate = () => {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }

    // remove error and save new appointment
    setError("");
    props.onSave(student, interviewer);
  };

  // reset student/interviewer state
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  // returns back so user can add or edit again
  const cancel = () => {
    reset();
    props.onCancel();
  };

  // form component
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          value={interviewer}
          interviewers={props.interviewers}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>
  );
};

export default Form;