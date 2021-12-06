const express = require("express");
const ejs = require("ejs");
const path = require("path");
const getJSON = require('get-json')
const app = express();
const fetch = require('node-fetch');
const URL_PLACES = 'https://radio.garden/api/ara/content/places';
const URL_PAGE = 'https://radio.garden/api/ara/content/page/';
const URL_CHANNEL = 'https://radio.garden/api/ara/content/channel/'
const URL_MP3 = 'http://radio.garden/api/ara/content/listen/';
const URL_PARAM = 'listening-from-radio-garden';

port = 80

app.engine('ejs', require('ejs').__express)
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async(req, res) => {
    res.render("index");
});


// Returns un-proxied radio stream url from radio.garden API.
app.get("/api/stream", async(req, res) =>  {
    try {
        var streamList = require('./gardenapi/results/radio.garden.mp3s.json')
        res.json(streamList)
    } catch (e) {
        res.json({ "error": "not found" })
    }
})

// Returns all places as JSON format. Map will plot dots from these data.
app.get("/api/places", async(req, res) =>  {
    try {
        await getJSON(URL_PLACES, async function(error, result) {
            placesList = result.data.list
            res.json(placesList)
        })
    } catch (e) {
        res.json({ "error": "not found" })
    }
})

// ID is place id. When call this API it will return all channels inside the selected place as JSON format.
app.get("/api/channels/:id", async(req, res) => {
    try {
        var id = req.params.id
        await getJSON(URL_PAGE + id, async function(error, result) {
            var channels = result.data
            res.json(channels)
        })
    } catch (e) {
        res.json({ "error": "not found" })
    }
})


// Resolving proxied URL to turn un-proxied real radio stream url.
const removeUrlParam = async(url, param) => {
    const urlObj = await new URL(url);
    await urlObj.searchParams.delete(param);

    return urlObj.toString();
};


// Gives radio name and un-proxied radio stream URL as JSON format.
app.get("/api/channel/:id", async(req, res) => {
    var id = req.params.id
    const controller = new AbortController();
    var url = URL_MP3 + id + '/channel.mp3'
    try {
        await fetch(url, { signal: controller.signal }).then(async resp => {
            if (!resp.ok) {
                mp3 = null;
                var stream = { 'mp3': mp3, 'id': id }
                res.json(stream)
            }
            mp3 = await removeUrlParam(resp.url, URL_PARAM);
            controller.abort();
            var stream = { 'mp3': mp3, 'id': id }
            res.json(stream)
        }).catch(err => {
            mp3 = null;
            var stream = { 'mp3': mp3, 'id': id }
            res.json(stream)
        });
    } catch (e) {
        res.json({ 'mp3': null, 'id': id })
    }
})

app.listen(port, () => {
    console.log(`Raddyo app listening at http://localhost:${port}`)
})