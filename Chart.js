//ref http://bl.ocks.org/timelyportfolio/5c136de85de1c2abb6fc

//focus vis
//overview vis2
var margin = { top: 10, right: 10, bottom: 150, left: 60 },
    margin2 = { top: 375, right: 10, bottom: 20, left: 60 },
    
    //both use same width
    width = 1000 - margin.left - margin.right,

    height = 500 - margin.top - margin.bottom,
    height2 = 500 - margin2.top - margin2.bottom;

//vew ranges
var maxYRange = 0;
var deathYRange = 0;
var hospitalizedYRange = 0;
var positiveYRange = 0;
var testYRange = 0;

//month-day-year
var parseDate = d3.time.format("%m-%d-%Y").parse;

var xRange = d3.time.scale().range([0, width]),
    xRange2 = d3.time.scale().range([0, width]),

    yRange = d3.scale.linear().range([height, 0]),
    yRange2 = d3.scale.linear().range([height2, 0]);

var xAxis = d3.svg.axis().scale(xRange).orient("bottom"),
    xAxis2 = d3.svg.axis().scale(xRange2).orient("bottom"),

    yAxis = d3.svg.axis().scale(yRange).orient("left");

var brush = d3.svg.brush()
    .x(xRange2)
    .on("brush", brushed);

//areas
//deathincease
var deathIncreaseArea = d3.svg.area()
  //curve used
  .interpolate("monotone")
  .x(function (d) { return xRange(d.date); })
  .y0(height)
  .y1(function (d) { return yRange(d.deathIncrease); });

var deathIncreaseArea2 = d3.svg.area()
  .interpolate("monotone")
  .x(function (d) { return xRange2(d.date); })
  .y0(height2)
  .y1(function (d) { return yRange2(d.deathIncrease); });

//hospitalized
var hospitalizedIncreaseArea = d3.svg.area()
  //curve used
  .interpolate("monotone")
  .x(function (d) { return xRange(d.date); })
  .y0(height)
  .y1(function (d) { return yRange(d.hospitalizedIncrease); });

var hospitalizedIncreaseArea2 = d3.svg.area()
  .interpolate("monotone")
  .x(function (d) { return xRange2(d.date); })
  .y0(height2)
  .y1(function (d) { return yRange2(d.hospitalizedIncrease); });

//positive cases
var positiveIncreaseArea = d3.svg.area()
  //curve used
  .interpolate("monotone")
  .x(function (d) { return xRange(d.date); })
  .y0(height)
  .y1(function (d) { return yRange(d.positiveIncrease); });

var positiveIncreaseArea2 = d3.svg.area()
    .interpolate("monotone")
    .x(function (d) { return xRange2(d.date); })
    .y0(height2)
    .y1(function (d) { return yRange2(d.positiveIncrease); });

//test increase
var testIncreaseArea = d3.svg.area()
  //curve used
  .interpolate("monotone")
  .x(function (d) { return xRange(d.date); })
  .y0(height)
  .y1(function (d) { return yRange(d.totalTestResultsIncrease); });

var testIncreaseArea2 = d3.svg.area()
  .interpolate("monotone")
  .x(function (d) { return xRange2(d.date); })
  .y0(height2)
  .y1(function (d) { return yRange2(d.totalTestResultsIncrease); });

//brush
function drawBrush() {
  //draw brush
  brush(d3.select(".brush").transition());
  //brush events
  brush.event(d3.select(".brush").transition().delay(1000))
}


var svg = d3.select("#vis").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

//cut path within margin
svg.append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);

var focus = svg.append("g")
    .attr("class", "focus")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var context = svg.append("g")
    .attr("class", "context")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

