import React, { Component } from 'react';
import * as d3 from 'd3';

class D3Graph extends Component {

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = { windowWidth: window.innerWidth,
                   windowHeight: window.innerHeight };
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
    let w = windowWidth / 3;
    let h = windowHeight / 3; 

    //The following code for a d3 scatterplot was created in tandom with this tutorial from the d3 site:
    //https://www.d3-graph-gallery.com/graph/scatter_basic.html
    //I added a custom method of mapping manufacturers to different colors and integrated it with react.
    var margin = {top: 10, right: 30, bottom: 30, left: 60};

    //Create Background Region
    var svg = d3.select(this.myRef.current)
    .append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .style("background-color", "white")
    .append("g") //Add graph tag
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

    var colors = ["red",
                  "orange",
                  "yellow",
                  "green",
                  "blue",
                  "indigo",
                  "violet",
                  "pink",
                  "grey",
                  "cyan",
                  "purple",
                  "#691F01",
                  "#964514"];

    var manufacturers = [];
    //Load data and the magic happens
    d3.csv("/cars-sample.csv").then(function(data) {
        data.forEach(function(d) {
          d.MPG = +d.MPG;
          d.Cylinders = +d.Cylinders;
          d.Displacement = +d.Displacement;
          d.Horsepower = +d.Horsepower;
          d.Weight = +d.Weight;
          d.Acceleration = +d.Acceleration;
          d["Model.Year"] = +d["Model.Year"];
          
        if(manufacturers.indexOf(d.Manufacturer) === -1){
            manufacturers.push(d.Manufacturer);
        }
          
        });
        var x = d3.scaleLinear()
            .domain([0, 5000])
            .range([ 0, w ]);
        
        svg.append("g")
            .attr("transform", "translate(0," + h + ")")
            .call(d3.axisBottom(x).tickValues([2000,3000,4000, 5000]));
        
        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, 40])
            .range([ h, 0]);

             // text label for the x axis
        svg.append("text")             
            .attr("transform",
                    "translate(" + (w/2) + " ," + 
                                (h + margin.top + 20) + ")")
            .style("text-anchor", "middle")
            .text("MPG");


        // text label for the y axis
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x",0 - (h / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Weight");      

        svg.append("g")
        .call(d3.axisLeft(y).tickValues([10, 20, 30, 40, 50, 60]));

        svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d.Weight); } )
            .attr("cy", function (d) { return y(d.MPG); } )
            .attr("r",  function (d) { return 0.0025 * d.Weight; } )
            .style("opacity", 0.5)
            .style("fill", function (d) { return colors[manufacturers.indexOf(d.Manufacturer)]; })

      });

  }

  componentWillUnmount() {
    window.addEventListener("resize", this.handleResize);
  } 

  render() {
    return <div className="cs4802P2Div">
                <div className="imagecontainer">
                  <div id="d3image" ref={this.myRef}>
                  </div>  
                  <h5>Made with D3</h5>
                </div>
           </div>
  }
} 

export default D3Graph;