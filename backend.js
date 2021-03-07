//VIS DESC//

//Scatterplot that shows all data
//bottom has list of economic events

//Option to select Male, Female
//Option to switch to barchart view + piechart view

// One barchart that shows Men from 2010-2020 median weekly income by race (y-axis)
// Horizontal barchart
// Linked barchart that takes this vis and converts to piechart
// piechart has age group and median income for men

// One barchart that shows Women from 2010-2020 median weekly income by race (y-axis)
// Horizontal barchart
// Linked barchart that takes this vis and converts to piechart
// piechart has age group and median income for women


function main() {

    //Data storage
    let dataMen = [];
    let dataWomen = [];
    let dataWhite = [];
    let dataAsian = [];
    let dataAfricanAmerican = [];
    let selector = "all";


    //Read CSV Data
    d3.csv("csv/earned.csv").then(function (d) {
        createDifferentDataArrays(d);
        createScatterPlot(d);


        function createDifferentDataArrays(data) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].sex === "Men") {
                    dataMen.push(data[i]);
                }
                if (data[i].sex === "Women") {
                    dataWomen.push(data[i]);
                }
                if (data[i].race === "Black or African American") {
                    dataAfricanAmerican.push(data[i]);
                }
                if (data[i].race === "White") {
                    dataWhite.push(data[i]);
                }
                if (data[i].race === "Asian") {
                    dataAsian.push(data[i]);
                }
            }
        }


        // console.log(dataMen);
        // console.log(dataWomen);
        // console.log(dataWhite);
        // console.log(dataAsian);
        // console.log(dataAfricanAmerican);

        function createScatterPlot(data) {

            // TODO: Add a zooming functionality

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
                .attr("cx", function (d) {
                    return x(d.year) - jitterWidth / 2 + Math.random() * jitterWidth;
                })
                .attr("cy", function (d) {
                    return y(d.median_weekly_earn);
                })
                .attr("r", 2.5)
                .style("opacity", function(d){
                    return setOpacity(d, selector);
                })
                .style("fill", function (d) {
                    return setColor(d);
                })
                .on('mouseover', function (d) {
                    d3.select(this).transition()
                        .duration('50')
                        .attr('r', '10');

                })
                .on('mouseout', function (d) {
                    d3.select(this).transition()
                        .duration('50')
                        .attr('r', '2.5');
                })


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
                .attr('y1', d => 0)
                .attr('y2', d => height);


            //drawLegend()
            // draw circles
            // draw text
            // add click event "onclick"
            addLegend()
            function addLegend(){
                //Men
                svg.append("circle")
                    .attr("cx", 15)
                    .attr("cy", 15)
                    .attr("r", 8)
                    .attr("fill", "#45b6fe")
                    .style("opacity", 0.5)
                    .on("click", function(d){
                        selector = "Men"
                        updatePlot(selector);

                    });
                svg.append("text")
                    .attr("x", 30)
                    .attr("y", 21)
                    .attr("stroke", "#0000")
                    .text("Men")
                    .on("click", function(d){
                        selector = d3.select(this).text();
                        updatePlot(selector);

                    });
                //Women
                svg.append("circle")
                    .attr("cx", 15)
                    .attr("cy", 40)
                    .attr("r", 8)
                    .attr("fill", "#e75480")
                    .style("opacity", 0.5)
                    .on("click", function(d){
                        selector = "Women"
                        updatePlot(selector);

                    });
                svg.append("text")
                    .attr("x", 30)
                    .attr("y", 46)
                    .attr("stroke", "#0000")
                    .text("Women")
                    .on("click", function(d){
                        selector = d3.select(this).text();
                        updatePlot(selector);

                    });
                //Both Sexes
                svg.append("circle")
                    .attr("cx", 15)
                    .attr("cy", 65)
                    .attr("r", 8)
                    .attr("fill", "#6a0dad")
                    .style("opacity", 0.5)
                    .on("click", function(d){
                        selector = "Both Sexes"
                        updatePlot(selector);

                    });
                svg.append("text")
                    .attr("x", 30)
                    .attr("y", 70)
                    .attr("stroke", "#0000")
                    .text("Both Sexes")
                    .on("click", function(d){
                        selector = d3.select(this).text();
                        updatePlot(selector);

                    });

                function updatePlot(selector){
                    console.log(selector);
                    //select all circles
                    svg.selectAll("circle")
                        .style("opacity", function (d) {
                            console.log("Test");
                            return setOpacity(d, selector)});
                    //remove ones that don't have selector
                }

                document.getElementById("reset").addEventListener("click", function(d){
                    selector = "all"
                    updatePlot(selector);
                })
            }


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

        function setOpacity(d, selector){
            //console.log(selector);
            if(selector === "all"){
                return 0.5;
            }
            else if(selector === "Men"){
                if(d.sex === "Men"){
                    return 0.5;
                }
                if(d.sex === "Women" || d.sex === "Both Sexes"){
                    return 0.0;
                }
            }
            else if(selector === "Women"){
                if(d.sex === "Women"){
                    return 0.5;
                }
                if(d.sex === "Men" || d.sex === "Both Sexes"){
                    return 0.0;
                }
            }
            else if(selector === "Both Sexes"){
                if(d.sex === "Both Sexes"){
                    return 0.5;
                }
                if(d.sex === "Men" || d.sex === "Women"){
                    return 0.0;
                }
            }
        }
    });

    //implement line graph
    //Clicking on the legend will filter which line graphs to show
    //Clicking Reset resets both views

    let margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 720 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    let svg = d3.select("#linegraph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("id", "scatterdots")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("csv/earnedtopbyyear.csv").then(function(data){
        let parseTime = d3.timeParse("%Y");

        data.forEach(function (d) {
            d.year = parseTime(d.year);
            d.men = +d.men;
            d.women = +d.women;
            d.both_sexes = +d.both_sexes;
        });

        console.log(data);
        let x = d3.scaleTime().range([0, width]);
        let y = d3.scaleLinear().range([height, 0]);

        let  valueline = d3.line()
            .x(function(d) { return x(d.year); })
            .y(function(d) { return y(d.men); });

        let valueline2 = d3.line()
            .x(function(d) { return x(d.year); })
            .y(function(d) { return y(d.women); });

        let valueline3 = d3.line()
            .x(function(d) { return x(d.year); })
            .y(function(d) { return y(d.both_sexes); });

        // Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.year; }));
        y.domain([200, 1800]);

        // Add the valueline path.
        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("stroke", "#45b6fe")
            .attr("d", valueline);

        // Add the valueline2 path.
        svg.append("path")
            .data([data])
            .attr("class", "line")
            .style("stroke", "#e75480")
            .attr("d", valueline2);

        svg.append("path")
            .data([data])
            .attr("class", "line")
            .style("stroke", "#6a0dad")
            .attr("d", valueline3);

        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add the Y Axis
        svg.append("g")
            .call(d3.axisLeft(y));



    })

}
