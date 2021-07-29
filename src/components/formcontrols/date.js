import React, { Component } from 'react'

export default class date extends Component {
    
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="form-group">
            <input type="date" className="form-control" placeholder={this.props.placeholder} />
            </div>
        )
    }
}
