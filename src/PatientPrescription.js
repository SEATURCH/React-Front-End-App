import React, { Component } from 'react';
import moment from 'moment'
import classnames from 'classnames'

class MediRow extends React.Component{
	render(){
		var currentTime = moment().unix();
		var fadeOut = classnames({"past":currentTime > this.props.prescript.endDate });
		var startDate = moment.unix(this.props.prescript.startDate).format("MMM/DD/YYYY");
		var endDate = moment.unix(this.props.prescript.endDate).format("MMM/DD/YYYY");
		return (
			<tr className={fadeOut}>
				<td>
					<div>{this.props.prescript.drug}</div>
					<div className="subheader">
						{startDate} - {endDate}
					</div>
				</td>
				<td>{this.props.prescript.instructions}</td>
				<td>{this.props.prescript.doctor}</td>
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
		var prescriptList = this.props.prescriptionList;
		prescriptList.sort(function(a, b){
			return b.endDate - a.endDate; 
		})
		return (
			<div className="PatientPrescription module">
				<h3 className="modeleHeader">Prescriptions</h3>
				<MediTable prescripts={prescriptList} />
			</div>
		)
	}
}

export default PatientPrescription
