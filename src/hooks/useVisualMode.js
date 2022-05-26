import { useState } from "react";

export default function useVisualMode(initial) {

  // sets mode and history to initial
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // transitions the mode state
  function transition(prevMode, replace = false) {
    if (replace) {
      setHistory(prev => ([...prev]));
    } else {
      setHistory(prev => ([...prev, prevMode]));
    }

    setMode(prevMode);
  };

  // sets mode state to the previous one in history
  function back() {
    let historyArr = [...history];
    if (historyArr.length === 1) {
      return setMode(historyArr[0]);
    }
    historyArr.splice(history.length - 1, 1);
    setHistory(historyArr);
    setMode(historyArr[historyArr.length - 1]);
  }

  return { mode, transition, back };
};

