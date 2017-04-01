import React, { Component } from 'react';
import req from './requests'
import Comp from './Auth/CustomComp.js'
import moment from 'moment'

class PatientGeneral extends Component {
		constructor(props){
			super(props);
			this.state = {
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
				notes: this.refs.allergies.getValue(),
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

	    triggerButtons(event) {
		 	event.preventDefault()
			this.refs.save.showButtons(event);
	    }

	   	cancelChanges(event) {
		 	this.setState({
				patientInfo: this.state.patientInfo
			});
	    }
    	render() {
			var readonly = this.props.role === "Patient";
			return (
				<div className="PatientGeneral module">
					<div style={{position:"relative"}}>
				  		<h3 className="modeleHeader">Patient Info</h3>
				  		<Comp.SaveButtons ref="save" init={false} saveButton={this.submiteUpdate.bind(this)} cancelButton={this.cancelChanges.bind(this)} />
				  	</div>
					<form>
				    	<div className="container-fluid">
				      		<div className="row">
				      			<div className="col col-md-6">
				      				<Comp.ValidatedInput ref="name"
				      					validation="required" label="Name" name="name" type="text" readonly={readonly}
				      					value={this.state.patientInfo.name} onFocus={this.triggerButtons.bind(this)} reset={!this.state.showBtn}
					    				errorHelp={{
					    					required:"Required"
					    				}} />
					    			<Comp.ValidatedInput ref="gender"
					    				validation="required" label="Gender" name="gender" type="text" readonly={readonly}
					    				value={this.state.patientInfo.gender} onFocus={this.triggerButtons.bind(this)} reset={!this.state.showBtn}
					    				errorHelp={{
					    					required:"Required"
					    				}} />
									<Comp.ValidatedInput ref="dateOfBirth"
										validation="required" label="Date of Birth" name="dateOfBirth" type="date"  readonly={readonly} max="9999-12-31"
										value={moment.unix(this.state.patientInfo.dateOfBirth).format("YYYY-MM-DD")} onFocus={this.triggerButtons.bind(this)} reset={!this.state.showBtn}
					    				errorHelp={{
					    					required:"Required"
					    				}} />
					      			<Comp.ValidatedInput ref="bloodType"
					      				validation="required" label="Blood Type" name="bloodType" type="text" readonly={readonly}
					      				value={this.state.patientInfo.bloodType} onFocus={this.triggerButtons.bind(this)} reset={!this.state.showBtn}
					    				errorHelp={{
					    					required:"Required"
					    				}} />
					      			<Comp.ValidatedInput ref="medicalNumber"
					      				validation="required" label="Medical Number" name="medicalNumber" type="text" readonly={readonly}
					      				value={this.state.patientInfo.medicalNumber} onFocus={this.triggerButtons.bind(this)} reset={!this.state.showBtn}
					    				errorHelp={{
					    					required:"Required"
					    				}} />
				      				<label htmlFor="allergeisText"><b>Allergies: </b></label>
				      				<Comp.TextInput ref="allergies" onFocus={this.triggerButtons.bind(this)} readonly={readonly}
						        		value={this.state.patientInfo.notes} reset={!this.state.showBtn} />
				      			</div>
				      			<div className="col col-md-6">
				      				<h4 className="moduleSubHeader">Patient Contacts</h4>
						            <Comp.ValidatedInput ref="phoneNumber"
						            	validation="required" label="Phone Number" name="phoneNumber" type="text" readonly={readonly}
						            	value={this.state.patientInfo.phoneNumber} onFocus={this.triggerButtons.bind(this)} reset={!this.state.showBtn}
					    				errorHelp={{
					    					required:"Required"
					    				}} />
				      				<Comp.ValidatedInput ref="emergencyContact"
				      					validation="required" label="Emergency Contact" name="emergencyContact" type="text" readonly={readonly}
				      					value={this.state.patientInfo.emergencyContact} onFocus={this.triggerButtons.bind(this)} reset={!this.state.showBtn}
					    				errorHelp={{
					    					required:"Required"
					    				}} />
					    			<Comp.ValidatedInput ref="address"
					    				validation="required" label="Address" name="address" type="text" readonly={readonly}
					    				value={this.state.patientInfo.address} onFocus={this.triggerButtons.bind(this)} reset={!this.state.showBtn}
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
