import React, { Component } from 'react';
import logo from './logo.svg';
import './css/WelcomeBanner.scss';

class WelcomeBanner extends Component{
  render(){
    return(
      <div className="banner">
        <div className="banner-contents">
          <img src={logo} className="app-logo" alt="logo" />
          <h1>Welcome</h1>
        </div>
      </div>

    );
  }
}

export default WelcomeBanner;
