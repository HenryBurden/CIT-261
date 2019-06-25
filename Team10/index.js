import {getLocation} from './utilities.js';
import {getQuakes} from './utilities.js';

const baseUrl ='https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-02-02';
let newUrl = baseUrl;
const distance = 100;
let quakes = '';

getLocation().then(location => {
    let long = location.coords.longitude;
    let lat = location.coords.latitude;
    newUrl += `&latitude=${lat}&longitude=${long}&maxradiuskm=${distance}`
    getQuakes(newUrl).then(quake => {
        //console.log(quake);
        genHtml(quake.features);
    });
});

function genHtml(quakes) {
    let html = '';
    quakes.forEach(quake => {
        console.log(quake.properties);
    
    });

}
