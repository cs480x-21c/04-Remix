import React, { Component } from 'react';
import { Button } from 'antd';
 
class FooterBar extends Component {
  render() {
    return (
      <footer>

        <div className="navigationMenu">
              <ul>
                <li>
                  <Button className="navButton" href="https://karoad-psite-api.herokuapp.com/admin/" target="_blank" type='ghost'>
                    Secure
                  </Button>
                </li>
              </ul>
        </div>        
      </footer>
    );
  }
}
 
export default FooterBar;