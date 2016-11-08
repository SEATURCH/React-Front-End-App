import React, { Component } from 'react';
import requests from './requests';
import App from './App';

class AppCont extends Component {
	constructor(props){
		super(props);
		this.state = {
			userId: "",
			id: "",
			title:"",
			body:""
		}
	}

	componentDidMount(){
		if(!this.props.location.query.id)
			return;
	
		requests.testApi(this.props.location.query.id)
			.then((result) => {
				this.setState(result);
			})
			.catch(function(e){
				console.log("Could not mount")
			});
	}
	
	render() {
		return <App info={this.state} />
	}
}

export default AppCont;
