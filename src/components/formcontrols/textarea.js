import React, { Component } from 'react';

class TextArea extends React.Component{
    render() {
      
        return (
        <div className="form-group">
        <textarea className="form-control" rows="3" placeholder="Describe your Sport Bike"></textarea>
        </div>
        )
  }
}
export default TextArea