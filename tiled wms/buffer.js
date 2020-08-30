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
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {fromLonLat} from 'ol/proj';


    var source = new VectorSource();
    fetch('data/geojson/citizens.geojson')
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        var format = new GeoJSON();
        var features = format.readFeatures(json, {
          featureProjection: 'EPSG:4326',
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
    
        source.addFeatures(features);
      });
    var vectorLayer = new VectorLayer({
      source: source,
    });
    

