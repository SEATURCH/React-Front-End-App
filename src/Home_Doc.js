import React, { Component } from 'react';
import requests from './requests';
import './css/Home_Doc.scss';

// The Custom Row format that will be displayed in the Patients Table
var CustomRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td><a href="patientID">{this.props.name}</a></td>
                <td>{this.props.gender}</td>
                <td>{this.props.age}</td>
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
		// if(!this.props.location.query.id)
		// 	return;
			// console.log(this.props.location)
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
                age={item.age}
                phoneNumber={item.phoneNumber}
                key={item.name} />);
            console.log(item);
        }.bind(this));

    }

    return (
      <div>
        <form>
          <input type="text" name="search" placeholder="Search Patient ..."
          onChange={this.updateSearch.bind(this)}
          value={this.state.search}/>
        </form>

        <table id="allPatientsTable">
           <thead>
               <tr>
                   <th>Name</th>
                   <th>Gender</th>
                   <th>Age</th>
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
