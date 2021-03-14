import React from 'react';
import HeaderBar from '../../components/HeaderBar';
import ProjectNav from '../../components/cs4802_components/ProjectNav';
import DatabaseExample from '../../components/cs4802_components/project3comps/DatabaseExample'

class Project3PageView extends React.Component{

    state = {
            
    };

    render(){
        return(
            <div className="pageFlex">
                <HeaderBar/>
                <div className='homePageList'>
                    <ProjectNav/>
                    <h2> Experiment </h2>
                    <DatabaseExample></DatabaseExample>
                </div>
            </div>
        );
    }
}

export default Project3PageView;
