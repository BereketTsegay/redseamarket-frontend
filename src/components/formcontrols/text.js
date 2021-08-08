import React, { Component } from 'react';

class TextField extends React.Component{

    constructor(props){
        super(props);
    }

    handleChange = e => {

        this.props.handleChange(e.target.name, e.target.value)
    }

    render() {
        
        let name = this.props.name;
        let readonly = this.props.readonly;
        let value = this.props.value;

        return (
            <div className="form-group">
                <input type="text" name={name} value={value} onChange={(e) => this.handleChange(e)} className="form-control" placeholder={this.props.placeholder} readOnly={readonly} />
            </div>
            )
        }
}
export default TextField