function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var radioList = []

function radioSet(radios) {
    radioList = radios
}

var map = {}

function setMap(mapp) {
    map = mapp
}

mapboxgl.setRTLTextPlugin("https://cdn.maptiler.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js");
$.ajax({
    url: "https:/radio.garden/api/geo",
    dataType: "json",
    success: function(data) {
        var geo = [data.latitude, data.longitude]
        var map = new mapboxgl.Map({
            container: "map",
            style: 'https://api.maptiler.com/maps/42881ad7-eb34-4369-aad1-166fa3d348f3/style.json?key=tZMlb0zrjdlBAH5xMniY',
            center: [geo[1], geo[0]],
            zoom: 6,
        });
        map.addControl(new mapboxgl.NavigationControl());
        $.ajax({
            url: "/api/places",
            dataType: "json",
            success: function(data) {
                var dots = [];
                data.forEach(function(place) {
                    detail = {
                        type: "Feature",
                        size: parseInt(place.size),
                        properties: {
                            id: place.id,
                            title: place.title,
                            country: place.country,
                            coordinates: [place.geo[0], place.geo[1]],
                            size: place.size
                        },
                        geometry: {
                            type: "Point",
                            coordinates: [place.geo[0], place.geo[1]],
                        },
                    };
                    dots.push(detail);
                });
                radioSet(dots)
                map.on("load", async() => {
                    await map.addSource("points", {
                        type: "geojson",
                        data: {
                            type: "FeatureCollection",
                            features: dots,
                        },
                    });
                    await map.addLayer({
                        id: "circles0",
                        type: "circle",
                        source: "points",
                        paint: {
                            "circle-color": "#00ffe1",
                            "circle-radius": {
                                'base': 3,
                                'stops': [
                                    [0, 3],
                                    [10, 3 + ((3 * 4) / 10)],
                                    [15, 3 + ((3 * 5) / 10)],
                                    [20, 3 + ((3 * 6) / 10)],
                                    [30, 3 + ((3 * 7) / 10)],
                                    [50, 3 + ((3 * 8) / 10)]
                                ]
                            }
                        },
                        'filter': ['all', ['<', ['get', 'size'], 3],
                            ['>', ['get', 'size'], -1]
                        ]
                    });
                    await map.addLayer({
                        id: "circles1",
                        type: "circle",
                        source: "points",
                        paint: {
                            "circle-color": "#00ffe1",
                            "circle-radius": {
                                'base': 3.2,
                                'stops': [
                                    [0, 3.2],
                                    [10, 3.2 + ((3.2 * 4) / 10)],
                                    [15, 3.2 + ((3.2 * 5) / 10)],
                                    [20, 3.2 + ((3.2 * 6) / 10)],
                                    [30, 3.2 + ((3.2 * 7) / 10)],
                                    [50, 3.2 + ((3.2 * 8) / 10)]
                                ]
                            }
                        },
                        'filter': ['all', ['<', ['get', 'size'], 6],
                            ['>', ['get', 'size'], 2]
                        ]
                    });
                    await map.addLayer({
                        id: "circles2",
                        type: "circle",
                        source: "points",
                        paint: {
                            "circle-color": "#00ffe1",
                            "circle-radius": {
                                'base': 3.5,
                                'stops': [
                                    [0, 3.5],
                                    [10, 3.5 + ((3.5 * 4) / 10)],
                                    [15, 3.5 + ((3.5 * 5) / 10)],
                                    [20, 3.5 + ((3.5 * 6) / 10)],
                                    [30, 3.5 + ((3.5 * 7) / 10)],
                                    [50, 3.5 + ((3.5 * 8) / 10)]
                                ]
                            }
                        },
                        'filter': ['all', ['<', ['get', 'size'], 10],
                            ['>', ['get', 'size'], 5]
                        ]
                    });
                    await map.addLayer({
                        id: "circles3",
                        type: "circle",
                        source: "points",
                        paint: {
                            "circle-color": "#00ffe1",
                            "circle-radius": {
                                'base': 3.7,
                                'stops': [
                                    [0, 3.7],
                                    [10, 3.7 + ((3.7 * 4) / 10)],
                                    [15, 3.7 + ((3.7 * 5) / 10)],
                                    [20, 3.7 + ((3.7 * 6) / 10)],
                                    [30, 3.7 + ((3.7 * 7) / 10)],
                                    [50, 3.7 + ((3.7 * 8) / 10)]
                                ]
                            }
                        },
                        'filter': ['all', ['<', ['get', 'size'], 20],
                            ['>', ['get', 'size'], 9]
                        ]
                    });
                    await map.addLayer({
                        id: "circles4",
                        type: "circle",
                        source: "points",
                        paint: {
                            "circle-color": "#00ffe1",
                            "circle-radius": {
                                'base': 4,
                                'stops': [
                                    [0, 4],
                                    [10, 4 + ((4 * 4) / 10)],
                                    [15, 4 + ((4 * 5) / 10)],
                                    [20, 4 + ((4 * 6) / 10)],
                                    [30, 4 + ((4 * 7) / 10)],
                                    [50, 4 + ((4 * 8) / 10)]
                                ]
                            }
                        },
                        'filter': ['all', ['<', ['get', 'size'], 25],
                            ['>', ['get', 'size'], 19]
                        ]
                    });
                    await map.addLayer({
                        id: "circles5",
                        type: "circle",
                        source: "points",
                        paint: {
                            "circle-color": "#00ffe1",
                            "circle-radius": {
                                'base': 4.5,
                                'stops': [
                                    [0, 4.5],
                                    [10, 4.5 + ((4.5 * 4) / 10)],
                                    [15, 4.5 + ((4.5 * 5) / 10)],
                                    [20, 4.5 + ((4.5 * 6) / 10)],
                                    [30, 4.5 + ((4.5 * 7) / 10)],
                                    [50, 4.5 + ((4.5 * 8) / 10)]
                                ]
                            }
                        },
                        'filter': ['all', ['<', ['get', 'size'], 50],
                            ['>', ['get', 'size'], 24]
                        ]
                    });
                    await map.addLayer({
                        id: "circles6",
                        type: "circle",
                        source: "points",
                        paint: {
                            "circle-color": "#00ffe1",
                            "circle-radius": {
                                'base': 5,
                                'stops': [
                                    [0, 5],
                                    [10, 5 + ((5 * 4) / 10)],
                                    [15, 5 + ((5 * 5) / 10)],
                                    [20, 5 + ((5 * 6) / 10)],
                                    [30, 5 + ((5 * 7) / 10)],
                                    [50, 5 + ((5 * 8) / 10)]
                                ]
                            }
                        },
                        'filter': ['>', ['get', 'size'], 49]
                    });

                    await setMap(map)

                    await map.on('mousemove', (e) => {
                        const features = map.queryRenderedFeatures(e.point);
                        const displayProperties = [
                            'properties'
                        ];

                        const displayFeatures = features.map((feat) => {
                            const displayFeat = {};
                            displayProperties.forEach((prop) => {
                                displayFeat[prop] = feat[prop];
                            });
                            return displayFeat;
                        });

                        // Write object as string with an indent of two spaces.
                        if (displayFeatures.length > 0) {
                            map.getCanvas().style.cursor = "pointer";
                        } else {
                            map.getCanvas().style.cursor = "crosshair";
                        }
                    });

                    await map.on("click", (e) => {
                        const features = map.queryRenderedFeatures(e.point);
                        const displayProperties = [
                            'properties'
                        ];

                        const displayFeatures = features.map((feat) => {
                            const displayFeat = {};
                            displayProperties.forEach((prop) => {
                                displayFeat[prop] = feat[prop];
                            });
                            return displayFeat;
                        });
                        if (displayFeatures.length > 0) {
                            e = displayFeatures[0]
                            placeEmit(e.properties.id)
                            map.easeTo({
                                center: JSON.parse(e.properties.coordinates),
                                zoom: 7.5,
                                duration: 2000,
                            });
                        }
                    });
                });
            }
        })
    }
});

