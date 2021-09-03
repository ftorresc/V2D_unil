var margin = {top: 10, right: 30, bottom: 20, left: 50},
    width = 800 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var svg = d3.select("#chart")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

d3.csv('travel_mini.csv').then(data =>{
    console.log(data.columns.slice(1))

    var subgroups = data.columns.slice(1)
    var groups = d3.map(data, function(d){return(d.country)}).keys()
    console.log(groups)

    var x = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.2])
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSizeOuter(0));


  var y = d3.scaleLinear()
    .domain([0, 18000])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

    var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#ff8000','#984ea3','#4daf4a', '#377eb8','#e41a1d'])


  var stackedData = d3.stack()
    .keys(subgroups)
    (data)


  svg.append("g")
    .selectAll("g")
    .data(stackedData)
    .enter().append("g")
      .attr("fill", function(d) { return color(d.key); })
      .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data(function(d) { return d; })
      .enter().append("rect")
        .attr("x", function(d) { return x(d.data.country); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width",x.bandwidth())

        var legend = svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
      .selectAll("g")
      .data(subgroups.slice().reverse())
      .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
  
    legend.append("rect")
        .attr("x", width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", color);
  
    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function(d) { return d; });
})


