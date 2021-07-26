import React, { Component } from 'react'

export default class number extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="form-group">
            <input type="number" className="form-control" placeholder={this.props.placeholder} />
            </div>
        )
    }
}
