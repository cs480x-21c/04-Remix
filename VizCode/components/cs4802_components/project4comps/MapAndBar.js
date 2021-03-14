import React, { Component } from 'react';
import * as d3 from 'd3';
import { svg } from 'd3';

class MapAndBar extends Component {

  constructor(props) {
    super(props);
    this.myUSARef = React.createRef();
    this.USABar = React.createRef();
    this.state = { windowWidth: window.innerWidth,
                   windowHeight: window.innerHeight, 
                   USAData: []
                  };
  }

  handleResize = (e) => {
    this.setState({
      'windowWidth': window.innerWidth,
      'windowHeight': window.innerHeight,
    });
  };

  componentDidMount() {
    //Responsive Sizing
    this.handleResize()
    let { windowWidth, windowHeight } = this.state; 
    let w = windowWidth;
    let h = windowHeight; 

		var svgUS = d3.select(this.myUSARef.current)
    .append("svg")
    .attr("width", w)
    .attr("height", h);

    d3.csv("/USData.csv").then(function(USGDPData) {
      USGDPData.forEach(function(d) {
        d.Rank = +d.Rank;
        d.State = d.State;
        d.GDP = +d.GDP;
        d.PercentNational = +d.PercentNational;
        d.gdpPerCapita = +d.gdpPerCapita;
        d.Region = +d.Region;
      });
      var color = d3.scaleLinear().domain([1,56]).range(["white", "green"]);
      var width = 960;
      var height = 500;
      var projection = d3.geoAlbersUsa()
      .translate([width/2, height/2])    // translate to center of screen
      .scale([500]);          // scale things down so see entire US

      //Define path generator
      var path = d3.geoPath()
              .projection(projection);
             
      //Load in GeoJSON data
      d3.json("/us-states.json").then(data => {
        svgUS.selectAll("path")
          .data(data.features)
          .enter()
          .append("path")
          .attr("id", function(d) { 
                                    return d.properties.name;
                                  })
          .attr("d", path)
          .attr("stroke", "grey")
          .attr("fill", function(d) {  
                                      let colorC = "white"
                                      USGDPData.forEach(function(GDPD) {
                                        // Function goes in here.
                                        console.log(GDPD["Rank"])
                                        if(GDPD["State"] === d.properties.name){
                                          colorC = color(GDPD["Rank"]);
                                        }
                                      })
                                      return colorC
                                    })
          .on('click',function(d){
            
           d3.select(this).attr("opacity", "0.7");
            
          });
      });

      ///////////////////////
      // Chart Size Setup
      var margin = { top: 35, right: 0, bottom: 30, left: 40 };

      var width = 960 - margin.left - margin.right;
      var height = 500 - margin.top - margin.bottom;
      
      var chart = d3.select(".chart")
          .attr("width", 960)
          .attr("height", 500)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      ///////////////////////
      // Scales
      var x = d3.scaleOrdinal()
          .domain(USGDPData.map(function(d) { return d['State']; }))

      var y = d3.scaleLinear()
          .domain([0, d3.max(USGDPData, function(d) { return d['gdpPerCapita']; }) * 1.1])
          .range([height, 0]);
          
      ///////////////////////
      // Axis
      var xAxis = d3.axisBottom()
      .scale(x);

      var yAxis = d3.axisLeft()
      .scale(y);
          

      chart.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      chart.append("g")
          .attr("class", "y axis")
          .call(yAxis);

      ///////////////////////
      // Title
      chart.append("text")
        .text('Bar Chart!')
        .attr("text-anchor", "middle")
        .attr("class", "graph-title")
        .attr("y", -10)
        .attr("x", width / 2.0);

      ///////////////////////
      // Bars
      var bar = chart.selectAll(".bar")
          .data(USGDPData)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d['State']); })
          .attr("y", height)
          .attr("width", 20)
          .attr("height", 0);

      ///////////////////////
      // Tooltips
      var tooltip = d3.select("body").append("div")
          .attr("class", "tooltip");

      bar.on("mouseover", function(d) {
            tooltip.html(d['value'])
                .style("visibility", "visible");
          })
          .on("mouseout", function(d) {
            tooltip.style("visibility", "hidden");
          });

    });

    //-----------------------------------------------------------------------------------------------------------------------------------------
  }

  componentWillUnmount() {
    window.addEventListener("resize", this.handleResize);
  } 

  render() {
    return <div className="cs4802P2Div">

                <div>
                  <div ref={this.myUSARef}>
                  </div>  
                  <svg class="chart"></svg>
                </div>
           </div>
  }
} 

