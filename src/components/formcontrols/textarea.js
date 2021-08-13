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
      let error = this.props.error ? this.props.error : '';

      let ErrorStyle = {
        color: 'red',
      };

      return (
        <div className="form-group">
          <textarea name={name} value={value} onChange={(e) => this.handleChange(e)} className="form-control" rows="3" placeholder={this.props.placeholder}></textarea>
          {error.length > 0 ? <p className="help-block help-block-error"  style={ErrorStyle}>{error}</p> : '' }
        </div>
      )
  }
}
export default TextArea