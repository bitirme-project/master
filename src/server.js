const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Body parser use JSON data
app.use(bodyParser.urlencoded({
  extended: true
}));

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'getat'
});

connection.connect((err) => {
  if (!err)
    console.log('DB connection succeded')
  else
    console.log('DB connection Error')
});

var body = null
app.get('/getData', function (request, response) {
  response.send(body)
});

app.post('/setData', function (request, response) {
  body = null
  body = request.body
  console.log(body);
});

var Result = null
app.post('/setResult', function (request, response) {
  Result = request.body;
  console.log(Result);
  body = '';
  response.send('success')
});

app.get('/getResult', function (request, response) {
  console.log("Data getlendi")
  console.log(Result);
  response.send(Result)
});

app.get('/patient', function (request, response) {
  connection.query('SELECT * FROM patient ORDER BY id DESC', (error, rows, fields) => {
    if (!error) {
      response.send(rows);
    } else {
      console.log(error);
    }
  });
});

app.get('/patient/:id', function (request, response) {
  let id = request.params.id;
  connection.query('SELECT * FROM patient WHERE id=?', [id], (error, rows, fields) => {
    if (!error) {
      response.send(rows[0]);
    } else {
      console.log(error);
    }
  });
});

app.get('/allergy', function (request, response) {
  connection.query('SELECT * FROM allergy', (error, rows, fields) => {
    if (!error) {
      response.send(rows);
    } else {
      console.log(error);
    }
  });
});

app.get('/allergy/:id', function (request, response) {
  let id = request.params.id;
  connection.query('SELECT allergy.id , allergy.name FROM allergy INNER JOIN allergypatient as alep ON allergy.id=alep.allergyid WHERE alep.patientid=? ', [id], (error, rows, fields) => {
    if (!error) {
      response.send(rows);
    } else {
      console.log(error);
    }
  });
});

app.get('/medicines', function (request, response) {
  connection.query('SELECT * FROM Medicines', (error, rows, fields) => {
    if (!error) {
      response.send(rows);
    } else {
      console.log(error);
    }
  });
});

app.get('/medicines/:id', function (request, response) {
  let id = request.params.id;
  connection.query('SELECT med.id,med.name FROM Medicines AS med INNER JOIN medicinespatient as medp ON medp.medicineid=med.id WHERE medp.patientid=? ', [id], (error, rows, fields) => {
    if (!error) {
      response.send(rows);
    } else {
      console.log(error);
    }
  });
});

app.get('/disseases', function (request, response) {
  connection.query('SELECT * FROM diseases', (error, rows, fields) => {
    if (!error) {
      response.send(rows);
    } else {
      console.log(error);
    }
  });
});

app.get('/disseases/:id', function (request, response) {
  let id = request.params.id;
  connection.query(' SELECT dis.id,dis.name FROM diseases as dis INNER JOIN diseasespatient as disp ON dis.id=disp.diseasesid WHERE disp.patientid= ? ', [id], (error, rows, fields) => {
    if (!error) {
      response.send(rows);
    } else {
      console.log(error);
    }
  });
});

app.get('/sessions', function (request, response) {
  connection.query('SELECT * FROM sessions', (error, rows, fields) => {
    if (!error) {
      response.send(rows);
    } else {
      console.log(error);
    }
  });
});
//GET WİTH PATİENTİD
app.get('/sessions/:id', function (request, response) {
  let id = request.params.id;
  connection.query('SELECT * FROM sessions WHERE sessions.patientid=?', [id], (error, rows, fields) => {
    if (!error) {
      response.send(rows);
    } else {
      console.log(error);
    }
  });
});


app.get('/session/:id', function (request, response) {
  let id = request.params.id;
  connection.query('SELECT session.sessionid , treatments.name , treatments.treatment FROM `session` INNER JOIN treatments ON treatments.id=session.treatmentid WHERE session.sessionid=?', [id], (error, rows, fields) => {
    if (!error) {
      response.send(rows);
    } else {
      console.log(error);
    }
  });
});


app.get('/treatments', function (request, response) {
  connection.query('SELECT * FROM treatments', (error, rows, fields) => {
    if (!error) {
      response.send(rows);
    } else {
      console.log(error);
    }
  });
});

app.delete('/diseases/:id', function (request, response) {
  let id = request.params.id;
  connection.query('DELETE FROM diseasespatient WHERE patientid = ?', [id], (error, rows, fields) => {
    if (!error) {
      response.send("deleted");
    } else {
      console.log(error);
    }
  });
});

