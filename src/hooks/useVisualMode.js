import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  function transition(prevMode, replace = false) {
    if (replace) {
      console.log(replace)
      setHistory(prev => ([...prev]))
    } else {
      setHistory(prev => ([...prev, prevMode]))
    }

    setMode(prevMode)
  }

  function back() {
    let historyArr = [...history];
    if (historyArr.length === 1) {
      return setMode(historyArr[0])
    }
    historyArr.splice(history.length - 1, 1)
    setHistory(historyArr)
    setMode(historyArr[historyArr.length - 1])
  }

  return { mode, transition, back };
}

