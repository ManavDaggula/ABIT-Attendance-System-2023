import React from 'react';
import "./CheckCode.css"

function CheckCode(props:{setDetails:(data:any)=>any, setDisplay:(data:boolean)=>any}) {
  
  function getAttendeeDetails(){
    let code = document.getElementById('getCodeInput') as HTMLInputElement
    if(code.checkValidity()){

      fetch(`http://localhost:8000/getAttendee?code=${code.value}`)
      .then((data)=>data.json())
      .then((data)=>{
        console.log(data)
        props.setDetails(data);
      })
      .catch(err=>{
        window.alert("No attendee with given code found.")
        props.setDisplay(false)
      })
    }
    else{
      window.alert("Specify correct code in proper format.")
      props.setDisplay(false)
    }
  }

  return (
    // <div className='main'>
      <>
        <div>Welcome Volunteer,</div>
        <form action="">
          <label htmlFor="">Enter Attendee code</label>
          <input type="text" id='getCodeInput' pattern='[A-Z0-9]{3}'/>
          <button type="submit" onClick={(e)=>{e.preventDefault();getAttendeeDetails();}}>Check</button>
        </form>
      </>
    // </div>
  )
}

export default CheckCode;