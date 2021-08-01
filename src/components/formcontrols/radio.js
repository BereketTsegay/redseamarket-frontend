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
                <p>{label}</p>
                {option.map(function(a){
                    return (
                        <div>
                            <label>{a.value}</label>
                            <input type="radio" name={label} value={a.value} className="form-control" />
                        </div>
                    )
                })}
            </div>
        )
    }
}
