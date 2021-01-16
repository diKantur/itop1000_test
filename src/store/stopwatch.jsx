// import React, {useState} from "react";
import { timer, BehaviorSubject, Subscription } from "rxjs";
import { map } from "rxjs/operators";

export const initTime = 0;

export const timer$ = new BehaviorSubject(initTime);
export let timerSubscr$ = new Subscription()

export const click = {
  count: 2, 
  timespan: 300
};

export const timeValue = {
  hours: '00',
  minutes: '00',
  seconds: '00',
  set setTimeValue (sec = 0) { 
    this.hours = this.convertToNumberString(Math.floor(sec / 3600));
    this.minutes = this.convertToNumberString(Math.floor((sec % 3600) / 60));
    this.seconds = this.convertToNumberString(sec % 60);
  },
  get getTimeValue () {
    return `${this.hours}\u00A0h ${this.minutes}\u00A0m ${this.seconds}\u00A0s`
  },
  convertToNumberString: (v) => {
  return `${v < 10 ? "0" + v : v}`;
}
}

export const startTimer = (timerState, runningState, stopTime) => {
timerSubscr$ = timer(0, 1000)
.pipe(
  map((v) => v + stopTime),
  map((v) => add( v,
    timeValue.setTimeValue = v,
    runningState(true),
  )),
  map((v) => add(v, timerState(v)))
  )
  .subscribe(timer$);
}

export const waitTimer = (time, runningState, stopState) => {
  stopState(time);
  timerSubscr$.unsubscribe();
  runningState(false)
}

const add = (v, ...func)=>{
  func.map(f=>f)
  return v
}