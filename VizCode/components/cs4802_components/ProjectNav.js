import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

class ProjectNav extends Component {

    state = {
    };

    render() {
        return (
            <div className="navigationMenu center">

                <ul>

                    <li>
                        <Button className="navButton" to="/projects/cs4802/project1" component={Link}>
                            a1
                        </Button>
                    </li>

                    <li>
                        <Button className="navButton" to="/projects/cs4802/project2" component={Link}>
                            a2
                        </Button>
                    </li>

                    <li>
                        <Button className="navButton" to="/projects/cs4802/project3/disclaimer" component={Link}>
                            a3
                        </Button>
                    </li>

                    <li>
                        <Button className="navButton" to="/projects/cs4802/project4" component={Link}>
                            a4
                        </Button>
                    </li>

                    <li>
                        <Button className="navButton" to="/projects/cs4802/project5" component={Link}>
                            a5
                        </Button>
                    </li>
                </ul>
                
            </div>
        );
    }
}
 
export default ProjectNav;