// attendance_record : name, roll, dept, year, div?, event, code, timestamp, volunteer(maybe)
// events : event_name, event_date


// function to fetchData as a Promise
function getData(query,db){
    return new Promise((resolve,reject)=>{
        db.get(query,(err,row)=>{
            if(err){
                reject(err)
            }
            resolve(row)
        })
    })
}
function getAllData(query,db){
    return new Promise((resolve,reject)=>{
        db.all(query,(err,rows)=>{
            if(err){
                reject(err)
            }
            resolve(rows)
        })
    })
}

// one to register an attendee                                  DONE
async function reg_attendee(attendee_name, event_name, roll, dept, year, div, db){
    code = await generate_unique_code(db);
    var query = `INSERT INTO ATTENDANCE_RECORD(ATTENDEE_NAME, EVENT_NAME, ROLL, DEPT, YEAR, DIV, CODE, STATUS) VALUES ('${attendee_name}','${event_name}',${roll},'${dept}','${year}','${div}','${code}','pending');`
    // here status for new registrations is alwats pending
    return new Promise((resolve,reject)=>{
        db.run(query, (err)=>{
            if(err){reject(err)}
            resolve(code)
        });
        
    })
}

// one to get codes of an attendee and then to generate a code  DONE
async function generate_unique_code(db){
    let new_code;
    codes = [];
    var query = "SELECT CODE FROM ATTENDANCE_RECORD;"
    rows = await getAllData(query,db)
    // console.log(rows)
    for (i=0;i<rows.length;i++){ codes.push(rows[i].CODE) };
    // console.log(codes)
    let code_sample_space='ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    do {
        new_code='';
        for (i=0;i<3;i++){
            new_code += code_sample_space.charAt(Math.floor(Math.random()*36))
        }
    } while (new_code in codes);
    // console.log(new_code)
    return new_code;
}


// one to get details of attendee based on code                 DONE
async function get_attendee_by_code(code, db){
    let query = `SELECT * FROM ATTENDANCE_RECORD WHERE CODE='${code}';`
    let result = await getData(query,db)
    // console.log(result)
    return result;
}

// one to change status to confirmed and remove code            DONE
function confirm_attendance(code,db){
    let query = `UPDATE ATTENDANCE_RECORD SET CODE=NULL, STATUS='confirmed' WHERE CODE='${code}';`
    db.run(query,(err)=>{
        console.log(err)
    })
    console.log("done")
}

// one to get a list of Events                                  DONE
async function getEventList(db){
    let query = "SELECT EVENT_NAME FROM EVENTS;"
    let event_list = await getAllData(query,db)
    let new_list = [];
    event_list.forEach(element => new_list.push(element.EVENT_NAME));
    return new_list;
}

module.exports.reg_attendee = reg_attendee;
module.exports.generate_unique_code = generate_unique_code;
module.exports.get_attendee_by_code = get_attendee_by_code;
module.exports.confirm_attendance = confirm_attendance;
module.exports.getEventList = getEventList;