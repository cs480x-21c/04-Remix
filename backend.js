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

    });

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

    function createScatterPlot(data){
        var timeFormat = d3.timeFormat("%Y");
        var parseTime = d3.timeParse("%Y");

        data.forEach(function(d) {
            d.year = parseTime(d.year);
            // d.dates = timeFormat(d.dates);
            d.median_weekly_earn = +d.median_weekly_earn;
        });

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

            // Add X axis
        var x = d3.scaleTime()
            .domain(d3.extent(data, function(d) {return (d.year);}))
            .range([ 0, width ]);

        var xAxis = d3.axisBottom(x)
            .tickFormat(timeFormat);


        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([200, 1800])
            .range([ height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Add dots
        svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d.year); } )
            .attr("cy", function (d) { return y(d.median_weekly_earn); } )
            .attr("r", 2.5)
            .style("fill", function(d){
                return setColor(d);
            })
            .on('mouseover', function (d) {
                d3.select(this).transition()
                    .duration('50')
                    .attr('r', '6')

            })
            .on('mouseout', function (d) {
                d3.select(this).transition()
                    .duration('50')
                    .attr('r', '2.5')
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

}