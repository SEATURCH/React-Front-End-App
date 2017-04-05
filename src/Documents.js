import React, { Component } from 'react';
import './css/Documents.scss';
import moment from 'moment'
import { Link } from 'react-router';
import requests from './requests';

class DocumentRow extends Component{
  render(){
    var docDate = moment.unix(this.props.date).format("MM/DD/YYYY");
    var actionURL = "/document?document=" + this.props.docUUID +"&name="+this.props.fname;
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
          date={doc.dateUploaded}
          patientUUID={doc.patientUUID}
          key={index}/> );
    });

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
      documentsList: []
    }
  }

  clickAdd(event) {
    event.preventDefault()
    this.refs.file.click()
  }

  onSelected(event) {
    event.preventDefault()
    var file = event.target.files[0]
    var dateUploaded =  Math.round(new Date()/1000)
    requests.uploadDocument(file, this.props.location.query.id, dateUploaded)
      .then((result) => {
        var newEntry = {
          documentUUID: result.documentuuid,
          patientUUID : this.props.location.query.id,
          filename: file.name,
          dateUploaded: dateUploaded
        }
        this.state.documentsList.push(newEntry)
        this.setState(this.state);
      })
      .catch(function(e){
        console.log("Could not mount");
    });
  }

  componentDidMount(){
    var searchId = (requests.whoami().role==="Doctor")? this.props.location.query.id: requests.whoami().userUUID;
    requests.documentList(searchId)
      .then((result) => {
        this.setState({documentsList: result});
      })
      .catch(function(e){
        console.log("Could not mount");
      });
  }

  render() {
    return (
      <div className="documents">
        <div className="pageHeader">
            <h1 className="mainHeader">Documents</h1>
        </div>
        <label style={{float:"left", margin:"10px 20px"}}>
          <input type='file' style={{display:"none"}} ref="file" onChange={this.onSelected.bind(this)} />
          { requests.whoami().role === "Doctor" &&
            <button type="upload" className="btn btn-default" onClick={this.clickAdd.bind(this)}>+</button>
          }
        </label>

        {this.state.documentsList.length > 0 &&
            <DocumentsTable docs={this.state.documentsList}/>
        }
      </div>
    );
  }
}


class DocumentView extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  renderPage(num) {
    this.state.pageRendering = true;
    // Using promise to fetch the page
    this.state.pdfDoc.getPage(num).then((page) => {
      var viewport = page.getViewport(this.state.scale);
      this.state.canvas.height = viewport.height;
      this.state.canvas.width = viewport.width;

      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: this.state.ctx,
        viewport: viewport
      };
      var renderTask = page.render(renderContext);

      // Wait for rendering to finish
      renderTask.promise.then(() => {
        this.state.pageRendering = false;
        if (this.state.pageNumPending !== null) {
          // New page rendering is pending
          this.renderPage(this.state.pageNumPending);
          this.state.pageNumPending = null;
        }
      });
    });
    this.setState(this.state)
    // Update page counters
    // document.getElementById('page_num').textContent = num;
  }

  queueRenderPage(num) {
    if (this.state.pageRendering) {
      this.state.pageNumPending = num;
    } else {
      this.renderPage(num);
    }
  }

  onPrevPage() {
    if (this.state.pageNum <= 1) {
      return;
    }
    this.state.pageNum--;
    this.queueRenderPage(this.state.pageNum);
  }

  onNextPage() {
    if (this.state.pageNum >= this.state.pdfDoc.numPages) {
      return;
    }
    this.state.pageNum++;
    this.queueRenderPage(this.state.pageNum);
  }

  componentDidMount(){
    // Asynchronous download of PDF
    this.setState({
      pdfDoc: null,
      pageNum: "",
      numPages: "",
      pageRendering: false,
      pageNumPending: null,
      scale: 1.5,
      canvas: document.getElementById('the-canvas'),
      ctx: document.getElementById('the-canvas').getContext('2d'),
      documentName: this.props.location.query.name
    })

    requests.getDocument(this.props.location.query.document).then(
      (pdfDoc_) => {
        this.state.pdfDoc = pdfDoc_;
        this.state.numPages = pdfDoc_.numPages
        // Initial/first page rendering
        this.state.pageNum  = 1
        // this
        this.renderPage(this.state.pageNum);
    });
  }

  render() {
    return (
      <div className="documents">
        <div className="pageHeader">
            <h1 className="mainHeader">Documents: {this.state.documentName}</h1>
        </div>
        <div style={{padding:"5px 10px"}}>
          <button className="btn btn-default" onClick={this.onPrevPage.bind(this)}>Previous</button>
          &nbsp;
          <span>Page: {this.state.pageNum} / {this.state.numPages}</span>
          &nbsp;
          <button className="btn btn-default" onClick={this.onNextPage.bind(this)}>Next</button>
        </div>
        <div className="moduleBody">
        <div style={{position:"relative"}}>
          <canvas ref="canvas" id="the-canvas"></canvas>
        </div>
        </div>
      </div>
    );
  }
}

export default {
  DocuList: Documents,
  Docu:DocumentView
};
