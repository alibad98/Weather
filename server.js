// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();


/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));



const getData = (req, res) => {
    res.send(projectData);
};
// Callback function to complete GET '/all'

app.get("/projectData", getData);

// Callback function to complete POST

const postData = (req, res) => {
    newForecast = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content,
    };
    projectData = newForecast;
    res.status(200).send({
        success: true,
        message: "thanks for visiting :*",
        data: newForecast,
    });
};

app.post("/projectData", postData);

// Setup Server

const port = 8000;
const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)})