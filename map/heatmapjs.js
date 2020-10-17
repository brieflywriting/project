
import './node_modules/heatmap.js/build/heatmap.js';
import{map}from 'index.js';
const citizens = require('./data/citizensdone.json');;
import HeatmapOverlay from './node_modules/leaflet-heatmap/leaflet-heatmap.js';
const heatdata = new Array(329);
  for(var i=0;i<heatdata.length;i++){
    heatdata[i]={lat:citizens.x[i],lng:citizens.y[i], value:citizens.value[i]};}

// don't forget to include leaflet-heatmap.js
var testData = {
  max: 329,
  min:0,
  data: [heatdata]
};

var cfg = {
  // radius should be small ONLY if scaleRadius is true (or small radius is intended)
  // if scaleRadius is false it will be the constant radius used in pixels
  "radius": 5,
  "maxOpacity": 0.8,
  // scales the radius based on map zoom
  "scaleRadius": true,
  // if set to false the heatmap uses the global maximum for colorization
  // if activated: uses the data maximum within the current map boundaries
  //   (there will always be a red spot with useLocalExtremas true)
  "useLocalExtrema": true,
  // which field name in your data represents the latitude - default "lat"
  "latField": 'lat',
  // which field name in your data represents the longitude - default "lng"
  "lngField": 'lng',
  // which field name in your data represents the data value - default "value"
  "valueField": 'value'
};
console.log(heatdata);

var heatmapLayer = new HeatmapOverlay(cfg);
 
console.log(testData);
console.log(heatmapLayer.setData(testData));
heatmapLayer.setData(testData);
console.log(heatmapLayer);
heatmapLayer.addTo(map);
  
