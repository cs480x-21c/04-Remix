function legend() {

  var margin = {
    right: 20,
    bottom: 50,
    left: 50
  };
  var width = 1300;
  var height = 110;
  var innerWidth = width - margin.left - margin.right;
  var innerHeight = height - margin.bottom;
  // add a legend
  //https://bl.ocks.org/wboykinm/dbbe50d1023f90d4e241712395c27fb3

  var svg = d3.select("#mapLegendSVG")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "legend");

  // var svg = d3.select("#mapLegendSVG")
  //   .attr("width", innerWidth)
  //   .attr("height", innerHeight)
  //   .attr("class", "legend");


  var legend = svg.append("defs")
    .append("svg:linearGradient")
    .attr("id", "gradient")
    .attr("x1", "0%")
    .attr("y1", "100%")
    .attr("x2", "100%")
    .attr("y2", "100%")
    .attr("spreadMethod", "pad");

  legend.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#c94842")
    .attr("stop-opacity", 1);

  legend.append("stop")
    .attr("offset", "50%")
    .attr("stop-color", "#f2efee")
    .attr("stop-opacity", 1);

  legend.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#25659e")
    .attr("stop-opacity", 1);


    svg.append("rect")
    .attr("width", innerWidth)
    .attr("height", innerHeight)
    .style("fill", "url(#gradient)")
    .attr("transform", "translate(10,10)");

  var scale = d3.scaleLinear()
    .range([0, innerWidth])
    .domain([200, 1350]);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(10," + (innerHeight+10) + ")")
    .call(d3.axisBottom()
      .scale(scale))
    .selectAll("text").style("text-anchor", "center");


}
