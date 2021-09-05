import React, { Component } from 'react'

export default class checkbox extends Component {

    constructor(props){
        super(props);

    }

    eventChange = e => {
        
        this.props.checkboxChange(e.target.name, e.target.checked);
        
    }

    render() {
        let name = this.props.name;
        let checkStatus = this.props.checkStatus;
        
        return (

            <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" name={name} onChange={(e) => this.eventChange(e)} className="custom-control-input" id={this.props.label} />
                <label class="custom-control-label font-weight-normal" for={this.props.label} >{this.props.label} </label>
            </div>
            
        )
    }
}