app.delete('/medicines/:id', function (request, response) {
  let id = request.params.id;
  connection.query('DELETE FROM medicinespatient WHERE patientid = ?', [id], (error, rows, fields) => {
    if (!error) {
      response.send("deleted");
    } else {
      console.log(error);
    }
  });
});

app.delete('/allergy/:id', function (request, response) {
  let id = request.params.id;
  connection.query('DELETE FROM allergypatient WHERE patientid = ?', [id], (error, rows, fields) => {
    if (!error) {
      response.send("deleted");
    } else {
      console.log(error);
    }
  });
});

app.get('/callendar', function (request, response) {
  connection.query('SELECT sessions.id,month,RIGHT(year,2) AS year,day,hour,minute,patient.firstName AS firstname,patient.lastName AS lastname,treatments.name as traetname FROM sessions INNER JOIN patient on patient.id=sessions.patientid INNER JOIN session ON sessions.id = session.sessionid INNER JOIN treatments ON treatments.id = treatmentid', (error, rows, fields) => {
    if (!error) {
      response.send(rows);
    } else {
      console.log(error);
    }
  });
}); // SELECT month,RIGHT(year,2) AS year,day,hour,minute,patient.firstName AS firstname,patient.lastName AS lastname FROM sessions INNER JOIN patient on patient.id=sessions.patientid



app.post('/patient', function (request, response) {
  firstName = request.body.firstName
  lastName = request.body.lastName
  tc = request.body.tc
  weight = request.body.weight
  size = request.body.size
  job = request.body.job
  birthdate = request.body.birthdate
  age = request.body.age
  gender = request.body.gender
  phone = request.body.phone
  mail = request.body.mail
  address = request.body.address
  Complaint = request.body.Complaint
  diagnosis = request.body.diagnosis
  patientid = request.body.patientid

  var value = [
    [patientid, firstName, lastName, tc, weight, size, job, birthdate, age, gender, phone, mail, address, Complaint, diagnosis]
  ]
  var sql = "INSERT INTO patient (patientid,firstName,lastName,tc,weight,size,job,birthdate,age,gender,phone,mail,address,Complaint,diagnosis) VALUES ?"
  connection.query(sql, [value], (error, fields) => {
    if (!error) {
      var insertedto = fields.insertId
      console.log(insertedto)
      response.send({ id: insertedto })
    } else {
      console.log(error);
    }
  });
});

app.post('/allergy', function (request, response) {
  name = request.body.name
  descr = ""
  var value = [
    [name,descr]
  ]
  var sql = "INSERT INTO allergy (name,descr) VALUES ?"
  connection.query(sql, [value], (error, fields) => {
    if (!error) {
      var obj = { id: fields.insertId, name: request.body.name }
      console.log(obj)
      response.send(JSON.stringify(obj));
    } else {
      console.log(error);
    }
  });
});

app.post('/medicines', function (request, response) {
  name = request.body.name
  descr = ""
  var value = [
    [name,descr]
  ]
  var sql = "INSERT INTO Medicines (name,descr) VALUES ?"
  connection.query(sql, [value], (error, fields) => {
    if (!error) {
      var obj = { id: fields.insertId, name: request.body.name }
      console.log(obj)
      response.send(JSON.stringify(obj));
    } else {
      console.log(error);
    }
  });
});

app.post('/diseases', function (request, response) {
  name = request.body.name
  descr = ""
  var value = [
    [name,descr]
  ]
  var sql = "INSERT INTO diseases (name,descr) VALUES ?"
  connection.query(sql, [value], (error, fields) => {
    if (!error) {
      var obj = { id: fields.insertId, name: request.body.name }
      console.log(obj)
      response.send(JSON.stringify(obj));
    } else {
      console.log(error);
    }
  });
});


app.post('/allergypatient', function (request, response) {
  allergyid = request.body.allergyid
  patientid = request.body.patientid
  var value = [
    [allergyid, patientid]
  ]
  var sql = "INSERT INTO allergypatient (allergyid,patientid) VALUES ?"
  connection.query(sql, [value], (error, fields) => {
    if (!error) {
      response.send("Added new allergy-patient");
    } else {
      console.log(error);
    }
  });
});

app.post('/diseasespatient', function (request, response) {
  diseasesid = request.body.diseasesid
  patientid = request.body.patientid
  var value = [
    [diseasesid, patientid]
  ]
  var sql = "INSERT INTO diseasespatient (diseasesid,patientid) VALUES ?"
  connection.query(sql, [value], (error, fields) => {
    if (!error) {
      response.send("Added new diseases-patient");
    } else {
      console.log(error);
    }
  });
});

