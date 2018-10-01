import React, { Component } from 'react';
/*import logo from './logo.svg';*/
import root from 'window-or-global';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-select/dist/css/bootstrap-select.min.css';

import ViewPicker from './components/ViewPicker';

import './App.css';

import 'popper.js';
import 'jquery';
import 'bootstrap';
import 'bootstrap-select';

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, multiSelectFilter, Comparator } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import ReactMarkdown from 'react-markdown';

import _ from 'lodash';

const views = root.views;
const { SearchBar } = Search;
var expandRowAttribute= undefined;
const expandRow = {


  createColums(row) {
    let items = [];
    if(expandRowAttribute){

      const attributes = expandRowAttribute.split(',');
      attributes.forEach(attr => {      
        if(row[attr]){
          items.push(<div class="markdownColumn" ><ReactMarkdown source={row[attr]} /> </div>);
        }   
      })  
    };
    return items;
  },

  renderer: row => (  
    <div class="markdownRow">
      {expandRow.createColums(row)}
    </div> 
  ),

  showExpandColumn: true,
  expandHeaderColumnRenderer: ({ isAnyExpands }) => {
    if (isAnyExpands) {
      return <b>-</b>;
    }
    return <b>+</b>;
  },
  expandColumnRenderer: ({ expanded }) => {
    if (expanded) {
      return (
        <b>-</b>
      );
    }
    return (
      <b>+</b>
    );
  },
  nonExpandable: [ 3]

};


function image(cell, row, rowIndex, formatExtraData) {
  return (
    <img src={ cell } height={ formatExtraData['height'] }  width={ formatExtraData['width'] } ></img>
  );
}

function markdown(cell, row, rowIndex, formatExtraData) {
  return (
    <ReactMarkdown source={cell} />
  );
}

function linksOfLinks(cell, row, rowIndex, formatExtraData) {
  return (
    <div>
      OK
      <i > {row['id']} {row.id} 
      </i> 
    </div>
  ) ;
}

class App extends Component {

  constructor(props) {
    super(props);
    this.table = React.createRef();

    
    // This binding is necessary to make `this` work in the callback
    this.onViewChange = this.onViewChange.bind(this);
    this.changeView = this.changeView.bind(this);
    // An empty data array as container
    this.records = [];
    // An single column of array as container (can't be empty)
    this.columns = [{
      dataField: 'id'
    }];
    this.state = {};
    this.rowStyle = {};
    this.onViewChange(views[0].name);
  }

  onViewChange(value) {
    var view = _.find(views, function(view){ return view.name === value; });
    this.changeView(view) ;
  }

  changeView(view) {

    if(view.dataSource){
      view.records = [];
      view.readData( this.changeView );
      view.dataSource = undefined;
      return;
    }

    console.log(this.table.filter); 
    this.rowStyle = view.rowStyle;
    expandRowAttribute = view.expandRowAttribute;
    
    this.updateColumns(view);
    this.updateRecords(view.records);

    this.setState(prevState => ({
      selectedView: view.name
    }));
  }

  updateColumns(view){
    // clear columns
    while (this.columns.length) {
      this.columns.pop();
    }

    view.columns.forEach(col => {
      if (col._formatter === 'image'){
        col.formatter = image;
      } else if (col._formatter === 'markdown'){
        col.formatter = markdown;
      };

      if (col._filter === 'multiSelection'){

        const distinctValues = _.groupBy(view.records, col.dataField );
        const keys = Object.keys(distinctValues);
        const arrayToObject = keys.reduce((obj, item) => {
          obj[item] = item;
          return obj
        }, {});

        col.filter= multiSelectFilter({
          options: arrayToObject,
          defaultValue: col.defaultValue ? col.defaultValue: []
        });

        col.placeholder = "all";
      }

      this.columns.push(col);
    });

  }

  updateRecords(viewRecords){
      // clear data
      while (this.records.length) {
        this.records.pop();
      }
  
      viewRecords.forEach(rec => {
        this.records.push(rec);
      });
  }

  render() {

    return (
      <div className="App container-fluid">

        <ToolkitProvider ref={App.table}
          keyField="id"
          data={ this.records } 
          columns={ this.columns } 
          bootstrap4
          search
          >
          {
            props => (
              <div>
                <div className="row">
                  <div className="col-12 col-md-8">
                    <SearchBar { ...props.searchProps } />
                  </div>
                  <div className="col-6 col-md-4">
                    <ViewPicker views={views} onChange={this.onViewChange}/>                  
                  </div>
                </div>
                
                <BootstrapTable       
                  { ...props.baseProps }
                  expandRow={ expandRow }
                  filter = {filterFactory()}
                  classes = 'table-sm'
                  rowStyle = {this.rowStyle}
                  bordered={ false }
                />
              </div>
            )
          }
        </ToolkitProvider>
      </div>
    );
  }
}

export default App;
