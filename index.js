// index.js
// where your node app starts

// init project
const express = require("express");
const moment = require("moment");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use(express.json());
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
    res.json({ greeting: "hello API" });
});
function toTimestamp(strDate) {
    return Date.parse(strDate);
}

app.get("/api", function (req, res) {
    const now = new Date();
    res.json({
        unix: now.valueOf(),
        utc: now.toUTCString(),
    });
});

app.get("/api/:date", function (req, res) {
    let dateString = req.params.date;

    //A 4 digit number is a valid ISO-8601 for the beginning of that year
    //5 digits or more must be a unix time, until we reach a year 10,000 problem

    if (/\d{5,}/.test(dateString)) {
        let dateInt = parseInt(dateString);
        //Date regards numbers as unix timestamps, strings are processed differently
        res.json({
            unix: dateString,
            utc: new Date(dateInt).toUTCString(),
        });
    } else {
        let dateObject = new Date(dateString);

        if (dateObject.toString() === "Invalid Date") {
            res.json({ error: "Invalid Date" });
        } else {
            res.json({
                unix: dateObject.valueOf(),
                utc: dateObject.toUTCString(),
            });
        }
    }
});

// listen for requests :)
const PORT = process.env.PORT || 3000;
const listener = app.listen(PORT, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
