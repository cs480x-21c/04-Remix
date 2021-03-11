import {Component, createRef} from "preact";
import * as d3 from "d3";

import {COVID_DATA} from "./Data";

const MARGIN = {LEFT: 0, RIGHT: 0, BOTTOM: 0, TOP: 0}
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 800 - MARGIN.TOP - MARGIN.BOTTOM;

class BubbleChart extends Component {
    constructor(props) {
        super(props);

        this.containerRef = createRef();
    }

    drawChart() {
        let svg = d3.select(this.containerRef.current)
            .append("svg")
            .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
            .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);

        let graph = svg.append("g")
            .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

        let caseData = COVID_DATA.map(d => {
            return {name: d.Date, value: d.Cases}
        });

        let data = d3.pack()
            .size([WIDTH, HEIGHT])
            .padding(3)
            (d3.hierarchy({children: caseData})
                .sum(d => d.value));

        // Find radius of largest circle
        let largestRadius = data.leaves().sort((a, b) => (a.r / b.r))[0].r;

        graph.selectAll("g")
            .data(data.leaves())
            .enter()
            .append("circle")
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", d => d.r)
            .style("fill", d => {
                if (this.props.selectedDate !== null) {
                    if (d.data.name === this.props.selectedDate) {
                        return "#AC2B37";
                    } else {
                        return "#8F6468";
                    }
                } else {
                    return "#AC2B37";
                }
            })
            .style("cursor", "pointer")
            .on("mousedown", (e, d) => {
                this.props.callback(d.data.name);
            });

        graph.selectAll("g")
            .data(data.leaves())
            .enter()
            .append("text")
            .attr("x", d => d.x)
            .attr("y", d => d.y)
            .style("text-anchor", "middle")
            .style("alignment-baseline", "middle")
            .style("font-size", d => `${4 * ((d.r / largestRadius) ** 2)}em`)
            .style("fill", "#000000")
            .style("cursor", "pointer")
            .text(d => d.data.name)
            .on("mousedown", (e, d) => {
                this.props.callback(d.data.name);
            });
    }

    componentDidUpdate(previousProps, previousState, snapshot) {
        this.containerRef.current.removeChild(this.containerRef.current.firstChild);
        this.drawChart();
    }

    componentDidMount() {
        this.drawChart();
    }

    render() {
        return (
            <div ref={this.containerRef}/>
        )
    }
}

export default BubbleChart;