import React, { Component } from 'react'

export default class number extends Component {
    constructor(props){
        super(props);

        
    }

    handleEvent = (e) => {

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
                <label>{this.props.label}</label>
                <input type="number" name={name} value={value} onChange={(e) => this.handleEvent(e)} className="form-control" placeholder={this.props.placeholder} min="0"/>
                {error.length > 0 ? <p className="help-block help-block-error"  style={ErrorStyle}>{error}</p> : '' }
            </div>
        )
    }
}