export default MapAndBar;





/**
 * //Create Background Region

    var svgUS = d3.select(this.myUSARef.current)
      .append("svg")
      .attr("width", w)
      .attr("height", h);
    
    var div = d3.select(this.myUSARef.current)
      .append("div")   
      .attr("class", "tooltip")               
      .style("opacity", 0);

    //Load USA Data
    d3.csv("/USData.csv").then(function(USGDPData) {
      USGDPData.forEach(function(d) {
        d.Rank = +d.Rank;
        d.State = d.State;
        d.GDP = +d.GDP;
        d.PercentNational = +d.PercentNational;
        d.gdpPerCapita = +d.gdpPerCapita;
        d.Region = +d.Region;
      });
      var width = w;
      var height = h;

      // D3 Projection
      var projection = d3.geoAlbersUsa()
                .translate([width/2, height/2])    // translate to center of screen
                .scale([350]);          // scale things down so see entire US
              
      // Define path generator
      var path = d3.geoPath()               // path generator that will convert GeoJSON to SVG paths
              .projection(projection);  // tell path generator to use albersUsa projection
          
      // Define linear scale for output
      var color = d3.scaleQuantize([1, 10], d3.schemeBlues[9])

      
        // Load GeoJSON data and merge with states data
        d3.json("/us-states.json").then(json => {
          // Loop through each state data value in the .csv file
          for (var i = 0; i < USGDPData.length; i++) {
            // Grab State Name
            var dataState = USGDPData[i].state;

            // Grab data value 
            var dataValue = USGDPData[i].gdpPerCapita;

            // Find the corresponding state inside the GeoJSON
            for (var j = 0; j < json.features.length; j++)  {
              var jsonState = json.features[j].properties.name;

              if (dataState === jsonState) {

              // Copy the data value into the JSON
              json.features[j].properties.visited = dataValue; 

              // Stop looking through the JSON
              break;
              }
            }
          }
            
          // Bind the data to the SVG and create one path per GeoJSON feature
          svgUS.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("stroke", "#fff")
            .style("stroke-width", "1")
            .att("id", data.properties.name)
            .style("fill", function(d) {

              // Get data value
              var value = d.properties.visited;

              if (value) {
              //If value exists…
              return color(value);
              } else {
              //If value is undefined…
              return "grey";
              }
            }).on("mouseover", function(event, d) {      
              div.transition()        
                   .duration(200)      
                   .style("opacity", .9);      
                   div.text(d.place)
                   .style("left", (event.pageX) + "px")     
                   .style("top", (event.pageY - 28) + "px");    
          })   
        
            // fade out tooltip on mouse out               
            .on("mouseout", function(d) {       
                div.transition()        
                   .duration(500)      
                   .style("opacity", 0);   
            });
                
        });
    });
 */

/**
 * //Load EUData Data
    //Create SVG
		var svgEU = d3.select(this.myEURef.current)
      .append("svg")
      .attr("width", w)
      .attr("height", h);
    d3.csv("/EUData.csv").then(function(data) {
      data.forEach(function(d) {
        d.Name = d.Name;
        d.Accession = +d.Accession;
        d.Population = +d.Population;
        d.Areakm2 = +d.Areakm2;
        d.GDP = +d.GDP;
        d.gdpPerCapita = +d.gdpPerCapita;
        d.Currency = d.Currency;
        d.Gini = +d.Gini;
        d.HDI = +d.HDI;
        d.MEPs = +d.MEPs;
        d.Languages = d.Languages;
      });

      //console.log(data)
      var projection = d3.geoMercator() //utiliser une projection standard pour aplatir les pôles, voir D3 projection plugin
								   .center([ 13, 52 ]) //comment centrer la carte, longitude, latitude
								   .translate([ w/2, h/2 ]) // centrer l'image obtenue dans le svg
								   .scale([ w/1.8 ]); // zoom, plus la valeur est petit plus le zoom est gros 

			//Define path generator
			var path = d3.geoPath()
							 .projection(projection);
               
			//Load in GeoJSON data
			d3.json("/ne_50m_admin_0_countries_simplified.json").then(data => {
        svgEU.selectAll("path")
           .data(data.features)
           .enter()
           .append("path")
           .attr("d", path)
           .attr("stroke", "grey")
           .attr("fill", "red");
      });
    });
 */