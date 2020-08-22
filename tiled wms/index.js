import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON';
import LinearRing from 'ol/geom/LinearRing';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import {
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
} from 'ol/geom';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import { Vector as VectorLayer} from 'ol/layer';
import {fromLonLat} from 'ol/proj';
import jsts from 'jsts';





//#region jsts buffer import 
var source2 = new VectorSource();
fetch('data/geojson/citizens.geojson')
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    var format = new GeoJSON();
    var features = format.readFeatures(json, {
      featureProjection: 'EPSG:4863',
    });

    var parser = new jsts.io.OL3Parser();
    parser.inject(
      Point,
      LineString,
      LinearRing,
      Polygon,
      MultiPoint,
      MultiLineString,
      MultiPolygon
    );

    for (var i = 0; i < features.length; i++) {
      var feature = features[i];
      // convert the OpenLayers geometry to a JSTS geometry
      var jstsGeom = parser.read(feature.getGeometry());

      // create a buffer of 40 meters around each line
      var buffered = jstsGeom.buffer(40);

      // convert back from JSTS and replace the geometry on the feature
      feature.setGeometry(parser.write(buffered));
    }

    source2.addFeatures(features);
  });
  //#endregion
//#region  Исполнение в консоли забития в postgis shp
  /*const shell = require('node-powershell');
  let ps = new shell({
    executionPolicy: 'Bypass',
    noProfile: true
  });
  
  ps.addCommand('shp2pgsql -s <SRID> -c -D -I <path to shapefile> <schema>.<table> | \ ');
  ps.invoke().then(output => {
    console.log(output);
  }).catch(err => {
    console.log(err);
    ps.dispose();
  });*/
  //#endregion
var layers = [
  new TileLayer({
    source: new OSM()
  }),
  new VectorLayer({
    source: source2,
  }),
  new TileLayer({
   
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/moscow/wms',
      params: {'LAYERS': 'moscow:border', 'TILED': true, 'TRANSPARENT':true},
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0
    })
  }), new TileLayer({
   
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/moscow/wms',
      params: {'LAYERS': 'moscow:citizens', 'TILED': true},
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0
    })
  }), new TileLayer({
   
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/moscow/wms',
      params: {'LAYERS': 'moscow:poi', 'TILED': true},
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:task2_1
      transition: 0
    })
  }),
  new TileLayer({
   
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/moscow/wms',
      params: {'LAYERS': 'moscow:task2_1', 'TILED': true},
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0
    })
  })
];



var map = new Map({
  layers: layers,
  target: 'map',
  view: new View({
    center:fromLonLat( [37.520193,55.613960]),
    zoom: 13
    
  })
});