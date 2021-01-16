import React from 'react';
import "./btn.css";

const Btn = ({id, rf}) => {
  return <button id={id} ref={rf} className={'btn'}>{id}</button>
}

export default Btn;