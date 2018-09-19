import React, { Component } from 'react';

class ViewPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.views[0].name};

    let picker= <span/>
    
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
      <select value={this.state.value} onChange={this.handleChange} class="selectpicker">
        {this.createSelectItems()}
      </select>
    );
  }
}

export default ViewPicker;
