import React from 'react';
import HeaderBar from '../../components/HeaderBar';
import ProjectNav from '../../components/cs4802_components/ProjectNav';
import D3Graph from '../../components/cs4802_components/project2comps/D3Graph'
import TableauGraph from '../../components/cs4802_components/project2comps/TableauGraph'
import FlourishGraph from '../../components/cs4802_components/project2comps/FlourishGraph'
import PlotlyGraph from '../../components/cs4802_components/project2comps/PlotlyGraph'
import MatPlotLibGraph from '../../components/cs4802_components/project2comps/MatPlotLibGraph'

class Project2PageView extends React.Component{

    state = {
        resumeLink: [],
  
    };

    render(){
        
        return(
            <div className="pageFlex">
                <HeaderBar/>
                <div className='homePageList'>
                    <ProjectNav/>
                    
                    <D3Graph/>
                    <TableauGraph/>
                    <FlourishGraph/>
                    <PlotlyGraph/>
                    <MatPlotLibGraph/>
                    
                </div>
            </div>
        );
    }
}

export default Project2PageView;
