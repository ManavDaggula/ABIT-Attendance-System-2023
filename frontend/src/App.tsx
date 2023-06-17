import './App.css';
import Register from "./Attendee/Register";
import Header from './Header/Header';
import CodeGeneration from './Attendee/CodeGeneration';
import SuccesfullAttendance from './Attendee/SuccesfullAttendance';
import CheckCode from './Volunteer/CheckCode';
import VerifyAttendee from './Volunteer/VerifyAttendee';
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import { useState } from 'react';

function App() {
  const [code,setCode] = useState('');
  const [attendee,setDetails] = useState({name:'',department:'',event:'',roll:'',year:''})
  function changeCode(code:string){
    setCode(code);
  }
  function shareDetails(details:any){
    setDetails(details);
  }
  return (
    // <>
    // <Header></Header> 
    <RouterProvider router={createBrowserRouter([
      {
        path:'/',
        element:<>{code?<CodeGeneration uname={attendee.name} dept={attendee.department} event={attendee.event} roll={attendee.roll} year={attendee.year} code={code}></CodeGeneration>:<Register showCode={changeCode} shareDetails={shareDetails}></Register>}</>
      },
      {
        path:'/admin',
        // element:<div className='main'><CheckCode></CheckCode></div>
        element:<VerifyAttendee></VerifyAttendee>
      }
    ])}></RouterProvider>
    // </>
    
    // Client Registration Page
    // <>
    //   <Header></Header>
    //   {code?<CodeGeneration uname={attendee.name} dept={attendee.department} event={attendee.event} roll={attendee.roll} year={attendee.year} code={code}></CodeGeneration>:<Register showCode={changeCode} shareDetails={shareDetails}></Register>}
    // </>
    // Client Code Generation Page
    // <>
    // <Header></Header>
    // <CodeGeneration uname='Manav' year="T.E." dept='I.T.' roll='606' event="eventNameHere"></CodeGeneration>
    // </>
    // Client succesfull attendance recorded page
    // <>
    //   <Header></Header>
    //   <SuccesfullAttendance attendeeName='Manav' eventName='someEvent'></SuccesfullAttendance>
    // </>
    // Volunteer checks code
    // <>
    //   <Header></Header>
    //   <div className='main'><CheckCode></CheckCode></div>
    // </>
    // Volunteer verifies attendee
    // <>
    //   <Header></Header>
    //   <VerifyAttendee></VerifyAttendee>
    // </>
  );
}

export default App;
