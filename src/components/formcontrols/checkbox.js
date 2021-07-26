import React, { Component } from 'react'

export default class checkbox extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="form-group">
                <label>{this.props.label}</label>
                <input type="checkbox" checked={this.props.checked} className="form-control" />
            </div>
        )
    }
}
