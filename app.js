const express = require("express");
const ejs = require("ejs");
const path = require("path");
const app = express();
port = 3000
app.engine('ejs', require('ejs').__express)
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
    res.render("index");
});

app.get("/api/stream", async (req, res) => {
    var streamList = require('./gardenapi/results/radio.garden.mp3s.json')
    res.json(streamList)
})

app.get("/api/place", async (req, res) => {
    var placeList = require('./gardenapi/results/radio.garden.places.json')
    res.json(placeList)
})

app.listen(port, () => {
    console.log(`Raddyo app listening at http://localhost:${port}`)
})