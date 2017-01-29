import React, { Component } from 'react';
import Nav from './Nav';
import WelcomeBanner from './WelcomeBanner';
import './css/AppCont.scss';

class AppCont extends Component {

	render() {
		return (
			<div>
				{/* <WelcomeBanner/> */}
				<Nav />
				<div id="content-body">
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default AppCont;
