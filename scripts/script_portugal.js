let geojson = {};

const context = d3.select('canvas')
  .node()
  .getContext('2d');

const projection = d3.geoMercator()
  .scale(1000)
  .center([ 23, 50 ])
  .translate([ 1200 / 2, 1000 / 2 ])

// le chemin
const geoGenerator = d3.geoPath()
  .projection(projection)
  .pointRadius(5)
  .context(context);

const londonLonLat = [0.1278, 51.5074];
const newYorkLonLat = [-74.0059, 40.7128];
const lausanneLonLat = [6.6667, 46.5333];
const glasgowLonLat = [-4.2514, 55.8609];
const romeLonLat = [12.4963, 41.9027];
const sevilleLonLat = [-5.9940, 37.3925];
const munichLonLat = [11.5761, 48.1371];
const amsterdamLonLat = [4.8970, 52.3779];
const copenhagenLonLat = [12.5683, 55.6760];
const budapestLonLat = [19.0402, 47.4979];
const bucharestLonLat = [26.0963, 44.4396];
const bakuLonLat = [49.8920, 40.3776];
const stpetersburgLonLat = [30.3086, 59.9375];

const geoInterpolator = d3.geoInterpolate(budapestLonLat, munichLonLat);
const geoInterpolator2 = d3.geoInterpolate(munichLonLat, budapestLonLat);
const geoInterpolator3 = d3.geoInterpolate(budapestLonLat, sevilleLonLat);
let u = 0;

function update() {
  context.clearRect(0, 0, 1200, 1000);

  context.lineWidth = 0.5;
  context.strokeStyle = '#333';

  context.beginPath();
  geoGenerator({type: 'FeatureCollection', features: geojson.features})
  context.stroke();


  // Budapest - Munich
  context.beginPath();
  context.strokeStyle = 'red';
  geoGenerator({type: 'Feature', geometry: {type: 'LineString', coordinates: [budapestLonLat, munichLonLat]}});
  context.stroke();
  
  // Munich - Budapest
  context.beginPath();
  context.strokeStyle = 'red';
  geoGenerator({type: 'Feature', geometry: {type: 'LineString', coordinates: [munichLonLat, budapestLonLat]}});
  context.stroke();

  // Budapest - Seville
  context.beginPath();
  context.strokeStyle = 'red';
  geoGenerator({type: 'Feature', geometry: {type: 'LineString', coordinates: [budapestLonLat, sevilleLonLat]}});
  context.stroke();

  // Point - Travel 1
  context.beginPath();
  context.fillStyle = 'red';
  geoGenerator({type: 'Feature', geometry: {type: 'Point', coordinates: geoInterpolator(u)}});
  context.fill();

  // Point - Travel 2
  context.beginPath();
  context.fillStyle = 'red';
  geoGenerator({type: 'Feature', geometry: {type: 'Point', coordinates: geoInterpolator2(u)}});
  context.fill();

  // Point - Travel 3
  context.beginPath();
  context.fillStyle = 'red';
  geoGenerator({type: 'Feature', geometry: {type: 'Point', coordinates: geoInterpolator3(u)}});
  context.fill();

  // boucle d'??volution
  // du curseur
  u += 0.01;
  if(u > 1) u = 0
}

// r??cup??ration des donn??es
d3.json('../custom3.json').then( structure_json => {
  geojson = structure_json;
  window.setInterval(update, 50);
});


//make a second update function with the second trip, then call it, then third etc etc