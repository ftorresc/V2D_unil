let geojson = {};

const context = d3.select('canvas')
  .node()
  .getContext('2d');

const projection = d3.geoMercator()
    .scale(1250)
    .center([ 3, 50 ])
    .translate([ 1200 / 2, 1000 / 2 ])

// le chemin
const geoGenerator = d3.geoPath()
  .projection(projection)
  .pointRadius(5)
  .context(context);

const londonLonLat = [0.1278, 51.5074];
const newYorkLonLat = [-74.0059, 40.7128];
const lausanneLonLat = [6.6667,46.5333];
const geoInterpolator = d3.geoInterpolate(lausanneLonLat, londonLonLat);
let u = 0;

function update() {
  context.clearRect(0, 0, 1200, 1000);

  context.lineWidth = 0.5;
  context.strokeStyle = '#333';

  context.beginPath();
  geoGenerator({type: 'FeatureCollection', features: geojson.features})
  context.stroke();


  // Lausanne - Londres
  context.beginPath();
  context.strokeStyle = 'red';
  geoGenerator({type: 'Feature', geometry: {type: 'LineString', coordinates: [lausanneLonLat, londonLonLat]}});
  context.stroke();
  
  // londres - New York
  context.beginPath();
  context.strokeStyle = 'red';
  geoGenerator({type: 'Feature', geometry: {type: 'LineString', coordinates: [lausanneLonLat, newYorkLonLat]}});
  context.stroke();

  // Point
  context.beginPath();
  context.fillStyle = 'red';
  geoGenerator({type: 'Feature', geometry: {type: 'Point', coordinates: geoInterpolator(u)}});
  context.fill();

  // boucle d'évolution
  // du curseur
  u += 0.01;
  if(u > 1) u = 0
}

// récupération des données
d3.json('https://gist.githubusercontent.com/spiker830/3eab0cb407031bf9f2286f98b9d0558a/raw/7edae936285e77be675366550e20f9166bed0ed5/europe_features.json').then( structure_json => {
  geojson = structure_json;
  window.setInterval(update, 50);
});