import React, { Component } from 'react';
import classnames from 'classnames';
import req from './requests'
import Comp from './Auth/CustomComp.js'
import moment from 'moment'

class PatientGeneral extends Component {
		constructor(props){
			super(props);
			this.state = { 
				showBtn:false,
				patientInfo:{}
			};

		}
		componentWillReceiveProps(prop){
			this.setState(Object.assign(this.state.patientInfo, prop.generalInfo))
		}

		submiteUpdate(event) {
		 	event.preventDefault()
		 	var patient = {
				patientUUID: this.props.patientuuid,
				notes: this.refs.allergies.value,
				name: this.refs.name.getValue(),
				gender: this.refs.gender.getValue(),
				dateOfBirth: moment(this.refs.dateOfBirth.getValue()).unix(),
				bloodType: this.refs.bloodType.getValue(),
				medicalNumber: this.refs.medicalNumber.getValue(),
				phoneNumber: this.refs.phoneNumber.getValue(),
				emergencyContact: this.refs.emergencyContact.getValue(),
				address: this.refs.address.getValue()
			}
			
			req.updatePatient(patient)
				.then((res) => {
					this.setState({ 
						showBtn:false,
						patientInfo: patient
					});					
				})
				.catch(function(e){
					this.setState({ 
						showBtn:false,
						patientInfo: patient
					});
				});
	    }

	    showButtons(event) {
		 	event.preventDefault()
			this.setState({ 
				showBtn:true
			});
			
	    }
	    hideButtons(event) {
		 	event.preventDefault()
			this.setState({ 
				showBtn:false
			});
			
	    }

	    
    	render() {
			var holderClass = classnames("btnHolder", {"show":this.state.showBtn});
			return (
				<div className="PatientGeneral module">
			  		<h3 className="modeleHeader">Patient Info</h3>
					<div className={holderClass}>
						<button type="button" className="btn btn-success" onClick={this.submiteUpdate.bind(this)}>Update</button>
						<button type="button" className="btn btn-danger" onClick={this.hideButtons.bind(this)}>Cancel</button>
					</div>

			    	<form>
				    	<div className="container-fluid">
				      		<div className="row">
				      			<div className="col col-md-6">
				      				<Comp.ValidatedInput ref="name"
				      					validation="required" label="Name" name="name" type="text" 
				      					value={this.state.patientInfo.name} onFocus={this.showButtons.bind(this)} reset={!this.state.showBtn}
					    				errorHelp={{
					    					required:"Required"
					    				}} />
					    			<Comp.ValidatedInput ref="gender"
					    				validation="required" label="Gender" name="gender" type="text"
					    				value={this.state.patientInfo.gender} onFocus={this.showButtons.bind(this)} reset={!this.state.showBtn}
					    				errorHelp={{
					    					required:"Required"
					    				}} />
									<Comp.ValidatedInput ref="dateOfBirth"
										validation="required" label="Date of Birth" name="dateOfBirth" type="date"
										value={moment.unix(this.state.patientInfo.dateOfBirth).format("YYYY-MM-DD")} onFocus={this.showButtons.bind(this)} reset={!this.state.showBtn}
					    				errorHelp={{
					    					required:"Required"
					    				}} />
					      			<Comp.ValidatedInput ref="bloodType"
					      				validation="required" label="Blood Type" name="bloodType" type="text"
					      				value={this.state.patientInfo.bloodType} onFocus={this.showButtons.bind(this)} reset={!this.state.showBtn}
					    				errorHelp={{
					    					required:"Required"
					    				}} />
					      			<Comp.ValidatedInput ref="medicalNumber"
					      				validation="required" label="Medical Number" name="medicalNumber" type="text"
					      				value={this.state.patientInfo.medicalNumber} onFocus={this.showButtons.bind(this)} reset={!this.state.showBtn}
					    				errorHelp={{
					    					required:"Required"
					    				}} />
				      				<label htmlFor="allergeisText"><b>Allergies: </b></label>
						        	<textarea ref="allergies" id="allergeisText" onFocus={this.showButtons.bind(this)}>
											{this.props.allergyInfo}
									</textarea>
				      			</div>
				      			<div className="col col-md-6">
				      				<h4 className="moduleSubHeader">Patient Contacts</h4>
						            <Comp.ValidatedInput ref="phoneNumber"
						            	validation="required" label="Phone Number" name="phoneNumber" type="text"
						            	value={this.state.patientInfo.phoneNumber} onFocus={this.showButtons.bind(this)} reset={!this.state.showBtn}
					    				errorHelp={{
					    					required:"Required"
					    				}} />
				      				<Comp.ValidatedInput ref="emergencyContact"
				      					validation="required" label="Emergency Contact" name="emergencyContact" type="text"
				      					value={this.state.patientInfo.emergencyContact} onFocus={this.showButtons.bind(this)} reset={!this.state.showBtn}
					    				errorHelp={{
					    					required:"Required"
					    				}} />
					    			<Comp.ValidatedInput ref="address"
					    				validation="required" label="Address" name="address" type="text"
					    				value={this.state.patientInfo.address} onFocus={this.showButtons.bind(this)} reset={!this.state.showBtn}
					    				errorHelp={{
					    					required:"Required"
					    				}} />   
						            
				      			</div>
			      			</div>
		      			</div>
					</form>
				</div>
			)
		}
}

export default PatientGeneral;
