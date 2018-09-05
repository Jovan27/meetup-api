const express = require("express");
const request = require("request");

//  CONFIG ---------------------------------------------------------------------------------

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

//  VARIABLES ---------------------------------------------------------------------------------

const apiUrl = "https://api.meetup.com/find/upcoming_events?photo-host=secure&page=20&sig_id=262527317&fields=featured_photo&sig=3cc09ebc7e623d8f6f0ebf0f86c31b19c6086bee";
let upcomingEvents;

//  ROUTES ---------------------------------------------------------------------------------

app.get("/", (req, res) => {
    request(apiUrl, (error, response, body) => {
        if(!error && response.statusCode == 200){
            upcomingEvents = JSON.parse(body);
            res.render("home", {events: upcomingEvents.events});
        } else {
            console.log(error);
        }
    });
});

app.get("/event/:index", (req, res) => {
    let eventIndex = req.params.index;
    if(upcomingEvents.events[eventIndex]){
        res.render("event", {event: upcomingEvents.events[eventIndex]});
    } else {
        res.status(404).send("404 page not found");
    }
});

app.get("/*", (req, res) => {
    res.status(404).send("404 page not found");
});

//  LISTEN ---------------------------------------------------------------------------------

app.listen("3005", () => { console.log("Server is running!")});