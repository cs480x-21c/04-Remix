function pieChart(){
  var margin = {
    top: 20,
    right: 20,
    bottom: 130,
    left: 40
  };
  var width = 500;
  var height = 500;
  var innerWidth = width - margin.left - margin.right;
  var innerHeight = height - margin.top - margin.bottom;
  var xValue = function(d) {
    return d[0];
  };
  var yValue = function(d) {
    return d[1];
  };
  var xScale = d3.scaleBand().padding(0.4);
  var yScale = d3.scaleLinear();
  // xScale = d3.scaleBand().padding(0.1),
  // yScale = d3.scaleLinear();
  var onMouseOver = function() {};
  var onMouseOut = function() {};
  function chart(selection) {
    selection.each(function(data) {
      console.log("pie")
      console.log(data);
  }}
}
