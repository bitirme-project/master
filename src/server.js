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
  database: 'bitirme'
});

connection.connect((err) => {
  if (!err)
    console.log('DB connection succeded')
  else
    console.log('DB connection Error')
});

app.get('/patient', function (request, response) {
  connection.query('SELECT * FROM patient', (error, rows, fields) => {
    if (!error) {
      response.send(rows);
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

app.get('/sessions', function (request, response) {
  connection.query('SELECT * FROM sessions', (error, rows, fields) => {
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

app.get('/medicines', function (request, response) {
  connection.query('SELECT * FROM Medicines', (error, rows, fields) => {
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
app.post('/patient', function (request, response) {
  let diveinf = request.body
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
  var sql = "INSERT INTO divetable (firstName,lastName,tc,weight,job,birthdate,age,gender,phone,mail,address) VALUES ?"
  connection.query(sql, [value], (error, fields) => {
    if (!error) {
      response.send("Added new patient");
    } else {
      console.log(error);
    }
  });
});


app.listen(3307, function () {
  console.log("İts worked and running on localhost:3307");
})

module.exports = app;