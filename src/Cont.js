import React, { Component } from 'react';
import './css/Cont.css';

class Cont extends Component {
  render() {
    return (
      <div>
        <div className="Header">
          <h2>Welcome to LETS Care</h2>
        </div>
        <div className="Body">
          {this.props.children}
        </div>
        <div className="Footer">
        </div>
      </div>
    );
  }
}

export default Cont;
