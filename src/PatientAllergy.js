import React, { Component } from 'react';
import classnames from 'classnames';
import req from './requests'
//import Nav from './Nav';
//import WelcomeBanner from './WelcomeBanner';



class PatientAllergy extends Component {
		constructor(props){
			super(props);
			this.state = {
				showBtn:false
			}

		}
		
		submiteUpdate(event) {
		 	event.preventDefault()
			const allergies  = this.refs.allergies.value
			var patient = {
				patientuuid: this.props.patientuuid,
				notes:allergies
			}
			req.updatePatient(patient)
				.then((res) => {
					// sessionStorage.token = res;
					// this.props.router.replace('Dashboard');
					// this.props.upp(true);
					
				})
				.catch(function(e){
					console.log("Could not mount")
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
				<div className="PatientAllergy module">
				<h2 className="modeleHeader">Allergies</h2>
					<form>
						<textarea ref="allergies" onFocus={this.showButtons.bind(this)}>
							{this.props.allergyInfo}
						</textarea>
						<div className={holderClass}>
							<button type="button" className="btn btn-success" onClick={this.submiteUpdate.bind(this)}>Update</button>
							<button type="button" className="btn btn-danger" onClick={this.hideButtons.bind(this)}>Cancel</button>
						</div>
					</form>
				</div>
			)
		}
}

export default PatientAllergy;
