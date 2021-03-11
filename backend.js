// TODO: Add interactivity between vis

function main() {
    let selector = "all";
    let id = "all";

    createLineGraph();
    createScatterPlot();


    function setOpacity(d, selector) {
        //console.log(selector);
        //console.log(d);
        //console.log(d.sex)

        if (selector === "all") {
            return 0.5;
        } else if (selector === "Men") {
            if (d.sex === "Men") {
                return 0.5;
            } else return 0.0;
        } else if (selector === "Women") {
            if (d.sex === "Women") {
                return 0.5;
            } else return 0.0;
        } else if (selector === "Both Sexes") {
            if (d.sex === "Both Sexes") {
                return 0.5;
            } else return 0.0;
        }
    }

    function createScatterPlot() {
        //Read CSV Data
        d3.csv("csv/earned.csv").then(function (data) {

            let timeFormat = d3.timeFormat("%Y");
            let parseTime = d3.timeParse("%Y");

            data.forEach(function (d) {
                d.year = parseTime(d.year);
                // d.dates = timeFormat(d.dates);
                d.median_weekly_earn = +d.median_weekly_earn;
            });

            let margin = {top: 10, right: 30, bottom: 30, left: 60},
                width = 720 - margin.left - margin.right,
                height = 600 - margin.top - margin.bottom;

            // append the svg object to the body of the page
            let svg = d3.select("#scatterplot")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("id", "scatterdots")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");



            // Add X axis
            let x = d3.scaleTime()
                .domain(d3.extent(data, function (d) {
                    return (d.year);
                }))
                .range([0, width]);

            let xAxis = d3.axisBottom(x)
                .tickFormat(timeFormat);


            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            // Add Y axis
            let y = d3.scaleLinear()
                .domain([200, 1800])
                .range([height, 0]);
            svg.append("g")
                .call(d3.axisLeft(y));


            // Add dots
            let jitterWidth = 30;
            svg.append('g')
                .selectAll("dot")
                .data(data)
                .enter()
                .append("circle")
                .attr('id', 'dot')
                .attr("class", "non_brushed")
                .attr("cx", function (d) {
                    return x(d.year) - jitterWidth / 2 + Math.random() * jitterWidth;
                })
                .attr("cy", function (d) {
                    return y(d.median_weekly_earn);
                })
                .attr("r", 2.5)
                .style("opacity", function (d) {
                    return setOpacity(d, selector);
                })
                .style("fill", function (d) {
                    return setColor(d);
                })
                .on('mouseover', function () {
                    d3.select(this).transition()
                        .duration('50')
                        .attr('r', '10');

                })
                .on('mouseout', function () {
                    d3.select(this).transition()
                        .duration('50')
                        .attr('r', '2.5');
                })

            function highlightBrushedCircles() {

                if (d3.brushSelection(this) != null) {

                    // revert circles to initial style
                    let circles = d3.selectAll('#dot');
                    circles.attr("class", "non_brushed");

                    let brush_coords = d3.brushSelection(this);

                    // style brushed circles
                    circles.filter(function (){

                        let cx = d3.select(this).attr("cx"),
                            cy = d3.select(this).attr("cy");

                        return isBrushed(brush_coords, cx, cy);
                    })
                        .attr("class", "brushed");
                }
            }


            function displayTable() {

                d3.select("table").style("visibility", "visible");

                // disregard brushes w/o selections
                // ref: http://bl.ocks.org/mbostock/6232537
                if (!d3.brushSelection(this)) return;

                // programmed clearing of brush after mouse-up
                // ref: https://github.com/d3/d3-brush/issues/10
                d3.select(this).call(brush.move, null);

                let d_brushed =  d3.selectAll(".brushed").data();
                console.log(d_brushed);

                // populate table if one or more elements is brushed
                if (d_brushed.length > 0) {
                    clearTableRows();
                    // clearTableRows();
                    // for(let i = 0; i < 30; i++){
                    //     populateTableRow(d_brushed[i])
                    // }
                    d_brushed.forEach(d_row => populateTableRow(d_row))
                } else {
                    clearTableRows();
                }
            }

            function clearTableRows() {

                hideTableColNames();
                d3.selectAll(".row_data").remove();
            }

            function hideTableColNames() {
                d3.select("table").style("visibility", "hidden");
            }

            function showTableColNames() {
                d3.select("table").style("visibility", "visible");
            }

            function populateTableRow(d_row) {

                showTableColNames();
                let d_row_filter;

                if(selector === "all"){
                    d_row_filter = [d_row.sex, d_row.median_weekly_earn];
                }else if(selector === d_row.sex){
                    d_row_filter = [d_row.sex, d_row.median_weekly_earn];
                }else if(selector === d_row.sex){
                    d_row_filter = [d_row.sex, d_row.median_weekly_earn];
                }
                else if(selector === d_row.sex){
                    d_row_filter = [d_row.sex, d_row.median_weekly_earn];
                }
                else{
                    return;
                }


                d3.select("table")
                    .append("tr")
                    .attr("class", "row_data")
                    .selectAll("td")
                    .data(d_row_filter)
                    .enter()
                    .append("td")
                    .attr("align", (d, i) => i === 0 ? "left" : "right")
                    .text(d => d);
            }

            let brush = d3.brush()
                .on("brush",  highlightBrushedCircles)
                .on("end", displayTable);

            svg.append("g")
                .call(brush);

            function isBrushed(brush_coords, cx, cy) {

                let x0 = brush_coords[0][0],
                    x1 = brush_coords[1][0],
                    y0 = brush_coords[0][1],
                    y1 = brush_coords[1][1];

                return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
            }


            svg.append('text')
                .attr('x', width / 2)
                .attr('y', height + 30)
                .attr('text-anchor', 'end')
                .attr('class', 'label')
                .text('Year');

            svg.append('text')
                .attr('x', -100)
                .attr('y', 60)
                .attr('text-anchor', 'end')
                .attr('transform', "translate(-100,60)rotate(270)")
                .attr('class', 'label')
                .text('Median Weekly Earnings');


            const grid = svg.append('g')
                .attr('class', 'grid');

            grid.append('g')
                .selectAll('line')
                .data(y.ticks())
                .join('line')
                .attr('stroke', '#d3d3d3')
                .attr('opacity', .2)
                .attr('x1', 0)
                .attr('x2', width)
                .attr('y1', d => 0.5 + y(d))
                .attr('y2', d => 0.5 + y(d));

            grid.append('g')
                .selectAll('line')
                .data(x.ticks())
                .join('line')
                .attr('stroke', '#d3d3d3')
                .attr('opacity', .2)
                .attr('x1', d => 0.5 + x(d))
                .attr('x2', d => 0.5 + x(d))
                .attr('y1', 0)
                .attr('y2', height);


            //drawLegend()
            // draw circles
            // draw text
            // add click event "onclick"
            addLegend()

            function addLegend() {
                //Men
                svg.append("circle")
                    .attr("cx", 15)
                    .attr("cy", 15)
                    .attr("r", 8)
                    .attr("fill", "#45b6fe")
                    .style("opacity", 0.5)
                    .on("click", function () {
                        selector = "Men"
                        updatePlot(selector);
                        d3.select('#menline').attr('stroke', '#45b6fe');
                        d3.select('#womenline').attr('stroke', 'gray');
                        d3.select('#bothsexesline').attr('stroke', 'gray');

                    });
                svg.append("text")
                    .attr("x", 30)
                    .attr("y", 21)
                    .attr("stroke", "#0000")
                    .text("Men")
                    .on("click", function () {
                        selector = d3.select(this).text();
                        updatePlot(selector);
                        d3.select('#menline').attr('stroke', '#45b6fe');
                        d3.select('#womenline').attr('stroke', 'gray');
                        d3.select('#bothsexesline').attr('stroke', 'gray');

                    });
                //Women
                svg.append("circle")
                    .attr("cx", 15)
                    .attr("cy", 40)
                    .attr("r", 8)
                    .attr("fill", "#e75480")
                    .style("opacity", 0.5)
                    .on("click", function () {
                        selector = "Women"
                        updatePlot(selector);
                        d3.select('#menline').attr('stroke', 'gray');
                        d3.select('#womenline').attr('stroke', '#e75480');
                        d3.select('#bothsexesline').attr('stroke', 'gray');

                    });
                svg.append("text")
                    .attr("x", 30)
                    .attr("y", 46)
                    .attr("stroke", "#0000")
                    .text("Women")
                    .on("click", function () {
                        selector = d3.select(this).text();
                        updatePlot(selector);
                        d3.select('#menline').attr('stroke', 'gray');
                        d3.select('#womenline').attr('stroke', '#e75480');
                        d3.select('#bothsexesline').attr('stroke', 'gray');

                    });
                //Both Sexes
                svg.append("circle")
                    .attr("cx", 15)
                    .attr("cy", 65)
                    .attr("r", 8)
                    .attr("fill", "#6a0dad")
                    .style("opacity", 0.5)
                    .on("click", function () {
                        selector = "Both Sexes"
                        updatePlot(selector);
                        d3.select('#menline').attr('stroke', 'gray');
                        d3.select('#womenline').attr('stroke', 'gray');
                        d3.select('#bothsexesline').attr('stroke', '#6a0dad');

                    });
                svg.append("text")
                    .attr("x", 30)
                    .attr("y", 70)
                    .attr("stroke", "#0000")
                    .text("Both Sexes")
                    .on("click", function () {
                        selector = d3.select(this).text();
                        d3.select('#menline').attr('stroke', 'gray');
                        d3.select('#womenline').attr('stroke', 'gray');
                        d3.select('#bothsexesline').attr('stroke', '#6a0dad');
                        updatePlot(selector);

                    });

                function updatePlot(selector) {
                    //console.log(selector);
                    //select all circles
                    svg.selectAll("#dot")
                        .style("opacity", function (d, i) {
                            return setOpacity(d, selector)
                        });
                }

                document.getElementById("reset").addEventListener("click", function () {
                    selector = "all";
                    updatePlot(selector);
                    d3.selectAll(".row_data").remove();
                    d3.select("table").style("visibility", "hidden");
                })
            }

            function setColor(d) {
                //console.log(d.sex);
                switch (d.sex) {
                    case "Men":
                        return d3.color("#45b6fe");
                    case "Women":
                        return d3.color("#e75480");
                    default:
                        return d3.color("#6a0dad");

                }
            }

        });

    }


    //implement line graph
    //Clicking on the legend will filter which line graphs to show
    //Clicking Reset resets both views

    function createLineGraph() {


        let margin = {top: 10, right: 30, bottom: 30, left: 60},
            width = 720 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        let svg = d3.select("#linegraph")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("id", "linegraph")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        d3.csv("csv/earnedtopbyyear.csv").then(function (data) {
            let parseTime = d3.timeParse("%Y");

            data.forEach(function (d) {
                d.year = parseTime(d.year);
                d.men = +d.men;
                d.women = +d.women;
                d.both_sexes = +d.both_sexes;
            });

            //console.log(data);
            let x = d3.scaleTime().range([0, width]);
            let y = d3.scaleLinear().range([height, 0]);

            let valueline = d3.line()
                .x(function (d) {
                    return x(d.year);
                })
                .y(function (d) {
                    return y(d.men);
                });

            let valueline2 = d3.line()
                .x(function (d) {
                    return x(d.year);
                })
                .y(function (d) {
                    return y(d.women);
                });

            let valueline3 = d3.line()
                .x(function (d) {
                    return x(d.year);
                })
                .y(function (d) {
                    return y(d.both_sexes);
                });

            // Scale the range of the data
            x.domain(d3.extent(data, function (d) {
                return d.year;
            }));
            y.domain([200, 1800]);

            // Add the valueline path.
            svg.append("path")
                .data([data])
                .attr("id", "menline")
                .attr("class", "line")
                .attr("stroke", "#45b6fe")
                .attr("d", valueline);

            // Add the valueline2 path.
            svg.append("path")
                .data([data])
                .attr("id", "womenline")
                .attr("class", "line")
                .attr("stroke", "#e75480")
                .attr("d", valueline2);

            svg.append("path")
                .data([data])
                .attr("id", "bothsexesline")
                .attr("class", "line")
                .attr("stroke", "#6a0dad")
                .attr("d", valueline3);



            // Add the X Axis
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            // Add the Y Axis
            svg.append("g")
                .call(d3.axisLeft(y));


            svg.append('text')
                .attr('x', width / 2)
                .attr('y', height + 30)
                .attr('text-anchor', 'end')
                .attr('class', 'label')
                .text('Year');

            svg.append('text')
                .attr('x', -100)
                .attr('y', 60)
                .attr('text-anchor', 'end')
                .attr('transform', "translate(-100,60)rotate(270)")
                .attr('class', 'label')
                .text('Median Weekly Earnings');

            const grid = svg.append('g')
                .attr('class', 'grid');

            grid.append('g')
                .selectAll('line')
                .data(y.ticks())
                .join('line')
                .attr('stroke', '#d3d3d3')
                .attr('opacity', .2)
                .attr('x1', 0)
                .attr('x2', width)
                .attr('y1', d => 0.5 + y(d))
                .attr('y2', d => 0.5 + y(d));

            grid.append('g')
                .selectAll('line')
                .data(x.ticks())
                .join('line')
                .attr('stroke', '#d3d3d3')
                .attr('opacity', .2)
                .attr('x1', d => 0.5 + x(d))
                .attr('x2', d => 0.5 + x(d))
                .attr('y1', 0)
                .attr('y2', height);


            addLegend();

            function addLegend() {
                //Men
                svg.append("circle")
                    .attr("cx", 15)
                    .attr("cy", 15)
                    .attr("r", 8)
                    .attr("fill", "#45b6fe")
                    .style("opacity", 0.5)
                    .on("click", function () {
                        id = "Men";
                        setFocus(id);
                        d3.selectAll("#dot")
                            .style("opacity", function (d) {
                                selector = 'Men';
                                return setOpacity(d, selector);
                            });
                    });

                svg.append("text")
                    .attr("x", 30)
                    .attr("y", 21)
                    .attr("stroke", "#0000")
                    .text("Men")
                    .on("click", function () {
                        id = "Men";
                        setFocus(id);
                        d3.selectAll("#dot")
                            .style("opacity", function (d) {
                                selector = 'Men';
                                return setOpacity(d, selector);
                            });
                    });

                //Women
                svg.append("circle")
                    .attr("cx", 15)
                    .attr("cy", 40)
                    .attr("r", 8)
                    .attr("fill", "#e75480")
                    .style("opacity", 0.5)
                    .on("click", function () {
                        id = "Women";
                        setFocus(id);
                        d3.selectAll("#dot")
                            .style("opacity", function (d) {
                                selector = 'Women';
                                return setOpacity(d, selector);
                            });
                    });

                svg.append("text")
                    .attr("x", 30)
                    .attr("y", 46)
                    .attr("stroke", "#0000")
                    .text("Women")
                    .on("click", function () {
                        id = "Women";
                        setFocus(id);
                        d3.selectAll("#dot")
                            .style("opacity", function (d) {
                                selector = 'Women';
                                return setOpacity(d, selector);
                            });
                    });

                //Both Sexes
                svg.append("circle")
                    .attr("cx", 15)
                    .attr("cy", 65)
                    .attr("r", 8)
                    .attr("fill", "#6a0dad")
                    .style("opacity", 0.5)
                    .on("click", function () {
                        id = "Both Sexes";
                        setFocus(id);
                        d3.selectAll("#dot")
                            .style("opacity", function (d) {
                                selector = 'Both Sexes';
                                return setOpacity(d, selector);
                            });
                    });

                svg.append("text")
                    .attr("x", 30)
                    .attr("y", 70)
                    .attr("stroke", "#0000")
                    .text("Both Sexes")
                    .on("click", function () {
                        id = "Both Sexes";
                        setFocus(id);
                        d3.selectAll("#dot")
                            .style("opacity", function (d) {
                                selector = 'Both Sexes';
                                return setOpacity(d, selector);
                            });
                    });

            }



            function setFocus(id) {
                let lineMen = document.getElementById("menline");
                let lineWomen = document.getElementById("womenline");
                let lineBoth = document.getElementById("bothsexesline");

                if (id === "Men") {
                    lineMen.setAttribute("stroke", "#45b6fe");
                    lineWomen.setAttribute("stroke", "gray");
                    lineBoth.setAttribute("stroke", "gray");
                }
                if (id === "Women") {
                    lineMen.setAttribute("stroke", "gray");
                    lineWomen.setAttribute("stroke", "#e75480");
                    lineBoth.setAttribute("stroke", "gray");
                }
                if (id === "Both Sexes") {
                    lineMen.setAttribute("stroke", "gray");
                    lineWomen.setAttribute("stroke", "gray");
                    lineBoth.setAttribute("stroke", "#6a0dad");
                }
                if (id === "all") {
                    lineMen.setAttribute("stroke", "#45b6fe");
                    lineWomen.setAttribute("stroke", "#e75480");
                    lineBoth.setAttribute("stroke", "#6a0dad");
                }

            }

            document.getElementById("reset").addEventListener("click", function () {
                id = "all";
                setFocus(id);
            })


        })
    }



}
