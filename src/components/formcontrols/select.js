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
            type:this.props.type,
        }
        
    }

    render() {
        
        let {placeholder, option, master, master_id, type} = this.state;
        
        this.masterChange = (event, master) => {
            
            this.props.onOptionChange(event.target.value, master)
            this.setState({
                master: placeholder,
                master_id: event.target.value,
            })
            
        }

        this.optionChange = (e) => {
            
            this.props.optionChange(e.target.value);
        }
        
        if(this.props.type === 'Make'){
            
            return (
                <div className="form-group">
                    <select onChange={(e) => this.masterChange(e, placeholder)} className="form-control">
                        <option value="">Select {placeholder}</option>
                        {this.props.option.map((option, index) => {
                            
                            return (
                                <option key={index} value={option.id}>{option.name}</option>
                            )
                        })}
                        
                    </select>
                </div>
            );
        }

        else if(this.props.type === 'Model'){
            
            return (
                <div className="form-group">
                    <select onChange={(e) => this.masterChange(e, placeholder)} className="form-control">
                        <option value="" selected>Select {placeholder}</option>
                        {this.props.option.map((option, index) => {
                            
                            return (
                                <option key={index} value={option.id}>{option.name}</option>
                            )
                        })}
                        
                    </select>
                </div>
            );
        }

        else if(this.props.type === 'Variant'){
            
            return (
                <div className="form-group">
                    <select className="form-control">
                        <option value="" selected>Select {placeholder}</option>
                        {this.props.option.map((option, index) => {
                            
                            return (
                                <option key={index} value={option.id}>{option.name}</option>
                            )
                        })}
                        
                    </select>
                </div>
            );
        }

        else if(type === 'customField'){

            return (
                <div className="form-group">
                    <select className="form-control">
                        <option value="">Select {placeholder}</option>
                        {option.map((option, index) => {
                            
                            return (
                                <option key={index} value={option.id}>{option.value}</option>
                            )
                        })}
                        
                    </select>
                </div>
            );
        }

        else if(type === 'common'){
     
            return (
                <div className="form-group">
                    <select onChange={(e) => this.optionChange(e)} className="form-control">
                        <option value="">Select {placeholder}</option>
                        {this.props.option.map((option, index) => {
                            
                            return (
                                <option key={index} value={option.id}>{option.name}</option>
                            )
                        })}
                        
                    </select>
                </div>
            );

        }

        else {
            return (
                <div className="form-group">
                    <select className="form-control">
                        <option value="">Select {placeholder}</option>
                    </select>
                </div>
            );
        }
       
    }
}
export default SelectField