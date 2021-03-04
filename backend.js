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
        // set the dimensions and margins of the graph
        let margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        // set the ranges
        let x = d3.scaleLinear().range([0, width]);
        let y = d3.scaleLinear().range([height, 0]);

        
        // append the svg obgect to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        let svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.year; }));
        y.domain([100, 1800]);

        // Add the scatterplot
        svg.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 3)
            .attr("cx", function(d) { return x(d.year); })
            .attr("cy", function(d) { return y(d.median_weekly_earn); })
            .style("fill", function(d){
                return setColor(d)});

        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))

        // Add the Y Axis
        svg.append("g")
            .call(d3.axisLeft(y));
    }

    function setColor(d) {
        //console.log(d.sex);
        switch (d.sex) {
            case "Men":
                return d3.color("red");
            case "Women":
                return d3.color("#black");
            default:
                return d3.color("white");

        }
    }




}