var sqlite3 = require('sqlite3')
var db = new sqlite3.Database('./attendance_record.db')
db.serialize(()=>{
    db.run("CREATE TABLE EVENTS (EVENT_NAME VARCHAR, EVENT_DATE DATE);")
    db.run("INSERT INTO EVENTS VALUES ('WEB DEV BOOTCAMP','12-10-2022')")
    db.run("CREATE TABLE ATTENDANCE_RECORD ('ATTENDEE_NAME' TEXT NOT NULL, 'EVENT_NAME' TEXT NOT NULL, 'ROLL' INTEGER NOT NULL, 'DEPT'  TEXT NOT NULL, 'YEAR'  TEXT NOT NULL, 'DIV'   TEXT, 'CODE'  TEXT, 'STATUS' TEXT NOT NULL, 'TIMESTAMP' INTEGER NOT NULL DEFAULT (DATETIME('now','localtime')), FOREIGN KEY('EVENT_NAME') REFERENCES 'EVENTS'('EVENT_NAME'), PRIMARY KEY('ATTENDEE_NAME','EVENT_NAME','ROLL','DEPT','YEAR') );")
})
db.close()