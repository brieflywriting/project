 //#region mainmap
 var DG = require('2gis-maps');

 export const map = DG.map('map', {
   'center': [55.6, 37.5],
   'zoom': 12
 });
 //#endregion
 //#region wms
 var borderlayer = DG.tileLayer.wms("http://localhost:8080/geoserver/moscow/wms", {
   layers: 'moscow:border',
   format: 'image/png',
   transparent: true,

 });
 var dwellingslayer = DG.tileLayer.wms("http://localhost:8080/geoserver/moscow/wms", {
   layers: 'moscow:citizens',
   format: 'image/png',
   transparent: true,

 });
 var poilayer = DG.tileLayer.wms("http://localhost:8080/geoserver/moscow/wms", {
  layers: 'moscow:poi',
  format: 'image/png',
  transparent: true,

});

 map.addLayer(borderlayer);
map.addLayer(poilayer);
map.addLayer(dwellingslayer);
 //#endregion


 //#region bufferdata
 const _poiG = DG.layerGroup();

 const poi = require('./data/poi.json');
 for (var i = 0; i < poi.length; i++) {
   _poiG.addLayer(DG.circle([poi[i].lat, poi[i].lon], 1));
   //_poiG[i].setStyle({fillColor:'#FFFAFA' });
 }
 map.addLayer(_poiG);

 for (var i = 0; i < _poiG.getLayers().length; i++) {
   _poiG.getLayers()[i].setStyle({
     fillOpacity: 0.01,
     opacity: 0.01
   });
 }
 //#endregion

 //#region bufferpaint

 //#region poibp

 //_poiG.getLayers()[i].setStyle()
 document.getElementById("radius").addEventListener("change", function () {

   for (var i = 0; i < _poiG.getLayers().length; i++) {
     _poiG.getLayers()[i].setRadius(document.getElementById("radius").value);
     _poiG.invoke('redraw');
   }
 });
 document.getElementById("opacity").addEventListener("change", function () {
   for (var i = 0; i < _poiG.getLayers().length; i++)
     _poiG.getLayers()[i].setStyle({
       fillOpacity: document.getElementById("opacity").value,
       opacity: document.getElementById("opacity").value
     });
   //_poiG.invoke('redraw')
 });

 document.getElementById("favcolor").addEventListener("change", function () {
   for (var i = 0; i < _poiG.getLayers().length; i++)
     _poiG.getLayers()[i].setStyle({
       fillcolor: document.getElementById("favcolor").value,
       color: document.getElementById("favcolor").value
     });
   //_poiG.invoke('redraw')
 });

 //#endregion

 //#endregion



 import './node_modules/heatmap.js/build/heatmap.js';
 //import{map}from 'index.js';
 const citizens = require('./data/citizensdone.json');;
 import HeatmapOverlay from './node_modules/leaflet-heatmap/leaflet-heatmap.js';
 const heatdata = new Array(330);
 for (var i = 0; i < heatdata.length; i++) {
   heatdata[i] = {
     lat: citizens.y[i],
     lng: citizens.x[i],
     value: citizens.value[i]
   };
 }

DG.then(function() {
  return DG.plugin('https://unpkg.com/leaflet.heat@0.2.0/dist/leaflet-heat.js');
}).then(function () {
   var heatlayer= DG.heatLayer(heatdata,{
      radius : 90, // default value
      blur : 5, // default value
      }); 
      heatlayer.addTo(map);
      document.getElementById("layertoggleheatmap").addEventListener("change", function () {
        if(document.getElementById("layertoggleheatmap").checked==false){
          map.removeLayer(heatlayer);
          heatlayer.redraw();
        }else{
          map.addLayer(heatlayer);
        }
      }); 
});


document.getElementById("layertoggleborder").addEventListener("change", function () {
  if(document.getElementById("layertoggleborder").checked==false){
    map.removeLayer(borderlayer);
    borderlayer.redraw();
  }else{
    map.addLayer(borderlayer);
  }
});
document.getElementById("layertoggledwellings").addEventListener("change", function () {
  if(document.getElementById("layertoggledwellings").checked==false){
    map.removeLayer(dwellingslayer);
    dwellingslayer.redraw();
  }else{
    map.addLayer(dwellingslayer);
  }
});

document.getElementById("layertogglepoi").addEventListener("change", function () {
  if(document.getElementById("layertogglepoi").checked==false){
    map.removeLayer(poilayer);
    poilayer.redraw();
    
  }else{
    map.addLayer(poilayer);
  }
});
document.getElementById("layertogglebuffer").addEventListener("change", function () {
  if(document.getElementById("layertogglebuffer").checked==false){
  
    map.removeLayer(_poiG);

  }else{
    map.addLayer(_poiG);
  }
});

