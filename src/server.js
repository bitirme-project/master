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
  password: '',
  database: 'bitirme2'
});

connection.connect((err) => {
  if (!err)
    console.log('DB connection succeded')
  else
    console.log('DB connection Error')
});

app.get('/patients', function (request, response) {
  connection.query('SELECT * FROM patient', (error, rows, fields) => {
    if (!error) {
      response.send(rows);
    } else {
      console.log(error);
    }
  });
});

app.get('/patient/:id', function (request, response) {
  let id = request.params.id;
  connection.query('SELECT * FROM patient WHERE id=?',[id],(error, rows, fields) => {
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
  connection.query('SELECT allergy.id , allergy.name FROM allergy INNER JOIN allergypatient as alep ON allergy.id=alep.allergyid WHERE alep.patientid=? ',[id], (error, rows, fields) => {
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
  connection.query('SELECT med.id,med.name FROM Medicines AS med INNER JOIN medicinespatient as medp ON medp.medicineid=med.id WHERE medp.patientid=? ',[id], (error, rows, fields) => {
    if (!error) {
      response.send(rows);
    } else {
      console.log(error);
    }
  });
});

app.get('/diseases', function (request, response) {
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
  connection.query(' SELECT dis.id,dis.name FROM diseases as dis INNER JOIN diseasespatient as disp ON dis.id=disp.diseasesid WHERE disp.patientid= ? ',[id], (error, rows, fields) => {
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
  connection.query('SELECT * FROM patient INNER JOIN sessions ON patient.id=sessions.patientid INNER JOIN treatments ON sessions.treatmentid=treatments.id WHERE patient.id=? ',[id], (error, rows, fields) => {
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



app.post('/patient', function (request, response) {
  firstName = request.body.firstName
  lastName = request.body.lastName
  tc = request.body.tc
  weight = request.body.weight
  job = request.body.job
  birthdate = request.body.birthdate
  age = request.body.age
  gender = request.body.gender
  phone = request.body.phone
  mail = request.body.mail
  address = request.body.address
  var value = [
    [firstName,lastName,tc,weight,job,birthdate,age,gender,phone,mail,address]
  ]
  var sql = "INSERT INTO patient (firstName,lastName,tc,weight,job,birthdate,age,gender,phone,mail,address) VALUES ?"
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
  var value = [
    [name]
  ]
  var sql = "INSERT INTO allergy (name) VALUES ?"
  connection.query(sql, [value], (error, fields) => {
    if (!error) {
      response.send("Added new allergy");
    } else {
      console.log(error);
    }
  });
});

app.post('/medicines', function (request, response) {
  name = request.body.name
  var value = [
    [name]
  ]
  var sql = "INSERT INTO Medicines (name) VALUES ?"
  connection.query(sql, [value], (error, fields) => {
    if (!error) {
      response.send("Added new medicines");
    } else {
      console.log(error);
    }
  });
});

app.post('/diseases', function (request, response) {
  name = request.body.name
  var value = [
    [name]
  ]
  var sql = "INSERT INTO diseases (name) VALUES ?"
  connection.query(sql, [value], (error, fields) => {
    if (!error) {
      response.send("Added new medicines");
    } else {
      console.log(error);
    }
  });
});


app.post('/allergypatient', function (request, response) {
  allergyid = request.body.allergyid
  patientid = request.body.patientid
  var value = [
    [allergyid,patientid]
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
    [diseasesid,patientid]
  ]
  var sql = "INSERT INTO diseasespatient (diseasesid,patientid) VALUES ?"
  connection.query(sql, [value], (error, fields) => {
    if (!error) {
      response.send("Added new diseases-patient");
      console.log(result.insertId)
    } else {
      console.log(error);
    }
  });
});

app.post('/medicinespatient', function (request, response) {
  medicinesid = request.body.medicinesid
  patientid = request.body.patientid
  var value = [
    [medicinesid,patientid]
  ]
  var sql = "INSERT INTO medicinespatient (medicinesid,patientid) VALUES ?"
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
  treatmentid	= request.body.treatmentid
  date = request.body.date
  var value = [
    [patientid,treatmentid,date]
  ]
  var sql = "INSERT INTO sessions (patientid,treatmentid,date) VALUES ?"
  connection.query(sql, [value], (error, fields) => {
    if (!error) {
      response.send("Added new sessions");
    } else {
      console.log(error);
    }
  });
});


app.listen(3307, function () {
  console.log("İts worked and running on localhost:3307");
})

module.exports = app;