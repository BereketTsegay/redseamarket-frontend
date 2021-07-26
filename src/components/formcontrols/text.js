import React, { Component } from 'react';

class TextField extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
      
        return (
            <div className="form-group">
            <input type="text" className="form-control" placeholder={this.props.placeholder} />
            </div>
            )
        }
}
export default TextField