    // var margin = {top: 50, right: 100, bottom: 50, left: 100}
    var width = 600
    var height = 700

    var margin = { top: 50, right: 200, bottom: 50, left: 200 }
	// var height = 500 - margin.top - margin.bottom
	// var width = 500 - margin.left - margin.right


    var svg = d3.select("#scatterPlot")
        .append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


    // d3.csv("table-2.csv").then(function(data) {

    //     var colorScale = d3.scale.category20()
    //     var xScale = d3.scale.linear()
    //       .domain([
    //           d3.min([0,d3.min(data,function (d) { return d.president })]),
    //           d3.max([0,d3.max(data,function (d) { return d.president })])
    //           ])
    //       .range([0,width])
    //     var yScale = d3.scale.linear()
    //       .domain([
    //           d3.min([0,d3.min(data,function (d) { return d.age })]),
    //           d3.max([0,d3.max(data,function (d) { return d.age })])
    //           ])
    //       .range([height,0])

    //       // X-axis
    //       var xAxis = d3.svg.axis()
    //         .scale(xScale)
    //         .tickFormat(formatPercent)
    //         .ticks(5)
    //         .orient('bottom')
    //     // Y-axis
    //       var yAxis = d3.svg.axis()
    //         .scale(yScale)
    //         .tickFormat(formatPercent)
    //         .ticks(5)
    //         .orient('left')
    //     // Circles
    //     var circles = svg.selectAll('circle')
    //         .data(data)
    //         .enter()
    //       .append('circle')
    //         .attr('cx',function (d) { return xScale(d.president) })
    //         .attr('cy',function (d) { return yScale(d.age) })
    //         .attr('r','10')
    //         .attr('stroke','black')
    //         .attr('stroke-width',1)
    //         .attr('fill',function (d,i) { return colorScale(i) })
    //         .on('mouseover', function () {
    //           d3.select(this)
    //             .transition()
    //             .duration(500)
    //             .attr('r',20)
    //             .attr('stroke-width',3)
    //         })
    //         .on('mouseout', function () {
    //           d3.select(this)
    //             .transition()
    //             .duration(500)
    //             .attr('r',10)
    //             .attr('stroke-width',1)
    //         })
    //       .append('title') // Tooltip
    //         .text(function (d) { return d.variable +
    //                              '\nReturn: ' + formatPercent(d.age) +
    //                              '\nStd. Dev.: ' + formatPercent(d.president) })
    //     // X-axis
    //     svg.append('g')
    //         .attr('class','axis')
    //         .attr('transform', 'translate(0,' + h + ')')
    //         .call(xAxis)
    //       .append('text') // X-axis Label
    //         .attr('class','label')
    //         .attr('y',-10)
    //         .attr('x',w)
    //         .attr('dy','.71em')
    //         .style('text-anchor','end')
    //         .text('Annualized Standard Deviation')
    //     // Y-axis
    //     svg.append('g')
    //         .attr('class', 'axis')
    //         .call(yAxis)
    //       .append('text') // y-axis Label
    //         .attr('class','label')
    //         .attr('transform','rotate(-90)')
    //         .attr('x',0)
    //         .attr('y',5)
    //         .attr('dy','.71em')
    //         .style('text-anchor','end')
    //         .text('Annualized Return')
    //   });





