import React from 'react';
import HeaderBar from '../components/HeaderBar'
import FooterBar from "../components/FooterBar";
import FadeIn from "../components/webs_sourced_snippet/FadeIn";
import axios from 'axios';

let negateImageInCSS = (ev) => {
    ev.target.class = 'no-imagecontainer'
}

let evenSectionOrderReverse = (index) => {
    if(index % 2 !== 0){
        return "homepagesection-even";
    }
    return "homepagesection-odd";
}

class ProjectsPageView extends React.Component{

    state = {
            projectPageSections: [],
    };

    componentDidMount(){
        axios.get('https://karoad-psite-api.herokuapp.com/api/projectspage/')
          .then(res => {
              console.log(res)
            this.setState({ projectPageSections:res.data });
        })
    }
    

    render(){
        return(
            <div className="pageFlex">
                    <HeaderBar/>

                        <div className='bodyCols'>
                            <div className="homePageList"> 
                                
                                {this.state.projectPageSections.map((section) => {
                                    console.log(typeof(section.project_image));  
                                    if(typeof(section.project_image) !== 'string'){
                                        return (
                                            <FadeIn delay={1000 + section.id * 500} duration={1000}>
                                            <div className="homepagesection-noimage" key={section.id}>
                                                <div className="sectioncontainer">
                                                    
                                                    <h4>
                                                        {section.project_name}
                                                    </h4>
                            
                                                    <h5>
                                                        {section.project_description}
                                                    </h5>
                                                </div>
                                            </div>
                                            </FadeIn>
                                        );
                                    }
                                    return (
                                        <FadeIn delay={1000 + section.id * 500} duration={1000}>
                                        <div className={evenSectionOrderReverse(section.id)} key={section.id}>
                                            <div className="sectioncontainer">
                                                <h4>
                                                    {section.project_name}
                                                </h4>
                        
                                                <h5>
                                                    {section.project_description}
                                                </h5>
                                            </div>
                        
                                            <div className="imagecontainer">
                                                <img img src={section.project_image}  onError={negateImageInCSS} alt=""/>
                                            </div>
                                        </div>
                                        </FadeIn>
                                    );
                                })}
                            </div>
                        </div>

                    <FooterBar/>
                </div>
        );
    }
}

export default ProjectsPageView;