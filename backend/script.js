var express = require('express')
var cors = require('cors')
var bodyParser = require("body-parser")
var sqlite3 = require('sqlite3')
var {reg_attendee, generate_unique_code, get_attendee_by_code, confirm_attendance, getEventList} = require('./queries')
var db = new sqlite3.Database('./attendance_record.db')
db.run("PRAGMA foreign_keys=ON;")

app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())

app.get('/getEvents',async (req,res)=>{
    let event_list = await getEventList(db)
    res.send(event_list)
})

app.post('/newAttendee',(req,res)=>{
    // console.log("new request")
    console.log(req.body)
    reg_attendee(req.body.name,req.body.event,req.body.roll,req.body.department,req.body.year,req.body.div,db)
    .then((code)=>{res.send(code)})
    .catch((err)=>{console.log(err);res.sendStatus(400)})
    
})

app.get('/getAttendee', async (req,res)=>{
    // console.log(req.query.code)
    if(req.query.code){
        let attendee = await get_attendee_by_code(req.query.code,db)
        if(attendee){
            res.send(attendee)
        }
        else{
            res.send("No attendee with the given code found.")
        }
        // console.log(attendee)
        // attendee = JSON.stringify(attendee)
    }
    else{
        res.send("Please provide attendee code.")
    }
})

app.get("/changeAttendeeStatus",(req,res)=>{
    if(req.query.code){
        confirm_attendance(req.query.code,db);
        res.send("status changed.")
    }
    else{
        res.sendStatus("Please provide attendee code.")
    }
})

//temporary testing endpoints to test functions

app.get('/newCode',async (req,res)=>{
    let code = await generate_unique_code(db)
    console.log(code)
    res.send(code);
})


app.listen(8000,()=>{
    console.log('app listening on port 8000')
})

// CREATE TABLE "ATTENDANCE_RECORD" (
// 	"ID"	INTEGER,
// 	"ATTENDEE_NAME"	TEXT NOT NULL,
// 	"EVENT_NAME"	TEXT NOT NULL,
// 	"ROLL"	INTEGER NOT NULL,
// 	"DEPT"	TEXT NOT NULL,
// 	"YEAR"	TEXT NOT NULL,
// 	"DIV"	TEXT,
// 	"CODE"	TEXT,
// 	"STATUS"	TEXT NOT NULL,
// 	"TIMESTAMP"	INTEGER NOT NULL,
// 	PRIMARY KEY("ID"),
// 	FOREIGN KEY("EVENT_NAME") REFERENCES "EVENTS"("EVENT_NAME")
// )