function gotomappoint(geo) {
    map.easeTo({
        center: [geo[0], geo[1]],
        zoom: 7.5,
        duration: 2000,
    });
}

function randomString(length) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

function placefrommenu(placeId) {
    radiosi = radioList.filter(radio => radio.properties.id == placeId)
    gotomappoint(radiosi[0].geometry.coordinates)
    placeEmit(placeId)
}

async function placeEmit(placeId) {
    $.ajax({
        url: "/api/channels/" + placeId,
        dataType: "json",
        success: function(data) {
            var exRadiosin = document.querySelectorAll(".removable");
            exRadiosin.forEach(async function(element) {
                await element.remove()
            })
            var panelhtml = `<div class="counter d-flex removable"><div class="col"><strong class="number">${data.count}</strong><span class="number-label"> in <strong>${data.title}</strong></span></div></div>`
            var d0 = document.getElementById('innerprofile');
            d0.insertAdjacentHTML('beforebegin', panelhtml)
            data.content.forEach(function(radio) {
                let newDivId = randomString(6)
                if (radio.itemsType == "channel") {
                    var channellisthtml = `<div class="bio pre-scrollable removable"><h5 class="card-title">${radio.title} <span class="badge badge-pill badge-success">${radio.items.length}</span></h5><div class="list-group" id="${newDivId}"></div></div>`
                    var d1 = document.getElementById('innerstations');
                    d1.insertAdjacentHTML('afterbegin', channellisthtml)
                    radio.items.forEach(function(data) {
                        try {
                            var d2 = document.getElementById(newDivId);
                            var id = JSON.stringify(data.href).split("/").at(-1);
                            id = id.replace('"', '')
                            var addChannel = `<a href="#" onclick="radioEmit('` + id + `', '` + data.title + `'); return false;" class="list-group-item list-group-item-action border-right-0  border-left-0 removable">` + data.title + '</a>'
                            d2.insertAdjacentHTML('afterbegin', addChannel)
                        } catch (e) {
                            //console.log('1', data.title, data, e)
                        }
                    })
                } else {
                    var channellisthtml = `<div class="bio pre-scrollable removable"><h5 class="card-title">${radio.title} <span class="badge badge-pill badge-success">${radio.items.length}</span></h5><div class="list-group" id="${newDivId}"></div></div>`
                    var d1 = document.getElementById('innerplaces');
                    d1.insertAdjacentHTML('afterbegin', channellisthtml)
                    radio.items.forEach(function(data) {
                        try {
                            var d2 = document.getElementById(newDivId);
                            var id = JSON.stringify(data.page.url).split("/").at(-1);
                            id = id.replace('"', '')
                            var addChannel = `<a href="#" onclick="placefrommenu('` + id + `'); return false;" class="list-group-item list-group-item-action border-right-0  border-left-0 removable">` + data.title + '</a>'
                            d2.insertAdjacentHTML('afterbegin', addChannel)
                        } catch (e) {
                            //console.log('2', data.title, data, e)
                        }
                    })
                }
            })
        }
    })
}