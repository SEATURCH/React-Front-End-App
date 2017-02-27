import React from 'react';
import classnames from 'classnames'
/* props:
validation
label
name
type
value
onFocus:funciton
updateForm:function
reset
errorHelp
*/
class ValidatedInput extends React.Component{
	constructor(props){
		super(props);
		this.state = {
	        error: false,
	        errorMsg: "",
	        value:this.props.value

	    }
	}
	componentWillReceiveProps(props){
		if(props.reset){
			this.setState({
				value: props.value,
				error: false,
		        errorMsg: ""
	        })
		}
	}
	getValue(){
		return this.state.value;
	}
	handleChange(event){
		event.preventDefault();
		this.setState({value:event.target.value})
	}

	onFocus(event) {
		event.preventDefault();
		if(this.props.onFocus)
	 		this.props.onFocus(event);
	}
	onBlur(event){
		this.validate(event);
	}

	validate(event) {
		if(event)
	 		event.preventDefault();
	 	var errorFound, errorMsg;
	 	var validateBy = this.props.validation.split(',');
	 	for(var i =0; i < validateBy.length; i++){
	 		var validation = validateBy[i];
		 	if(validation ===  'required'){
		 		if(!this.state.value){
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
    			<input className="form-control" 
    				name={this.props.name} type={this.props.type} value={this.state.value}
    				onBlur={this.onBlur.bind(this)} 
    				onFocus={this.onFocus.bind(this)} 
    				onChange={this.handleChange.bind(this)} />
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