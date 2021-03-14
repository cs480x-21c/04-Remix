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

class HomePageView extends React.Component{

    state = {
        homePageSections: [],
    };

    componentDidMount(){
        axios.get('https://karoad-psite-api.herokuapp.com/api/homepage/') //
          .then(res => {
              console.log(res)
            this.setState({ homePageSections:res.data });
        })
    }

    render(){
        return(
            <div className="pageFlex">
                    <HeaderBar/>

                        <FadeIn delay={1500} duration={1000}>   
                            <div className='sideInfo'>
                                    <div className='rotate'>
                                        <p>
                                            karhodes@wpi.edu
                                        </p>
                                    </div>
                            </div>
                        </FadeIn>

                            <div className="homePageList"> 
                                
                                {this.state.homePageSections.map((section) => {
                                    //console.log(typeof(section.section_image));  
                                    if(typeof(section.section_image) !== 'string'){
                                        return (
                                            <FadeIn delay={1000 + section.id * 500} duration={1000}>
                                            <div className="homepagesection-noimage" key={section.id}>
                                                <div className="sectioncontainer">
                                                    
                                                    <h4> 
                                                        {section.section_name}
                                                    </h4>
                            
                                                    <h5>
                                                        {section.section_text}
                                                    </h5>
                                                </div>
                                            </div>
                                            </FadeIn>
                                        );
                                    }
                                    return (
                                        <FadeIn delay={1000 + section.id * 500} duration={1000}>
                                        <div className={evenSectionOrderReverse(section.section_priority)} key={section.id}>
                                                <div className="sectioncontainer">
                                                    <h4>
                                                        {section.section_name}
                                                    </h4>
                            
                                                    <h5>
                                                        {section.section_text}
                                                    </h5>
                                                </div>
                                            <div className="imagecontainer">
                                                <img img src={section.section_image}  onError={negateImageInCSS} alt=""/>
                                            </div>
                                        </div>
                                        </FadeIn>
                                    );
                                })}
                            </div>

                    <FooterBar/>
                </div>
        );
    }
}

export default HomePageView;

//'http://127.0.0.1:8000/api/homepage'
//'https://jsonplaceholder.typicode.com/users'

//this.state.homePageSections.map((section) => <li key={section.id}>{section.section_name}</li>)