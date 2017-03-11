import React, { Component } from 'react';
import './css/Documents.scss';
import moment from 'moment'
import { Link } from 'react-router';

class DocumentRow extends Component{
  render(){
    var docDate = moment.unix(this.props.date).format("MM/DD/YYYY");
    var actionURL = "/documents/documentuuid/" + this.props.docUUID;
    return (
			<tr>
        <td>{docDate}</td>
        <td>{this.props.fname}</td>
        <td><Link to={actionURL} >View</Link></td>
			</tr>
		);
	}
}

class DocumentsTable extends Component{
  render(){
    var rows = [];

    this.props.docs.forEach(function(doc, index){
        rows.push( <DocumentRow
          fname={doc.filename}
          docUUID={doc.documentUUID}
          content={doc.content}
          date={doc.dateUploaded}
          patientUUID={doc.patientUUID}
          key={index}/> );
    }.bind(this));

    return (
      <div>
        <table className="table-striped table-hover">
          <thead>
            <tr>
              <th>Date Uploaded</th>
              <th>File Name</th>
              <th>Contents</th>
            </tr>
          </thead>
      		<tbody>
      			{rows}
      		</tbody>
    		</table>
      </div>
    );
  }
}

class Documents extends Component {
  constructor(props){
    super(props);
    this.state = {
      documentsList: [
                      {
                        "documentUUID": "ba0682ac-09ef-4845-b18e-889e28fe0c9e",
                        "patientUUID" : "75264cc0-ff8a-4bd3-93da-9e07ae661229",
                        "filename": "Blood Report",
                        "content": "blob",
                        "dateUploaded": "1486292557"
                      },
                      {
                        "documentUUID": "dc5cf078-ebe3-4632-b883-e675dfba9015",
                        "patientUUID" : "75264cc0-ff8a-4bd3-93da-9e07ae661229",
                        "filename": "Heart Report",
                        "content": "blob2",
                        "dateUploaded": "1486572515"
                      },
                      {
                        "documentUUID": "ee0734fe-70fc-4689-9837-6917008740be",
                        "patientUUID" : "75264cc0-ff8a-4bd3-93da-9e07ae661229",
                        "filename": "Lungs Report",
                        "content": "blob3",
                        "dateUploaded": "1486753955"
                      }
                    ]
    }
  }

  render() {
    return (
      <div className="documents">
        <h3 className="moduleHeader">Documents</h3>

        {this.state.documentsList.length > 0 &&
            <DocumentsTable docs={this.state.documentsList}/>
        }
      </div>
    );
  }
}

export default Documents;
