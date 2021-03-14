import React from 'react';
import HeaderBar from '../../components/HeaderBar'
import ProjectNav from '../../components/cs4802_components/ProjectNav'
import MyCircle from '../../components/cs4802_components/project1comps/MyCircle'
import MyRect from '../../components/cs4802_components/project1comps/MyRect'
import MyLine from '../../components/cs4802_components/project1comps/MyLine'
import MyPoly from '../../components/cs4802_components/project1comps/MyPoly'

class Project1PageView extends React.Component{

    state = {
            
    };

    render(){
        return(
            <div className="pageFlex">
                <HeaderBar/>
                <div className='homePageList'>
                    <ProjectNav/>
                    <MyCircle/>
                    <MyLine/>
                    <MyRect/>
                    <MyPoly/>
                </div>
                
            </div>
        );
    }
}

export default Project1PageView;
