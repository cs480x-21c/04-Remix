import React from 'react';
import ProjectNav from '../../components/cs4802_components/ProjectNav'
import HeaderBar from '../../components/HeaderBar'

class CS4802PageView extends React.Component{

    state = {
            
    };

    render(){
        return(
            <div>
                 <div className="pageFlex">
                    <HeaderBar/>
                    <div className='homePageList'>
                        <ProjectNav/>
                        <h2>
                            This website will host Kenny Rhodes' projects for the course.
                        </h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default CS4802PageView;
