// var x = d3.scaleBand().rangeRound([0, width]);
        // var y = d3.scaleLinear().range([height, 0]);

        var margin = {top: 50, right: 50, bottom: 50, left: 50}
        var width = 600
        var height = 600

        var svg = d3.select("#barChart")
        .append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        // let presidentData = [];

        // d3.csv("table-2.csv" , function(data) {
        //     presidentData.push({"President": data.president, "Age": data.age});
        // });
            
        // console.log(presidentData)

        d3.csv("table-2.csv").then(function(data) {
            console.log(data);

            // data.forEach(function (d) {
            //     d.age = parseInt(d.AgeStart);
            //     d.President  = d.President;
            // })

        var x = d3.scaleBand()
            .domain(data.map(function(d) {return d.president}))
            .range([0, width])
            .padding(0.5)
            svg.append("g")
            .attr("transform", "translate(0, "+ height + ")")
            .call(d3.axisBottom(x).tickFormat(
                function(d) {
                    return d;
                }
            ).tickSize(8))
            .style("stroke-width", "1.5px")
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.60em")
            .attr("transform", "rotate(-90)" )
            // .text("president");


        var y = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return d.age; })])
            .range([height, 0])
            svg.append("g")
            .call(d3.axisLeft(y).tickFormat(function(d) {
                return d;
                }).tickSize(3))
            .style("stroke-width", "1.5px")


        svg.selectAll("bar")
            .data(data)
            .enter().append("rect")
            // .append("g")
            .attr("class", "bar")
            .style("fill", "steelblue")
            // .style("stroke", "black")
            // .padding(30)
            .attr("x", function(d) { return x(d.president); })
            // x.bandwith isn't working for some reason will come back to debug
            .attr("width", 40)
            .attr("y", function(d) { return y(d.age); })
            .attr("height", function(d) { return height - y(d.age); });


            });
            