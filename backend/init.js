var sqlite3 = require('sqlite3')
var db = new sqlite3.Database('./attendance_record.db')
// db.serialize(()=>{
//     db.run("CREATE TABLE EVENTS (EVENT_NAME VARCHAR, EVENT_DATE DATE);")
//     db.run("INSERT INTO EVENTS VALUES ('WEB DEV BOOTCAMP','12-10-2022')")
// })
db.close()