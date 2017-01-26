import React, { Component } from 'react';
import requests from './requests';

//import Nav from './Nav';
//import WelcomeBanner from './WelcomeBanner';

class Notifications extends Component {
	constructor(props){
		super(props);
		this.state = {
			items: [
				{number:3},
				{number:2}
			]
		}
	}

	componentDidMount(){
		// if(!this.props.location.query.id)
		// 	return;
		this.setState({
			items: [
				{number:3},
				{number:1},
				{number:2}
			]
		})
			// console.log(this.props.location)
			// requests.patientSearch("dummy")
			// 	.then((result) => {
			// 		console.log("JSON from server : " + result);
			// 		console.log(result);
			// 		this.setState({ generalInfoList:result });
			// 		console.log(this.state)
			// 	})
			// 	.catch(function(e){
			// 		console.log("Could not mount")
			// 	});
	}

	render() {
		var tableRows = this.state.items.map(function(item){
			return (
				<tr className="row">
					<td>{item.number}</td>
					<td>{item.number}</td>
					<td>{item.number}</td>
					<td>{item.number}</td>
				</tr>
			);
		});
		return (
			<div>
				<div className="table-responsive">
					<table className="table">
						<thead>
							<tr>
								<th>1</th>
								<th>2</th>
								<th>3</th>
								<th>4</th>
							</tr>
						</thead>
						<tbody>
							{tableRows}
						</tbody>
					</table>
				</div>
	         
				{// <PatientGeneral generalInfo={this.state.generalInfoList} />
				/* <PatientAllergy allergyInfo = {this.state.allergyList} />
				<PatientMedication medicationInfo = {this.state.medicationList} />
				<PatientProblems problemsInfo = {this.state.problemsList} /> */}
			</div>
		)
	}
}

export default Notifications;
