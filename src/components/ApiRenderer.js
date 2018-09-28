import React from 'react';
class ApisRenderer extends React.Component {

  createItems() {
    let items = []; 
    if(this.props.records){
      this.props.records.forEach(api => {         
        items.push(<li key={api.id}> {api.id} {api.category} :)</li>);
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