import React, { useEffect, useRef, useState } from "react";
import { fromEvent } from "rxjs";
import { map, bufferCount, filter } from "rxjs/operators";

import Btn from './components/btn/btn';
import Time from './components/time/time';
import {initTime, startTimer, click, timer$, timeValue, timerSubscr$, waitTimer}  from './store/stopwatch';

import './App.css';

function App() {
  const start = useRef(null);
  const wait = useRef(null);
  const reset = useRef(null);
  
  const [, setTimerState] = useState(initTime.val);
  const [isRunning, setIsRunningState] = useState(false);
  const [stopTime, setStopTime] = useState(0);

  useEffect(() => {
    fromEvent(start.current, 'click')
    .subscribe(() => {
      isRunning ? stopEvent() : startEvent()
    });

    fromEvent(wait.current, 'click').pipe(
      map(() => new Date().getTime()),
      bufferCount(click.count, 1),
      filter((timestamps) => {
        return timestamps[0] > new Date().getTime() - click.timespan;
      })
    )
    .subscribe(() => {
      waitTimer(timer$.value, setIsRunningState, setStopTime)
    })
    fromEvent(reset.current, 'click')
    .subscribe(() => {
      waitTimer(initTime, setIsRunningState, setStopTime)
      startTimer(setTimerState, setIsRunningState, initTime)
    })
  });

  const startEvent= () => {
    timerSubscr$.unsubscribe();
    startTimer(setTimerState, setIsRunningState, stopTime)
  };

  const stopEvent= () => {
    waitTimer(initTime, setIsRunningState, setStopTime)
  }
  return (
    <>
      <Time id="time" value={timeValue.getTimeValue}/>
      <div className="btn-group">
        <Btn id={`${isRunning?'stop':'start'}`} rf={start}/>
        <Btn id="wait" rf={wait}/>
        <Btn id="reset" rf={reset}/>
      </div>
    </>
  );
}

export default App;
