# raddyo
Raddyo.com world map based internet radio project.

1. Install

```shell
#
$npm install -g nodemon
$npm install
```

2. Run
```shell
$npm start
```

3. Description

> Static files (like css, js) is inside in `public/` per folder.
> `<head>` tag imports (css, js etc.) is inside in `views/parts/header.js` as .ejs format.
> Loading map and importing maptiles mapbox and adding dots (layers) is inside in `public/js/map.js`
> All radio functions is inside in `public/js/radio.js`
> All player functions (pause, play, volume etc.) is inside in `public/js/player.js`
> In `public/js/main.js` there is javascript function for sidebar to close and open.
> All javascript files is imported from `views/parts/scripts.ejs`
> Server-side is more like REST API. Comment tags inside `app.js` that you can understand.