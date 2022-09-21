/* Global Variables */


// personal API key for OpenWeatherMap 
// &units=metric to get the temperature in celcius without having to convert it
const apiKey ='41af2706e685db158a0079e47ab66803&units-metric'
const apiBase ='http://api.openweathermap.org/data/2.5/forecast?id=524901&units=metric'


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

// function to get the input values
const generate = () => {
    const zip = document.getElementById("zip").value;
    const url = `${apiBase}&zip=${zip}&appid=${apiKey}`;
    let feelings = document.getElementById("feelings").value;

    if (!zip) feelings = "Please enter a zip code for more accurate results..";
    if (!feelings) feelings = "You didn't say how you're feeling..";

    // fetch the data from the API when calling this function
    getWeatherData(url).then((data) => {
        postData("/projectData", { // destructioning
            date: newDate,
            temp: Math.round(data.list[0].main.temp),
            content: feelings,
        }).then(updatingUI("/projectData"));
        });
    };



//Function to return the web API data
const getWeatherData = async (url) => {
    const res = await fetch(url);
    if (res.status === 404 || res.status === 400) {
        document.getElementById("content").innerHTML =
        "Please write a valid zip code!";
    }
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};


const postData = async (url = "", info = {}) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
    });

    try {
        const newData = await res.json();
        console.log(`You just saved`, newData);
        return newData;
    } catch (error) {
        console.log(`Error:${error}`);
    }
};

  //Function to GET Project Data
  // and updating UI by this data
const updatingUI = async (url) => {
    const request = await fetch(url);
    try {
        const allData = await request.json();
        document.getElementById("date").innerHTML = `Date: ${allData.date}`;
        document.getElementById(
        "temp"
        ).innerHTML = `Temperature in C°: ${allData.temp}`;
        document.getElementById(
        "content"
        ).innerHTML = `Content: ${allData.content}`;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};


const button = document.getElementById("generate");
button.addEventListener("click", generate);