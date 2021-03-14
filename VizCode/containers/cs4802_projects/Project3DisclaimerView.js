import React from 'react';
import HeaderBar from '../../components/HeaderBar';
import ProjectNav from '../../components/cs4802_components/ProjectNav';
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

class Project3DisclaimerView extends React.Component{

    state = {
            
    };

    render(){
        return(
            <div className="pageFlex">
                <HeaderBar/>
                <div className='homePageList'>
                    <ProjectNav/>
                    <h2>Disclaimer</h2>
                    <h3>In this experiment you will be asked to judge what is the percent of a smaller value to a 
                        larger value in three charts. </h3>
                    <br/>
                    <h3>We won't record any other information from you except your answers. </h3>
                    <Button className="navButton" to="/projects/cs4802/project3/experiment" component={Link}>
                        Continue
                    </Button>
                </div>
            </div>
        );
    }
}

export default Project3DisclaimerView;
