import React from 'react';
import "./SuccesfullAttendance.css"

// interface attendeeDetails{
//     attendeeName: string;
//     eventName: string;
// }

function SuccesfullAttendance(props) {
  return (
    <div className='main'>
        <div>Dear {props.attendeeName},</div>
        <div>Thank you for attending our event on {props.eventName}</div>
        <div>You can now leave the premises as per the instructions given by your volunteer.</div>
    </div>
  )
}

export default SuccesfullAttendance;