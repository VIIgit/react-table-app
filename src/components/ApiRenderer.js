import React, { Component } from 'react';
class ApisRenderer extends React.Component {
    constructor(props) {
      super(props);
    }
  
    createItems() {
      let items = []; 
      if(this.props.records){
        this.props.records.forEach(api => {         
          items.push(<li> {api.id} {api.category} :)</li>);
        });
      }        
      return items;
    } 
  
    render() {
  
      return (
        <ul >
          {this.createItems()}
        </ul>
      );
    }
  }
  
export default ApisRenderer;