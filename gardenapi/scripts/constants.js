const URL_PLACES = 'https://radio.garden/api/ara/content/places';
const URL_PLACE = 'https://radio.garden/api/ara/content/page/';
const URL_MP3 = 'http://radio.garden/api/ara/content/listen/';
const URL_PARAM = 'listening-from-radio-garden';
const PLACE_EMPTY =  {
    id: 'ERROR',
    name: 'ERROR',
    slug: 'ERROR',
    website: 'ERROR',
    place: { name: 'ERROR', geo: [] },
    functioning: true,
    secure: false,
    country: {
        name: 'ERROR',
        code: 'ERROR'
    },
    mp3: 'ERROR'
};

module.exports = {
    URL_PLACES,
    URL_PLACE,
    URL_MP3,
    URL_PARAM,
    PLACE_EMPTY
};