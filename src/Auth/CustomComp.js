import React from 'react';
import classnames from 'classnames'


// Base class with event handler functionalities for custom form validation components
class UserInput extends React.Component{
	constructor(props){
		super(props);
		this.state = {
	        error: false,
	        errorMsg: "",
	        value:this.props.value
	    }
	}
	componentWillReceiveProps(props){
		this.setState({
			value: props.value,
			error: false,
	        errorMsg: ""
        })
	}
	getValue(){
		return this.state.value;
	}
	handleChange(event){
		this.setState({value:event.target.value});
	}

	onFocus(event) {
		if(this.props.onFocus && !this.props.readonly)
	 		this.props.onFocus(event);
	}
	onBlur(event){
		if(this.props.onBlur && !this.props.readonly)
	 		this.props.onBlur(event);
	}
}


/*
	Extends UserInput - customizable <input> tag with extendable error-checking
	Props:
		validation = string of all validation types component checked against 
		label = surronding <input> label tag
		name = <input> name
		type = <input> type
		value = <input> value
		onFocus = Parent defined function to execute on component focus  
		onBlur = Parent defined function to execute on component focus  
		errorHelp = Object containing custom error msg passed in from parent
			Key corresponds validation type listed in props.validation
		readOnly = boolean, <input> readonly attribute
		tabDisable = boolean, sets tabIndex 
*/
class ValidatedInput extends UserInput {
	checkValidation(){
		return this.validate();
	}
	validate(event) {
		var errorFound, errorMsg;
	 	var validateBy = this.props.validation.split(',');
	 	for(var i =0; i < validateBy.length; i++){
	 		var validation = validateBy[i];
	 		switch(validation){
	 			case 'required':
		 			if(!this.state.value){
			 			errorFound = true;
			 			if(this.props.errorHelp && this.props.errorHelp.hasOwnProperty(validation))
			 				errorMsg = this.props.errorHelp[validation];
			 			else
			 				errorMsg = "Field required";
			 		}
	 				break;
	 			default:
	 				break;
	 		}
	 	}
	 	this.setState({ 
		 		error:errorFound,
		 		errorMsg: (errorFound)? errorMsg: ""
		});
	 	return errorFound
    }
	render(){
		var holderClass = classnames("form-group", {"has-error":this.state.error});
		var readOnly = {};
		if (this.props.readonly) {
			readOnly['readOnly'] = 'readOnly';
		}
    	return (
			<div className={holderClass} style={{"position":"relative"}}>
    			<label className="">{this.props.label}</label>
    			<input className="form-control"
    				name={this.props.name} type={this.props.type} value={this.state.value} max={this.props.max}
    				{...readOnly}
    				tabIndex={this.props.tabDisable? "-1": "1"}
    				onBlur={this.validate.bind(this)}
    				onFocus={this.onFocus.bind(this)}
    				onChange={this.handleChange.bind(this)} />
				{this.state.error && (
					<div className="form-control-feedback" style={{"width":"initial"}}>{this.state.errorMsg}</div>
				)}
			</div>
		);
	}
}

/*
	Extends UserInput - customizable <textarea> tag
	Props:
		value = <textarea> value
		onFocus = Parent defined function to execute on component focus  
		onBlur = Parent defined function to execute on component focus  
		errorHelp = Object containing custom error msg passed in from parent
			Key corresponds validation type listed in props.validation
		readOnly = boolean, <textarea> readonly attribute
		tabDisable = boolean, sets tabIndex 
*/
class TextInput extends UserInput {
	render(){
		var readOnly = {};
		if (this.props.readonly) {
			readOnly['readOnly'] = 'readOnly';
		}
    	return (
			<textarea value={this.state.value}
				{...readOnly}
				tabIndex={this.props.tabDisable? "-1": "1"}
				onChange={this.handleChange.bind(this)}
				onFocus={this.onFocus.bind(this)} >
			</textarea>
		);
	}
}

/*
	Reusable 'Save' and 'Cancel' buttons that shows and hide on event
	Props:
		init = boolean, initial state of buttons
		saveButton = Parent defined function to execute on 'Save' button click  
		cancelButton = Parent defined function to execute on 'Cancel' button click
*/
class SaveButtons extends React.Component {
	constructor(props){
		super(props);
		this.state = {
	        show: props.init
	    }
	}
	saveClick(event){
		this.props.saveButton(event);
		this.setState({show:false });
	}

	cancelClick(event) {
	 	event.preventDefault()
	 	this.props.cancelButton(event);
		this.setState({show:false });
    }

	showButtons(event) {
	 	event.preventDefault()
	 	this.setState({show:true });
	}

	render(){
		var holderClass = classnames("btnHolder", {"reveal":this.state.show});
		return (
			<div className={holderClass}>
				<button type="button" className="btn btn-success" onClick={this.saveClick.bind(this)}>Submit</button>
				<button type="button" className="btn btn-danger" onClick={this.cancelClick.bind(this)}>Cancel</button>
			</div>
		);
	}

}
export default {
	ValidatedInput: ValidatedInput,
	TextInput: TextInput,
	SaveButtons: SaveButtons
};
