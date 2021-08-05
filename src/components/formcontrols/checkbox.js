import React, { Component } from 'react'

export default class checkbox extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (

            <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" className="custom-control-input" checked={this.props.checked} id={this.props.label} />
                <label class="custom-control-label font-weight-normal" for={this.props.label} >{this.props.label} </label>
            </div>
            
        )
    }
}
