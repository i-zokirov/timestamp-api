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
    var datum = Date.parse(strDate);
    return datum / 1000;
}

app.get("/api/:date", function (req, res) {
    const { date: datestring } = req.params;

    const date = new Date(datestring);

    if (!moment(datestring).isValid()) {
        res.json({ error: "Invalid Date" });
    } else {
        res.json({ utc: moment(datestring).utc(), unix: toTimestamp(date) });
    }
});

// listen for requests :)
const PORT = process.env.PORT || 3000;
const listener = app.listen(PORT, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
