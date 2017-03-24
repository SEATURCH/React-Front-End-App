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
		event.preventDefault();
		if(this.props.onBlur)
	 		this.props.onBlur(event);
	}
}

class ValidatedInput extends UserInput {
	validate(event) {
		this.onBlur(event);
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


class TextInput extends UserInput {
	render(){
		return (
			<textarea value={this.state.value} 
				onChange={this.handleChange.bind(this)}
				onFocus={this.onFocus.bind(this)} >
			</textarea>
		);
	}
}

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