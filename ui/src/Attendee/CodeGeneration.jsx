import React from 'react';
import "./CodeGeneration.css"

// interface userDetails{
//     uname: string;
//     year: string;
//     dept: string;
//     roll: string;
//     event: string;
//     code: string;
// }

export default function CodeGeneration(props) {
  return (
    <div className='main'>
        <div>Hello, {props.uname}</div>
        <div>You have registered for the event : {props.event}</div>
        <div>Your code is: </div>
        <div className="client-code">{props.code}</div>
        <button>Proceed</button>
    </div>
  )
}
