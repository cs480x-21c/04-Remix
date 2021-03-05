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
            let svg = d3.select("#my_dataviz")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
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
                .style("opacity", 0.5)
                .style("fill", function (d) {
                    return setColor(d);
                })
                .on('mouseover', function (d) {
                    d3.select(this).transition()
                        .duration('50')
                        .attr('r', '10')
                        .style("opacity", 1.0);

                })
                .on('mouseout', function (d) {
                    d3.select(this).transition()
                        .duration('50')
                        .attr('r', '2.5')
                        .style("opacity", 0.5);
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

            // TODO: Fix this

            let ordinal = d3.scaleOrdinal()
                .domain(["Men", "Women", "Both Sexes"])
                .range(["#45b6fe", "#e75480", "#6a0dad"]);

            svg.append("g")
                .attr("class", "legendOrdinal")
                .attr("transform", "translate(20,20)");

            let legendOrdinal = d3.legendColor()
                .shape("path", d3.symbol().type(d3.symbolCircle).size(100)())
                .shapePadding(10)
                .scale(ordinal);

            svg.select(".legendOrdinal")
                .call(legendOrdinal)
                .on("click", function (d) {
                    //select all the dots who have the same Sex as the legend one clicked

                    //Check if opacity is already 0

                    //Set to either 0 opacity or .5
                    //d3.selectAll("." + d.name).transition().style("opacity", currentOpacity == .5 ? 0:.5)

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

    document.getElementById("switcher").addEventListener("click", onClick => {
        d3.select("svg").remove();
        createBarGraph();
    });

    function createBarGraph(){

        var margin = {top: 10, right: 30, bottom: 30, left: 60},
            width = 720 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        d3.csv("csv/earnedtopbyyear.csv").then( function (data){


        });

    }

}
