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

        let selected1 = this.props.selected;
        
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

        let error = this.props.error ? this.props.error : '';

        let ErrorStyle = {
            color: 'red',
        };
        
        if(this.props.type === 'Make'){
            
            return (
                <div className="form-group">
                    <label>{this.props.label}</label>
                    <select onChange={(e) => this.masterChange(e, placeholder)} className="form-control">
                        <option value="">Select {placeholder}</option>
                        {this.props.option.map((option, index) => {
                            
                            return (
                                <option key={index} value={option.id}>{option.name}</option>
                            )
                        })}
                        
                    </select>
                    {error.length > 0 ? <p className="help-block help-block-error"  style={ErrorStyle}>{error}</p> : '' }
                </div>
            );
        }

        else if(this.props.type === 'Model'){
            
            return (
                <div className="form-group">
                    <label>{this.props.label}</label>
                    <select onChange={(e) => this.masterChange(e, placeholder)} className="form-control">
                        <option value="" selected>Select {placeholder}</option>
                        {this.props.option.map((option, index) => {
                            
                            return (
                                <option key={index} value={option.id}>{option.name}</option>
                            )
                        })}
                        
                    </select>
                    {error.length > 0 ? <p className="help-block help-block-error"  style={ErrorStyle}>{error}</p> : '' }
                </div>
            );
        }

        else if(this.props.type === 'Variant'){
            
            return (
                <div className="form-group">
                    <label>{this.props.label}</label>
                    <select className="form-control">
                        <option value="" selected>Select {placeholder}</option>
                        {this.props.option.map((option, index) => {
                            
                            return (
                                <option key={index} value={option.id}>{option.name}</option>
                            )
                        })}
                        
                    </select>
                    {error.length > 0 ? <p className="help-block help-block-error"  style={ErrorStyle}>{error}</p> : '' }
                </div>
            );
        }

        else if(type === 'customField'){

            return (
                <div className="form-group">
                    <label>{this.props.label}</label>
                    <select className="form-control">
                        <option value="">Select {placeholder}</option>
                        {option.map((option, index) => {
                            
                            return (
                                <option key={index} value={option.id}>{option.value}</option>
                            )
                        })}
                        
                    </select>
                    {error.length > 0 ? <p className="help-block help-block-error"  style={ErrorStyle}>{error}</p> : '' }
                </div>
            );
        }

        else if(type === 'common'){
     
            return (
                <div className="form-group">
                    <label>{this.props.label}</label>
                    <select onChange={(e) => this.optionChange(e)} className="form-control">
                        <option value="">Select {placeholder}</option>
                        {this.props.option.map((option, index) => {
                            if(option.id == selected1){
                                return (
                                    <option selected key={index} value={option.id}>{option.name}</option>
                                )
                            }
                            else{
                                return (
                                    <option key={index} value={option.id}>{option.name}</option>
                                )
                            }
                        })}
                        
                    </select>
                    {error.length > 0 ? <p className="help-block help-block-error"  style={ErrorStyle}>{error}</p> : '' }
                </div>
            );

        }

        else {
            return (
                <div className="form-group">
                    <label>{this.props.label}</label>
                    <select className="form-control">
                        <option value="">Select {placeholder}</option>
                    </select>
                </div>
            );
        }
       
    }
}
export default SelectField