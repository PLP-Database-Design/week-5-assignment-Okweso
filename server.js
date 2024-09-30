const express = require('express');
const app = express();
//const PORT = 3300;
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

app.use(express.json());
app.use(cors());
dotenv.config();

//connecting to the database
const db = mysql.createConnection(
    {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
    }
)

db.connect((err) => {
    if (err) return console.log('There was an error connecting to the database');
    console.log('Connection to the database was successful', db.threadId);

    //Question one
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');
    app.get('/patients_endpoint', (req, res) => {
        db.query('SELECT * FROM patients', (err, results) => {
            if (err){
                console.error(err);
                res.status(500).send('Error retrieving data');
            }
            else{
                res.render('patients_endpoint', {results: results});
                //res.json(results);
            }
        })
    })


    //Question Two
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');
    app.get('/providers_endpoint', (req, res) => {
        db.query('SELECT * FROM providers', (err, results) => {
            if (err){
                console.error(err);
                res.status(500).send('Error retrieving data');
            }
            else{
                //res.render('providers_endpoint', {results: results});
                res.json(results);
            }
        })
    })


    //Question Three
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');
    app.get('/patients_by_first_name', (req, res) => {
        db.query('SELECT * FROM patients WHERE first_name = "Gabriel" ', (err, results) => {
            if (err){
                console.error(err);
                res.status(500).send('Error retrieving data');
            }
            else{
                //res.render('patients_by_first_name', {results: results});
                res.json(results);
            }
        })
    })


    //Question Four
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');
    app.get('/providers_by_specialty', (req, res) => {
        db.query('SELECT * FROM providers WHERE provider_specialty = "Pediatrics" ', (err, results) => {
            if (err){
                console.error(err);
                res.status(500).send('Error retrieving data');
            }
            else{
                //res.render('providers_by_specialty', {results: results});
                res.json(results);
            }
        })
    })


   
})

app.listen(process.env.PORT, () => {
    console.log(`server listening on port ${process.env.PORT}`)
    console.log('sending message to browser');
    app.get('/', (req, res) => {
        res.send('server started successfully')
    })
})

