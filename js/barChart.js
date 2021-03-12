function barChart() {


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

      // Select the svg element, if it exists.

      var svg = d3.select(this).selectAll("svg").data([data]);

      // Otherwise, create the skeletal chart.
      var svgEnter = svg.enter().append("svg");
      var gEnter = svgEnter.append("g");
      gEnter.append("g").attr("class", "x axis");
      gEnter.append("g").attr("class", "y axis");

      innerWidth = width - margin.left - margin.right,
      innerHeight = height - margin.top - margin.bottom,

        // Update the outer dimensions.
        svg.merge(svgEnter).attr("width", width)
        .attr("height", height);

      // // Update the inner dimensions.
      var g = svg.merge(svgEnter).select("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      //  svg.call(tip);

      xScale.rangeRound([0, innerWidth]).domain(data.map(xValue));

      yScale.rangeRound([innerHeight, 0]).domain([0, d3.max(data, yValue)]);

      g.select(".x.axis")
        .attr("transform", "translate(0," + innerHeight + ")")
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("y", 0).attr("x", 9).attr("dy", "0.35em").attr("transform", "rotate(65)").style("text-anchor", "start");


      //ticks
      g.select(".y.axis")
        .call(d3.axisLeft(yScale))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Frequency");

      var tip = g.select("div")
        .attr("class", "tooltip-map")
        .style("opacity", 0);

      var bars = g.selectAll(".bar")
        .data(function(d) {
          return d;
        });

      bars.enter().append("rect")
        .attr("class", "bar")
        .merge(bars)
        .attr("x", X)
        .attr("y", Y)
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {
          return innerHeight - Y(d);
        })
        .on("mouseover", onMouseOver)

        .on("mouseout", onMouseOut);

      bars.exit().remove();
    });

  }

  // The x-accessor for the path generator; xScale ∘ xValue.
  function X(d) {
    return xScale(xValue(d));
  }

  // The y-accessor for the path generator; yScale ∘ yValue.
  function Y(d) {
    return yScale(yValue(d));
  }

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.x = function(_) {
    if (!arguments.length) return xValue;
    xValue = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return yValue;
    yValue = _;
    return chart;
  };

  chart.onMouseOver = function(_) {
    if (!arguments.length) return onMouseOver;
    onMouseOver = _;
    return chart;
  };

  chart.onMouseOut = function(_) {
    if (!arguments.length) return onMouseOut;
    onMouseOut = _;
    return chart;
  };


  return chart;
}
