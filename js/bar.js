function barChart() {

  var margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 40
    },
    width = 1000,
    height = 700,
    innerWidth = width - margin.left - margin.right,
    innerHeight = height - margin.top - margin.bottom,
    xValue = function(d) {
      return d[0];
    },
    yValue = function(d) {
      return d[1];
    },
    xScale = d3.scaleBand().padding(0.1),
    yScale = d3.scaleLinear(),
    onMouseOver = function() {},
    onMouseOut = function() {};

    var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin;


var xScale = d3.scaleBand().range ([0, width]).padding(0.4),
    yScale = d3.scaleLinear().range ([height, 0]);

  function chart(selection) {
    selection.each(function(data) {





    });
  }
  function X(d) {
    return xScale(xValue(d));
  }

  // The y-accessor for the path generator; yScale ∘ yValue.
  function Y(d) {
    return yScale(yValue(d));
  }
}
