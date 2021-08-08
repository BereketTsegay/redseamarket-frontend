import React, { Component } from 'react';

class TextArea extends React.Component{

  constructor(props){
    super(props);
  }

  handleChange = e => {

      this.props.handleChange(e.target.name, e.target.value)
  }

  render() {
      
      let name = this.props.name;
      let value = this.props.value;

      return (
        <div className="form-group">
          <textarea name={name} value={value} onChange={(e) => this.handleChange(e)} className="form-control" rows="3" placeholder={this.props.placeholder}></textarea>
        </div>
      )
  }
}
export default TextArea