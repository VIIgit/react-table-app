import React, { Component } from 'react';
/*import logo from './logo.svg';*/
import root from 'window-or-global';

import './App.css';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './xxx.css';

/*
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<!-- Popper JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>


*/

import 'popper.js';
import 'jquery';
import 'bootstrap';

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
      <p>You can render anything here, also you can add additional data on every row object</p>
     </div>
  )
};

function myFormatter(cell, row, rowIndex, formatExtraData) {
  return (
    <i className={ cell } > {row['id']} {row.id} { rowIndex} {formatExtraData['up']} <a href="hkj">go</a> </i> 
  );
}

function linksOfLinks(cell, row, rowIndex, formatExtraData) {
  const xx = {cell};
  return (
    <div>
      OK
      <i > {row['id']} {row.id} mmmm 
      
      {
        
        JSON.parse(xx).forEach(element => {
            <div>element.href</div>
          })

      }
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



  onViewChange(value) {
    // columns
    //const columns = this.table.current.props.columns;

    this.columns;

    views.forEach(view => {
      if (view.name === value ){

        // data
        while (this.columns.length) {
          this.columns.pop();
        }
    
        const viewCols = view.columns;
        viewCols.forEach(col => {
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

        // data
        while (this.records.length) {
          this.records.pop();
        }
    
        const viewRecords = view.records;
        viewRecords.forEach(rec => {
          this.records.push(rec);
        });

      }
    });

    this.setState(prevState => ({
      selectedView: value
    }));
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

class ViewPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.views[0].name};

    let picker;

    if (views && views.length > 0 ) {
      picker = <ViewPicker views={views} onChange={this.onViewChange}/>;
    } else {
      picker = <span/>
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.onChange(event.target.value);
  }

  createSelectItems() {
    let items = [];         
    this.props.views.forEach(element => {         
         items.push(<option key={element.name} value={element.name}>{element.name}</option>);
    })  
    return items;
  } 

  render() {

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          View: 
          <select value={this.state.value} onChange={this.handleChange}>
           {this.createSelectItems()}
          </select>


<div class="dropdown">
  <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown link
  </a>

  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
  </div>
</div>

        </label>
      </form>
    );
  }
}

export default App;
