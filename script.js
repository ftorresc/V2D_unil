
let width = 1200, height = 1000

let svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)


let europeProjection = d3.geoMercator()
	.center([ 13, 50 ])
  .scale([ width])
  .translate([ width / 2, height / 2 ])


let pathGenerator = null


pathGenerator = d3.geoPath().projection(europeProjection)
geoJsonUrl = "https://gist.githubusercontent.com/spiker830/3eab0cb407031bf9f2286f98b9d0558a/raw/7edae936285e77be675366550e20f9166bed0ed5/europe_features.json"

d3.json(geoJsonUrl).then(geojson => {
  svg.selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr("d", pathGenerator)
    .attr("stroke", "white") 
    .attr("fill", "grey") 
})