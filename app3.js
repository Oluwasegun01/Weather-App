const express = require("express");
const bosyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bosyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res){
    const query = req.body.cityName;
    const appKey = "cc9b2fa7c4c902d171f0d71358d0bc76";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appKey + "&units=" + unit + "";
    https.get(url, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const des = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The temperature in " + query + " is " + temp + " Degrees Celsius.</h1>");
            res.write("<p>The weather is " + des + ".</p>");
            res.write("<img src=" + iconUrl + " >");
            res.send();
        });
    });
});




app.listen(3000, function(){
    console.log("Server started at port 3000");
});