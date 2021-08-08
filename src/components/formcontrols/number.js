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

        return (
            <div className="form-group">
                <input type="number" name={name} value={value} onChange={(e) => this.handleEvent(e)} className="form-control" placeholder={this.props.placeholder} />
            </div>
        )
    }
}
