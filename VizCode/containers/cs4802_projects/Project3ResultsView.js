import React from 'react';
import HeaderBar from '../../components/HeaderBar';
import ProjectNav from '../../components/cs4802_components/ProjectNav';
import Project3ExperimentViz from '../../components/cs4802_components/project3comps/Project3ExperimentViz'

class Project3ResultsView extends React.Component{

    state = {
            
    };

    render(){
        return(
            <div className="pageFlex">
                <HeaderBar/>
                <div className='homePageList'>
                    <ProjectNav/>
                    <Project3ExperimentViz></Project3ExperimentViz>
                </div>
            </div>
        );
    }
}

export default Project3ResultsView;