//data
d3.csv("https://raw.githubusercontent.com/Fish1naTank/04-Remix/main/data/Covid-19%20U.S.%20Nationwide%20Metrics.csv", type, function (data) {
  //chart ranges
  xRange.domain(d3.extent(data.map(function (d) { return d.date; })));

  //get yRanges
  deathYRange = d3.max(data.map(function (d) { return d.deathIncrease }));
  hospitalizedYRange = d3.max(data.map(function (d) { return d.hospitalizedIncrease }));
  positiveYRange = d3.max(data.map(function (d) { return d.positiveIncrease }));
  testYRange = d3.max(data.map(function (d) { return d.totalTestResultsIncrease }));

  maxYRange = d3.max([deathYRange, hospitalizedYRange, positiveYRange, testYRange])
  yRange.domain([0, maxYRange]);

  xRange2.domain(xRange.domain());
  yRange2.domain(yRange.domain());

  //deathIncreaseArea
  focus.append("path")
    .datum(data)
    .attr("class", "deathIncreaseArea")
    .attr("d", deathIncreaseArea);

  context.append("path")
    .datum(data)
    .attr("class", "deathIncreaseArea")
    .attr("d", deathIncreaseArea2);

  //hospitalizedArea
  focus.append("path")
    .datum(data)
    .attr("class", "hospitalizedIncreaseArea")
    .attr("d", hospitalizedIncreaseArea);

  context.append("path")
    .datum(data)
    .attr("class", "hospitalizedIncreaseArea")
    .attr("d", hospitalizedIncreaseArea2);

  //positiveIncreaseArea
  focus.append("path")
    .datum(data)
    .attr("class", "positiveIncreaseArea")
    .attr("d", positiveIncreaseArea);

  context.append("path")
    .datum(data)
    .attr("class", "positiveIncreaseArea")
    .attr("d", positiveIncreaseArea2);

  //testIincreaseArea
  focus.append("path")
    .datum(data)
    .attr("class", "testIncreaseArea")
    .attr("d", testIncreaseArea);

  context.append("path")
    .datum(data)
    .attr("class", "testIncreaseArea")
    .attr("d", testIncreaseArea2);
  
  //focus axis
  focus.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  focus.append("g")
      .attr("class", "y axis")
      .call(yAxis);
  
  //overview axis
  context.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height2 + ")")
      .call(xAxis2);

  //brush
  context.append("g")
      .attr("class", "brush")
      .call(brush)
    .selectAll("rect")
      .attr("y", -6)
      .attr("height", height2 + 7);
});

function brushed() {
  xRange.domain(brush.empty() ? xRange2.domain() : brush.extent());
  updateFocusAreas();
  focus.select(".x.axis").call(xAxis);
}

function updateFocusAreas(){
  focus.select(".deathIncreaseArea").attr("d", deathIncreaseArea);
  focus.select(".hospitalizedIncreaseArea").attr("d", hospitalizedIncreaseArea);
  focus.select(".positiveIncreaseArea").attr("d", positiveIncreaseArea);
  focus.select(".testIncreaseArea").attr("d", testIncreaseArea);
}

function updateFocusAreasWithDelay(delay){
  focus.select(".deathIncreaseArea").transition().duration(delay).attr("d", deathIncreaseArea);
  focus.select(".hospitalizedIncreaseArea").transition().duration(delay).attr("d", hospitalizedIncreaseArea);
  focus.select(".positiveIncreaseArea").transition().duration(delay).attr("d", positiveIncreaseArea);
  focus.select(".testIncreaseArea").transition().duration(delay).attr("d", testIncreaseArea);
}

function setYRange(view){

  switch(view) {
    case 1:
      // deathIncrease
      yRange.domain([0, deathYRange + deathYRange*0.1])
      break;
    case 2:
      // hospitalIncrease
      yRange.domain([0, hospitalizedYRange + hospitalizedYRange*0.1])
      break;
    case 3:
      // positiveIncrease
      yRange.domain([0, positiveYRange + positiveYRange*0.1])
      break;
    case 4:
      // testIncrease
      yRange.domain([0, testYRange + testYRange*0.1])
      break;
    default:
      // reset
      yRange.domain([0, maxYRange + maxYRange*0.1])
  }

  updateFocusAreasWithDelay(2000);
  focus.select(".y.axis").transition().duration(2000).call(yAxis);
}

function type(d) {
  d.date = parseDate(d.date);
  d.death = +d.death;
  d.deathIncrease = +d.deathIncrease;
  d.hospitalizedIncrease = +d.hospitalizedIncrease;
  d.positiveIncrease = +d.positiveIncrease;
  d.totalTestResultsIncrease = +d.totalTestResultsIncrease;
  return d;
}