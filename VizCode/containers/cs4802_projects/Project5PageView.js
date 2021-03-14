import React from 'react';
import HeaderBar from '../../components/HeaderBar';
import ProjectNav from '../../components/cs4802_components/ProjectNav';

class Project5PageView extends React.Component{

    state = {
            
    };

    render(){
        return(
            <div className="pageFlex">
                <HeaderBar/>
                <div className='homePageList'>
                    <ProjectNav/>
                    <h5>
                    This project has not been completed yet!
                    </h5>
                </div>
            </div>
        );
    }
}

export default Project5PageView;
