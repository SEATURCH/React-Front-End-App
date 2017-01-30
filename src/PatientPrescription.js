import React, { Component } from 'react';
import moment from 'moment'

class MediRow extends React.Component{
	render(){
		var startDate = moment.unix(this.props.prescript.startDate).format("MMM/DD/YYYY");
		var endDate = moment.unix(this.props.prescript.endDate).format("MMM/DD/YYYY");
		return (
			<tr>
				<td>
					<div>{this.props.prescript.name}</div>
					<div className="subheader">
						{startDate} - {endDate}
					</div>
				</td>
				<td>{this.props.prescript.notes}</td>
				<td>{this.props.prescript.doctorName}</td>
			</tr>
		);
	}
}

var MediTable = React.createClass({
  render:function(){
  	var rows =[];
  	this.props.prescripts.forEach(function(prescription, index){
		rows.push( <MediRow prescript={prescription} key={index} /> );
	});
    return (
      <div>																																																																				
        <table className="table-striped table-hover">
			<thead>
				<th>Drug</th>
				<th>Notes</th>
				<th>Written By</th>
			</thead>
			<tbody>
				{rows}
			</tbody>
		</table>
      </div>
    );																				
  }
});

class PatientPrescription extends Component {
	render() {
		var current = [];
		var past = [];
		var currentTime = new Date().getTime()/1000;
		this.props.prescriptionList.forEach(function(prescript){
			if(prescript.endDate < currentTime)
				past.push(prescript);
			else
				current.push(prescript);
		});
		return (
			<div className="PatientPrescription module">
				<h3 className="modeleHeader">Prescriptions</h3>
				<h4 className="moduleSubHeader">Current</h4> 
				<MediTable prescripts={current} />
				<h4 className="moduleSubHeader">Past</h4> 
				<MediTable prescripts={past} />
			</div>
		)
	}
}

export default PatientPrescription;
