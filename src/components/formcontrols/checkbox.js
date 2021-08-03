import React, { Component } from 'react'

export default class checkbox extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (

            <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" className="custom-control-input" checked={this.props.checked} id="customCheck1" />
                <label class="custom-control-label font-weight-normal" for="customCheck1">{this.props.label} </label>
            </div>
            
        )
    }
}
