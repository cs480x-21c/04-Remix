import React, { Component } from 'react';

class PlotlyGraph extends Component {

    state = {
    };

    render() {
        return (
            <div className="cs4802P2Div">
                <div className="imagecontainer">
                    <img img src="/PlotlyGraph.PNG" alt="Tableau Graph"/>
                    <h5>Made with Plotly</h5>
                </div>
            </div>
        );
    }
}
 
export default PlotlyGraph;