var width = 960;
var height = 500;

// D3 Projection
var projection = d3.geoAlbersUsa()
				   .translate([width/2, height/2])    // translate to center of screen
				   .scale([1000]);          // scale things down so see entire US
        
// Define path generator
var path = d3.geoPath()               // path generator that will convert GeoJSON to SVG paths
		  	 .projection(projection);  // tell path generator to use albersUsa projection

		
function resetGraph(currentState, currentYear){

    //Create SVG element and append map to the SVG
    var svg = d3.select('#map')
                .append("svg")
                .attr("width", width)
                .attr("height", height);
            
    // Append Div for tooltip to SVG
    var div = d3.select("body")
                .append("div")   
                .attr("class", "tooltip")               
                .style("opacity", 0);
                
    //BAR CHART 

    var width2 = 2500 ,
            height2 = 1150;

    var svg2 = d3.select("#bar")
            .append("svg")
            .attr("width", width2)
            .attr("height", height2);


    var xScale = d3.scaleBand().range ([0, 2500]).padding(0.4),
    yScale = d3.scaleLinear().range ([500, 0]);

    var g = svg2.append("g")
            .attr("transform", "translate(" + 30 + "," + 90 + ")");


    // Load in my states data!
    d3.csv("master.csv", function(data) {

    var convert_states = {"Alabama":	"AL", "Alaska":	"AK", "Arizona":"AZ", "Arkansas":"AR", "California":"CA", 
    "Colorado":"CO", "Connecticut": "CT", "Delaware": "DE", "Florida":"FL", "Georgia":"GA", "Hawaii":	"HI",
    "Idaho"	:"ID", "Illinois"	:"IL", "Indiana":"IN", "Iowa":"IA", "Kansas":"KS", "Kentucky":	"KY", 
    "Louisiana":	"LA", "Maine":	"ME", "Maryland":	"MD", "Massachusetts": "MA", "Michigan":"MI",
    "Minnesota":	"MN", "Mississippi":	"MS", "Missouri":	"MO",  "Montana":	"MT", "Nebraska":"NE",
    "Nevada":	"NV", "New Hampshire":"NH", "New Jersey":	"NJ", "New Mexico":"NM", "New York":"NY", "North Carolina":"NC",
    "North Dakota":	"ND", "Ohio":	"OH", "Oklahoma":"OK" , "Oregon":	"OR", "Pennsylvania":"PA",
    "Rhode Island":	"RI", "South Carolina":"SC", "South Dakota":"SD", "Tennessee":"TN", "Texas":"TX",
    "Utah":	"UT", "Vermont":	"VT", "Virginia":	"VA",  "Washington":	"WA", "West Virginia":"WV",
    "Wisconsin":"WI", "Wyoming": "WY"}

    convert = {}
    for(var key in convert_states){
        convert[convert_states[key]] = key
    }

        xScale.domain(data.map(function(d) { return d.year; }));
        yScale.domain([d3.min(data, function(d) { return(d.occurances); }),7500]);

        console.log(d3.max(data, function(d) { return(d.occurances); }))


        g.append("g")
            .attr("transform", "translate(0," + 500 + ")")
            .call(d3.axisBottom(xScale));

        g.append("g")
            .call(d3.axisLeft(yScale).tickFormat(function(d){
                return  d;
            }).ticks(15))
            .append("text")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("occurances");
        
        var data2 = []
        for (var i = 0; i < data.length; i++) {
           
            if ((data[i].state) == (convert_states[currentState])){
                data2.push(data[i])
            }
        }
        console.log(data2)
        
        g.selectAll(".bar")
                    .data(data2)
                    .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function(d) { return xScale(d.year); })
                    .attr("y", function(d) { return yScale(d.occurances); })
                    .attr("width", xScale.bandwidth())
                    .attr("height", function(d) { return 500 - yScale(d.occurances); })
                    .on('mousedown', function(d) {
                        d3.select("svg").remove();
                        d3.select("svg").remove(); 
                        d3.select('h1').text(d.name + " " + d.year)
                        resetGraph(currentState, d.year)
                    })   
                    
                

        //console.log("hell!!!!oooo")
        // Load GeoJSON data and merge with states data
        d3.json("us-states.json", function(json) {
        // Loop through each state data value in the .csv file


        for (var i = 0; i < data.length; i++) {
            if (data[i].year == currentYear){
                // Grab State Name
                var dataState = convert[data[i].state];

                var dataName = data[i].name;
                
                // Grab data value 
                var dataValue = data[i].occurances;

            // console.log(dataState, dataValue)
                // Find the corresponding state inside the GeoJSON
                for (var j = 0; j < json.features.length; j++)  {
                    var jsonState = json.features[j].properties.name;
                    if (dataState == jsonState) {

                    // Copy the data value into the JSON
                    json.features[j].properties.occurances = dataValue; 
                    json.features[j].properties.firstName = dataName; 

                    // Stop looking through the JSON
                    break;
                    }
                }
            }
        }
                
        // Bind the data to the SVG and create one path per GeoJSON feature
        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("stroke", "#fff")
            .style("stroke-width", "1")
            .style("fill", function(d) {
                // Get data value
                var value = d.properties.occurances;
                //console.log(";;;;;",value, d.properties.name)

                if (value<101) {
                    return "rgb(178,235,249)"
                } 
                else if(value < 301){
                    return "rgb(134,223,249)"
                }
                else if(value < 501){
                    return "rgb(106,182,233)"
                }
                else if(value < 1001){
                    return "rgb(106,182,233)"
                }
                else if(value < 2001){
                    return "rgb(27,138,202)"
                }
                else if(value < 3001){
                    return "rgb(6,117,176)"
                }
                else if(value <= 4000){
                    return "rgb(7,71,151)"
                }
                else if(value > 4000){
                    return "rgb(10,47,128)"
                }
                else {
                //If value is undefined…
                return "rgb(213,222,217)";
                }
            
        })
        .on('mousedown', function(d) {
            d3.select("svg").remove();
            d3.select("svg").remove(); 
            d3.select('h1').text(d.properties.firstName + " " + currentYear)
            resetGraph(d.properties.name, currentYear)
        })
        ;  
                
                
        /*
        // Modified Legend Code from Mike Bostock: http://bl.ocks.org/mbostock/3888852
        var legend = d3.select("body").append("svg")
                        .attr("class", "legend")
                        .attr("width", 140)
                        .attr("height", 200)
                        .selectAll("g")
                        .data(color.domain().slice().reverse())
                        .enter()
                        .append("g")
                        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

            legend.append("rect")
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", color);

            legend.append("text")
                .data(legendText)
                .attr("x", 24)
                .attr("y", 9)
                .attr("dy", ".35em")
                    .text(function(d) { return d; });
                    
                    */
            
        })
    })
    };

var currentState = "NY"
    var currentYear = "1950"
    resetGraph(currentState, currentYear)