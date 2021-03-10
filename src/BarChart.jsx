import {Component, createRef} from "preact";
import * as d3 from "d3";

import {COVID_DATA} from "./Data";

const MARGIN = 80;
const WIDTH = 900 - (2 * MARGIN);
const HEIGHT = 400 - (2 * MARGIN);

class BarChart extends Component {
    constructor(props) {
        super(props);

        this.containerRef = createRef();
    }

    componentDidMount() {
        let xScale = d3.scaleBand()
            .range([0, WIDTH])
            .domain(COVID_DATA.map((d) => d.Date))
            .padding(0.5)

        let yScale = d3.scaleLinear()
            .range([HEIGHT, 0])
            .domain([0, 10]); // max of vals

        let svg = d3.select(this.containerRef.current)
            .append("svg")
            .attr("width", WIDTH + (MARGIN * 2))
            .attr("height", HEIGHT + (MARGIN * 2));

        let graph = svg.append("g")
            .attr("transform", `translate(${MARGIN}, ${MARGIN})`);

        graph.append("g")
            .call(d3.axisLeft(yScale));

        graph.append("g")
            .attr("transform", `translate(0, ${HEIGHT})`)
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .attr("x", 10)
            .attr("y", 0)
            .attr("dy", ".35em")
            .attr("transform", "rotate(90)")
            .style("text-anchor", "start");

        graph.append("g")
            .selectAll()
            .data(COVID_DATA)
            .enter()
            .append("rect")
            .attr("x", (d) => xScale(d.Date))
            .attr("y", (d) => yScale(d.Cases))
            .attr("height", (d) => HEIGHT - yScale(d.Cases))
            .attr("width", xScale.bandwidth)
            .style("fill", "#AC2B37");

        graph.append("text")
            .attr("x",  -(HEIGHT / 2))
            .attr("y", -30)
            .attr("transform", "rotate(-90)")
            .attr("text-anchor", "middle")
            .text("Cases")

        graph.append("text")
            .attr("x", (WIDTH / 2))
            .attr("y", HEIGHT + MARGIN)
            .attr("text-anchor", "middle")
            .text("Date");
    }

    render() {
        return (
            <div ref={this.containerRef}/>
        )
    }
}

export default BarChart;