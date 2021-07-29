import axios from 'axios';
import React, { Component } from 'react';
import { BASE_URL } from '../../projectString';

class SelectField extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            placeholder: this.props.placeholder,
            option: this.props.option,
            master: '',
            master_id: '',
        }
    }

    
    render() {

        
        
        this.masterChange = (event, master) => {
            
            this.props.onOptionChange(event.target.value, master)
            this.setState({
                master: this.props.placeholder,
                master_id: event.target.value,
            })
            
        }

        return (
            <div className="form-group">
                <select onChange={(e) => this.masterChange(e, this.props.placeholder)} className="form-control">
                    <option value="">Select {this.state.placeholder}</option>
                    {this.state.option.map((option, index) => {
                        
                        return (
                            <option key={index} value={option.id}>{option.name}</option>
                        )
                    })}
                    
                </select>
            </div>
        );
       
    }
}
export default SelectField