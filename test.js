const getJSON = require('get-json')
const fs = require('fs')
const URL_PLACES = 'https://radio.garden/api/ara/content/places';
const URL_PAGE = 'https://radio.garden/api/ara/content/page/';
const URL_MP3 = 'http://radio.garden/api/ara/content/listen/';
const URL_PARAM = 'listening-from-radio-garden';

var placesList = []

async function writeFile(path, data){
    try {
        await fs.writeFileSync(path,  JSON.stringify(data, null, 2))
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}

async function getPlaceList(){
    await getJSON(URL_PLACES, function(error, result){
        placesList = result.data.list
    })
}

async function getChannelList(){
    placesList.forEach(async function(place){
        await getJSON(URL_PAGE + place.id, async function(error, result){
            result.data.content[0].items
        })
    })
}

async function doPlaces(){
    await getPlaceList()
    var writePlace = await writeFile(process.cwd() + "/public/data/" + "placeList.json", placesList)
    return writePlace;
}

async function start(){
   if (await doPlaces()){
       console.log("Done.")
   }
}

start()