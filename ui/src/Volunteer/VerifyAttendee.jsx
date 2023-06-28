import React, { useState } from 'react'
import CheckCode from './CheckCode'
import "./VerifyAttendee.css"

// interface attendanceDetails{
//   ATTENDEE_NAME: string;
//   EVENT_NAME:string,
//   ROLL:string,
//   DEPT:string,
//   YEAR:string,
//   DIV:string,
//   CODE:string,
//   STATUS:string,
//   TIMESTAMP:string
// }

function VerifyAttendee() {

  const [display,setDisplay] = useState(false)
  const [details,setDetails] = useState({ATTENDEE_NAME:'',EVENT_NAME:'',ROLL:'',DEPT:'',YEAR:'',DIV:'',CODE:'',STATUS:'',TIMESTAMP:''})

  function changeDetails(data){
    setDisplay(true);
    setDetails(data);
  }

  function successfullAttendance(){
    fetch(`http://localhost:8000/changeAttendeeStatus?code=${details.CODE}`)
    .then(data=>data.text())
    .then((data)=>{
      console.log(data)
      if(data==='status changed.'){
        window.alert("Successfully Attendance Noted.")
        setDisplay(false)
      }})
  }
  return (
    <div className='main'>
        <CheckCode setDetails={changeDetails} setDisplay={setDisplay}></CheckCode>
        {display?
        <div className="attendee-details">
            <span>Name</span><span>{details.ATTENDEE_NAME}</span>
            <span>Roll</span><span>{details.ROLL}</span>
            <span>Department</span><span>{details.DEPT}</span>
            <span>Year</span><span>{details.YEAR}</span>
            <span>Event</span><span>{details.EVENT_NAME}</span>
            <button onClick={successfullAttendance}>Confirm</button>
        </div>:<></>}
    </div>
  )
}

export default VerifyAttendee;