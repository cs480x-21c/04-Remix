import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from 'axios'
import fileDownload from 'js-file-download'
import FadeIn from "./webs_sourced_snippet/FadeIn";
 


class HeaderBar extends Component {

    state = {
        resumeLink: [],
    };

    componentDidMount(){
        axios.get('https://karoad-psite-api.herokuapp.com/api/homepage/resume/')
          .then(res => {
              console.log(res)
            this.setState({ resumeLink:res.data.results });
        })
    }

    render() {
        return (
        <header>

            <div className="logo">
                <FadeIn delay={250} >
                    <h1>
                    Kenny Rhodes
                    </h1>
                </FadeIn>
            </div>

            <div className="navigationMenu">

                <ul>

                <li>
                <FadeIn delay={500}>
                    <Button className="navButton" to="/" component={Link}>
                        HomePage
                    </Button>
                </FadeIn>
                </li>

                <li>
                <FadeIn delay={750}>
                    <Button className="navButton" to="/projects" component={Link}>
                        Projects
                    </Button>
                </FadeIn>
                </li>

                </ul>
                
            </div>
            
        </header>
        );
    }
}

 
export default HeaderBar;

/* <li>
                {this.state.resumeLink.map((resume) => {
                    return (
                        <Button className="navButton" key={resume.id} onClick={() => {handleDownload(resume.resume_pdf, 'ken-rhodes-resume.pdf')}} component={Link}>Resume</Button>
                    )
                    })}
                </li> */
// let handleDownload = (url, filename) => {
//     axios.get(url, {
//         responseType: 'blob',
//     }).then((res) => {
//         fileDownload(res.data, filename)
//     })
// }