import React from 'react';
import classnames from 'classnames'
/* props:
	validation
	label
	label
	name
	type
	errorHelp
*/
class ValidatedInput extends React.Component{
	constructor(props){
		super(props);
		this.state = {
	        error: false,
	        errorMsg: "",

	    }
	}
	validate(event) {
	 	event.preventDefault();
	 	var errorFound, errorMsg;
	 	var validateBy = this.props.validation.split(',');
	 	for(var i =0; i < validateBy.length; i++){
	 		var validation = validateBy[i];
		 	if(validation ==  'required'){
		 		if(!this.refs[this.props.label].value){
		 			errorFound = true;
		 			if(this.props.errorHelp.hasOwnProperty(validation))
		 				errorMsg = this.props.errorHelp[validation];
		 			else
		 				errorMsg = "Field required";
		 		}
		 	}
	 	}
	 	if(errorFound){
		 	this.setState({ 
		 		error:true,
		 		errorMsg: errorMsg
		 	});
	 	}else{
	 		this.setState({ 
		 		error:false,
		 		errorMsg: ""
		 	});
	 	}
    }
	render(){
		var holderClass = classnames("form-group", {"has-error":this.state.error});
		return (
			<div className={holderClass} style={{"position":"relative"}}>
    			<label className="">{this.props.label}</label>
    			<input className="form-control" ref={this.props.label} name={this.props.name} type={this.props.type} onBlur={this.validate.bind(this)}/>
				{this.state.error && (
					<div className="form-control-feedback" style={{"width":"initial"}}>{this.state.errorMsg}</div>
				)}
			</div>
		);
	}
}

export default {
	ValidatedInput: ValidatedInput
};