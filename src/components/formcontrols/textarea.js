import React, { Component } from 'react';

class TextArea extends React.Component{
  constructor(props){
    super(props);
  }
    render() {
      
        return (
        <div className="form-group">
        <textarea className="form-control" rows="3" placeholder={this.props.placeholder}></textarea>
        </div>
        )
  }
}
export default TextArea