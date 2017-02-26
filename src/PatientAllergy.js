import React, { Component } from 'react';
import classnames from 'classnames';
import req from './requests'
import Comp from './Auth/CustomComp.js'
import moment from 'moment'

class PatientGeneral extends Component {
		constructor(props){
			super(props);
			this.state = { 
				showBtn:false
			};

		}
		componentWillReceiveProps(prop){
			this.setState(Object.assign(this.state, prop.generalInfo))
		}

		submiteUpdate(event) {
		 	event.preventDefault()
			const allergies  = this.refs.allergies.value
			var patient = {
				patientuuid: this.props.patientuuid,
				notes:allergies
			}
			console.log(this.state)
			// req.updatePatient(patient)
			// 	.then((res) => {
			// 		// sessionStorage.token = res;
			// 		// this.props.router.replace('Dashboard');
			// 		// this.props.upp(true);
					
			// 	})
			// 	.catch(function(e){
			// 		console.log("Could not mount")
			// 	});
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

	    updateForm(upState){
	    	this.state[upState.name]= upState.value;
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
				      				<Comp.ValidatedInput validation="required" label="Name" name="name" type="text" value={this.props.generalInfo.name} onFocus={this.showButtons.bind(this)} updateForm={this.updateForm.bind(this)} reset={!this.state.showBtn}
					    				errorHelp={{
					    					required:"Required"
					    				}} />
					    			<Comp.ValidatedInput validation="required" label="Gender" name="gender" type="text" value={this.props.generalInfo.gender} onFocus={this.showButtons.bind(this)} updateForm={this.updateForm.bind(this)} reset={!this.state.showBtn}
					    				errorHelp={{
					    					required:"Required"
					    				}} />
									<Comp.ValidatedInput validation="required" label="Date of Birth" name="dateOfBirth" type="text" value={moment.unix(this.props.generalInfo.dateOfBirth).format("MMM / DD / YYYY")} onFocus={this.showButtons.bind(this)} updateForm={this.updateForm.bind(this)} reset={!this.state.showBtn}
					    				errorHelp={{
					    					required:"Required"
					    				}} />
					      			<Comp.ValidatedInput validation="required" label="Blood Type" name="bloodType" type="text" value={this.props.generalInfo.bloodType} onFocus={this.showButtons.bind(this)} updateForm={this.updateForm.bind(this)} reset={!this.state.showBtn}
					    				errorHelp={{
					    					required:"Required"
					    				}} />
					      			<Comp.ValidatedInput validation="required" label="Medical Number" name="medicalNumber" type="text" value={this.props.generalInfo.medicalNumber} onFocus={this.showButtons.bind(this)} updateForm={this.updateForm.bind(this)} reset={!this.state.showBtn}
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
						            <Comp.ValidatedInput validation="required" label="Phone Number" name="phoneNumber" type="text" value={this.props.generalInfo.phoneNumber} onFocus={this.showButtons.bind(this)} updateForm={this.updateForm.bind(this)} reset={!this.state.showBtn}
					    				errorHelp={{
					    					required:"Required"
					    				}} />
				      				<Comp.ValidatedInput validation="required" label="Emergency Contact" name="emergencyContact" type="text" value={this.props.generalInfo.emergencyContact} onFocus={this.showButtons.bind(this)} updateForm={this.updateForm.bind(this)} reset={!this.state.showBtn}
					    				errorHelp={{
					    					required:"Required"
					    				}} />
					    			<Comp.ValidatedInput validation="required" label="Address" name="address" type="text" value={this.props.generalInfo.address} onFocus={this.showButtons.bind(this)} updateForm={this.updateForm.bind(this)} reset={!this.state.showBtn}
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
