import React from 'react';
import HeaderBar from '../../components/HeaderBar';
import ProjectNav from '../../components/cs4802_components/ProjectNav';
import MapAndBar from '../../components/cs4802_components/project4comps/MapAndBar'

class Project4PageView extends React.Component{

    state = {
            
    };

    render(){
        return(
            <div className="pageFlex">
                <HeaderBar/>
                <div className='homePageList'>
                    <ProjectNav/>
                    <MapAndBar></MapAndBar>
                </div>
            </div>
        );
    }
}

export default Project4PageView;
