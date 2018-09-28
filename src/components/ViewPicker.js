import React from 'react';
class ViewPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.views[0].name};
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
      <select value={this.state.value} onChange={this.handleChange} className="selectpicker">
        {this.createSelectItems()}
      </select>
    );
  }
}

export default ViewPicker;