app.post('/medicinespatient', function (request, response) {
  medicineid = request.body.medicineid
  patientid = request.body.patientid
  var value = [
    [medicineid, patientid]
  ]
  var sql = "INSERT INTO medicinespatient (medicineid,patientid) VALUES ?"
  connection.query(sql, [value], (error, fields) => {
    if (!error) {
      response.send("Added new medicines-patient");
    } else {
      console.log(error);
    }
  });
});

app.post('/sessions', function (request, response) {
  patientid = request.body.patientid
  date = request.body.date
  year = request.body.year
  month = request.body.month
  day = request.body.day
  hour = request.body.hour
  minute = request.body.minute
  price = request.body.price
  var value = [
    [patientid, date, year, month, day, hour, minute, price]
  ]
  var sql = "INSERT INTO sessions (patientid,date,year,month,day,hour,minute,price) VALUES ?"
  connection.query(sql, [value], (error, fields) => {
    var insertedto = fields.insertId
    if (!error) {
      var insertedto = fields.insertId
      console.log(insertedto)
      response.send({ id: insertedto });
    } else {
      console.log(error);
    }
  });
});

app.post('/session', function (request, response) {
  sessionid = request.body.sessionid
  treatmentid = request.body.treatmentid
  var value = [
    [sessionid, treatmentid]
  ]
  var sql = "INSERT INTO session (sessionid,treatmentid) VALUES ?"
  connection.query(sql, [value], (error, fields) => {
    var insertedto = fields.insertId
    if (!error) {
      var insertedto = fields.insertId
      console.log(insertedto)
      response.send({ id: insertedto });
    } else {
      console.log(error);
    }
  });
});

app.put('/patient/:id', (request, response) => {
  firstName = request.body.firstName
  lastName = request.body.lastName
  tc = request.body.tc
  weight = request.body.weight
  size = request.body.size
  job = request.body.job
  birthdate = request.body.birthdate
  age = request.body.age
  gender = request.body.gender
  phone = request.body.phone
  mail = request.body.mail
  address = request.body.address
  Complaint = request.body.Complaint
  diagnosis = request.body.diagnosis
  patientid = request.body.patientid
  id = request.params.id;
  var value = [
    [firstName, lastName, tc, weight, size, job, birthdate, age, gender, phone, mail, address, Complaint, diagnosis, patientid, id]
  ]
  //(firstName,lastName,tc,weight,job,birthdate,age,gender,phone,mail,address,id) VALUES = ?
  connection.query("UPDATE patient SET firstName=? , lastName=? , tc=? , weight=? ,size=?, job=? , birthdate=? , age=? , gender=? , phone=? , mail=? , address=?,Complaint=?,diagnosis=?,patientid = ? WHERE id = ? ",
    [firstName, lastName, tc, weight, size, job, birthdate, age, gender, phone, mail, address, Complaint, diagnosis, patientid, id]
    , (error, rows, fields) => {
      if (!error) {
        var obj = { id: id, firstName: firstName, lastName: lastName, tc: tc, weight: weight, size: size, job: job, birthdate: birthdate, age: age, gender: gender, phone: phone, mail: mail, address: address, Complaint: Complaint, diagnosis: diagnosis, patientid: patientid, }
        console.log(obj)
        response.send(JSON.stringify(obj));
      } else {
        console.log(error);
      }
    });
});

app.put('/session/:id', (request, response) => {
  patientid = request.body.patientid
  date = request.body.date
  year = request.body.year
  month = request.body.month
  day = request.body.day
  hour = request.body.hour
  minute = request.body.minute
  price = request.body.price
  id = request.params.id;
  var value = [
    [patientid, date, year, month, day, hour, minute, price, id]
  ]
  //(firstName,lastName,tc,weight,job,birthdate,age,gender,phone,mail,address,id) VALUES = ?
  connection.query("UPDATE sessions SET patientid=? , date=? , year=? , month=? ,day=?, hour=? , minute=? , price=? WHERE id = ? ",
    [patientid, date, year, month, day, hour, minute, price, id]
    , (error, rows, fields) => {
      if (!error) {
        var obj = { id: id, patientid: patientid, date: date, year: year, month: month, day: day, hour: hour, minute: minute, price: price }
        console.log(obj)
        response.send(JSON.stringify(obj));
      } else {
        console.log(error);
      }
    });
});



app.listen(3307, function () {
  console.log("İts worked and running on localhost:3307");
})

module.exports = app;