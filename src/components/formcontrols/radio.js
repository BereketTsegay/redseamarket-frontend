import React, { Component } from 'react'

export default class radio extends Component {

    constructor(props){
        super(props);
        this.state = {
            option : this.props.option,
            label : this.props.label,
        }
        
    }

    
    render() {

        let {option, label} = this.state;

        return (
            <div className="form-group">
                <label>{label}</label>
                {option.map(function(a){
                    return (
                       
                        <div class="custom-control custom-radio mb-3">
                            <input type="radio" name={label} value={a.value} class="custom-control-input" id={a.value}/>
                            <label class="custom-control-label font-weight-normal" for={a.value}>{a.value} </label>
                        </div>
                    )
                })}
            </div>
        )
    }
}
