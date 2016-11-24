import React, { Component } from 'react';
import Nav from './Nav';
import WelcomeBanner from './WelcomeBanner';

class AppCont extends Component {
	
	render() {
		return (
			<div>
				<WelcomeBanner/>
				<Nav />
				{this.props.children}
			</div>
		)
	}
}

export default AppCont;
