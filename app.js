const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


//Connect To Database
mongoose.connect(config.database);

//On Connection
mongoose.connection.on('conneted', () => {
    console.log('Connected to database ' + config.database)
});
//On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err)
});

const app = express();

const users = require('./routes/users');
const systems = require('./routes/systems');

//Port number
const port = 3000;

//CORS Middleware
app.use(cors());

//Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middlware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/systems', systems);

//Index Route
app.get('/', (req, res) => {
    res.send('Invalid Enpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Start Server
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});