import React, { Component } from 'react';
/*import logo from './logo.svg';*/
import root from 'window-or-global';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-select/dist/css/bootstrap-select.min.css';

import ApisRenderer from './components/ApiRenderer';
import ViewPicker from './components/ViewPicker';

import './App.css';

import 'popper.js';
import 'jquery';
import 'bootstrap';
import 'bootstrap-select';

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, multiSelectFilter, Comparator } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import _ from 'lodash';

const views = root.views;
const { SearchBar } = Search;

const expandRow = {
  renderer: row => (   
    <div class="XXX">
      <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
      <ApisRenderer records={row.products} /> 
    </div>
  )
};

function myFormatter(cell, row, rowIndex, formatExtraData) {
  return (
    <i className={ cell } > {row['id']} {row.id} { rowIndex} {formatExtraData['up']} <a href="hkj">go</a> </i> 
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
    // An empty data array as container
    this.records = [];
    // An single column of array as container (can't be empty)
    this.columns = [{
                      dataField: 'id'
                   }];
    this.onViewChange(views[0].name);
  }

  readTextFile(fileName, callback) {

    var readFile = new XMLHttpRequest();
    
    readFile.overrideMimeType('application/json');
    readFile.open('GET', fileName, true);
    readFile.onreadystatechange = function(){
      
      if (readFile.readyState=== 4 && readFile.status===200){
        callback( readFile.responseText);
      }
    }
    readFile.send(null);
  }

  onViewChange(value) {

    var view = _.find(views, function(view){ return view.name === value; });

    this.changeView(view) ;
  }

  changeView(view) {

    if (view.recordsFile){
      this.readFile(view);
      return;
    }

    while (this.columns.length) {
      this.columns.pop();
    }

    view.columns.forEach(col => {
      if (col._formatter === 'linksOfLinks'){
        col.formatter = linksOfLinks;
        col.formatExtraData = [{ href:'a', alias: 'b'}];
      };
      if (col.filterMethod === 'multiSelection'){

        const distinctValues = _.groupBy(view.records, col.dataField );
        const keys = Object.keys(distinctValues);
        const arrayToObject = keys.reduce((obj, item) => {
          obj[item] = item;
          return obj
        }, {});

        col.filter= multiSelectFilter({
          options: arrayToObject
        });

        //col.formatter= 'cell => arrayToObject[cell];'
        col.formatter = myFormatter;
        col.formatExtraData= {
          up: 'glyphicon glyphicon-chevron-up',
          down: 'glyphicon glyphicon-chevron-down'
        }
        col.defaultValues= ["AA"], // default filtering value
                                  
        col.placeholder = "all";
      }
      else if (col.filterMethod === 'text'){  
        col.filter= textFilter(
            {
              placeholder: 'My Custom PlaceHolder',  // custom the input placeholder
              className: 'my-custom-text-filter', // custom classname on input
              //defaultValue: 'test', // default filtering value
              comparator: Comparator.LIKE, // default is Comparator.LIKE
              //caseSensitive: true, // default is false, and true will only work when comparator is LIKE
              style: { 'xx':'iuoiu' } // your custom styles on input
            }
        );
      }

      this.columns.push(col);
    });

    this.updateRecords(view.records);

    this.setState(prevState => ({
      selectedView: view.name
    }));
  }

  updateRecords(viewRecords){
      // data
      while (this.records.length) {
        this.records.pop();
      }
  
      viewRecords.forEach(rec => {
        this.records.push(rec);
      });
  }

  readFile(view){
    var thisApp = this;
    this.readTextFile(view.recordsFile, function(text){
      //console.log(text);
      var data =  JSON.parse(text);
      view.records = data;
      thisApp.changeView(view) ;
    });
    view.recordsFile = undefined;
    view.records = [];

    return;
  }

  render() {

    return (
      <div className="App container-fluid">

        <ToolkitProvider ref={this.table}
          keyField="id"
          data={ this.records } 
          columns={ this.columns } 
          bootstrap4
          search
          >
          {
            props => (
              <div>
                <div class="row">
                  <div class="col-12 col-md-8">
                    <SearchBar { ...props.searchProps } />
                  </div>
                  <div class="col-6 col-md-4">
                    <ViewPicker views={views} onChange={this.onViewChange}/>                  
                  </div>
                </div>
                
                <BootstrapTable       
                  { ...props.baseProps }
                  expandRow={ expandRow }
                  filter = {filterFactory()}
                  classes = 'table-sm'
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
