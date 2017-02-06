import React, { Component } from 'react';
import requests from './requests';
import moment from 'moment'
import './css/Home_Doc.scss';

// The Custom Row format that will be displayed in the Patients Table
var CustomRow = React.createClass({
    render: function() {
      var patientAge = moment.unix(this.props.dateOfBirth).format("MM/DD/YYYY");
      return (
        <tr>
          <td><a href="patientID">{this.props.name}</a></td>
          <td>{this.props.gender}</td>
          <td>{patientAge}</td>
          <td>{this.props.phoneNumber}</td>
        </tr>
      );
    }
});

class Home_Doc extends Component {
  constructor(props){
		super(props);
		this.state = {
			patientsList: [],
      search: ''
		}
	}

  // call back function that changes the state of 'search' state variable
  updateSearch(event){
    this.setState({search: event.target.value.substr(0,20)});
  }

  componentDidMount(){
		requests.patientsByDocSearch("dummy")
			.then((result) => {
				console.log("Patients List from server : " + result);
				this.setState({ patientsList:result });
				console.log(this.state)
			})
			.catch(function(e){
				console.log("Could not mount request for patients List from Doc")
			});
	}

  render() {
    // create rows with all the patient information if patientsList is not empty
    if (this.state.patientsList.length > 0){
        console.log(this.state.patientsList.length);

        var rows = [];
        var filteredRows = this.state.patientsList.filter(
            //only return this item if you can find 'this.state.search' inside
            // 'item.name' OR 'item.phoneNumber'...leading to filtering
            (item) => {
              return (item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
                    ||  (item.phoneNumber.indexOf(this.state.search) !== -1);
             }
        );
        // the filtered rows are mapped to a Custom Row with all required info
        filteredRows.forEach(function(item) {
            rows.push(<CustomRow
                name={item.name}
                gender={item.gender}
                dateOfBirth={item.dateOfBirth}
                phoneNumber={item.phoneNumber}
                key={item.name} />);
            console.log(item);
        }.bind(this));
    }

    return (
      <div className="Home_Doc">
        <h3 className="moduleHeader"> Doctor's Patients</h3>
        <form>
          <input type="text" name="search" placeholder="Search Patient ..."
          onChange={this.updateSearch.bind(this)}
          value={this.state.search}/>
        </form>

        <table className="table-striped table-hover" id="allPatientsTable">
           <thead>
               <tr>
                   <th>Name</th>
                   <th>Gender</th>
                   <th>Date of Birth (M/D/Y)</th>
                   <th>Phone Number</th>
               </tr>
           </thead>
           {this.state.patientsList.length > 0 &&
             <tbody>
               {rows}
             </tbody>
           }
        </table>
      </div>
    );
  }
}

export default Home_Doc;
