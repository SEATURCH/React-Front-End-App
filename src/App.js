import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
          <h2>{this.props.info.title}</h2>
          <h2>{this.props.info.id}</h2>
          <h2>{this.props.info.userId}</h2>
        </div>
        <div className="App-intro">
          {this.props.info.body}
        </div>
      </div>
    );
  }
}

export default App;
