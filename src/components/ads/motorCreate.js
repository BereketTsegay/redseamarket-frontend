import axios from 'axios';
import React, { Component } from 'react'
import { BASE_URL, userToken } from '../../projectString';
import Checkbox from '../formcontrols/checkbox';
import Number from '../formcontrols/number';
import Radio from '../formcontrols/radio';
import SelectField from '../formcontrols/select';
import Loader from '../Loader';

export default class motorCreate extends Component {
    constructor(props){
        super(props);

        this.state = {
            makeOption: [],
            modelOption: [],
            variantOption: [],
            fuelOption: [
                {
                    'id': 'Petrol',
                    'name': 'Petrol',
                },
                {
                    'id': 'Diesel', 
                    'name': 'Diesel',  
                },
                {
                    'id': 'LPG Gas',
                    'name': 'LPG Gas',
                },
                {
                    'id': 'Electric',
                    'name': 'Electric',
                },
            ],
            transmissionOption:[
                {
                    'value': 'Manual',
                },
                {
                    'value': 'Automatic',
                },
            ],
            conditionOption:[
                {
                    'value': 'New',
                },
                {
                    'value': 'Used',
                },
            ],
            make_id: this.props.motorList.make_id,
            model_id: this.props.motorList.model_id,
            variant_id: this.props.motorList.variant_id,
            registration_year: this.props.motorList.registration_year,
            mileage: this.props.motorList.mileage,
            fuel: this.props.motorList.fuel,
            transmission: this.props.motorList.transmission,
            condition: this.props.motorList.condition,
            aircondition: this.props.motorList.aircondition,
            gps: this.props.motorList.gps,
            security: this.props.motorList.security,
            tire: this.props.motorList.tire,
            token: userToken,
            loaderStatus: false,

        }
    }

    componentWillMount = () => {

        axios({
            url: `${BASE_URL}/customer/get/make`,
            method: 'POST',
            headers:{ Authorization: "Bearer " + this.state.token },

        }).then(response => {

            if(response.data.status == 'success'){
                this.setState({
                    makeOption: response.data.make,
                });
            }

        }).catch((error) => {

        });
        axios({
            url: `${BASE_URL}/customer/get/model`,
            method: 'POST',
            headers: { Authorization: 'Bearer ' + this.state.token },
            data: {
                make_id: this.props.motorList.make_id,
            }
        }).then(response => {

            if(response.data.status == 'success'){
                this.setState({
                    modelOption: response.data.model,
                });
            }

        }).catch((error) => {
            
        });
        axios({
            url: `${BASE_URL}/customer/get/variant`,
            method: 'POST',
            headers: { Authorization: 'Bearer ' + this.state.token },
            data: {
                model_id: this.props.motorList.model_id,
            }
        }).then(response => {
            if(response.data.status === 'success'){

                this.setState({
                    variantOption: response.data.variant,

                });
            }

        }).catch((error) => {
            
        });
    }

    makeChange = (id) => {
        axios({
            url: `${BASE_URL}/customer/get/model`,
            method: 'POST',
            headers: { Authorization: 'Bearer ' + this.state.token },
            data: {
                make_id: id,
            }
        }).then(response => {

            if(response.data.status == 'success'){
                this.setState({
                    make_id: id,
                    modelOption: response.data.model,
                });
            }

        }).catch((error) => {
            
        });
    }

    modelChange = (id) => {
        
        axios({
            url: `${BASE_URL}/customer/get/variant`,
            method: 'POST',
            headers: { Authorization: 'Bearer ' + this.state.token },
            data: {
                model_id: id,
            }
        }).then(response => {
            if(response.data.status === 'success'){

                this.setState({
                    model_id: id,
                    variantOption: response.data.variant,

                }, () => {
                    
                    let motoreValue = {
                        'make_id'           : this.state.make_id,
                        'model_id'          : this.state.model_id,
                        'variant_id'        : this.state.variant_id,
                        'registration_year' : this.state.registration_year,
                        'fuel'              : this.state.fuel,
                        'transmission'      : this.state.transmission,
                        'condition'         : this.state.condition,
                        'mileage'           : this.state.mileage,
                        'aircondition'      : this.state.aircondition,
                        'gps'               : this.state.gps,
                        'security'          : this.state.security,
                        'tire'              : this.state.tire,
                    };
            
                    this.props.motorEvents(motoreValue)
                });
            }

        }).catch((error) => {

        });

    }

    variantChange = (id) => {

        this.setState({
            variant_id: id,
        }, () => {
            
            let motoreValue = {
                'make_id'           : this.state.make_id,
                'model_id'          : this.state.model_id,
                'variant_id'        : this.state.variant_id,
                'registration_year' : this.state.registration_year,
                'fuel'              : this.state.fuel,
                'transmission'      : this.state.transmission,
                'condition'         : this.state.condition,
                'mileage'           : this.state.mileage,
                'aircondition'      : this.state.aircondition,
                'gps'               : this.state.gps,
                'security'          : this.state.security,
                'tire'              : this.state.tire,
            };
    
            this.props.motorEvents(motoreValue)
        });

    }

    checkboxChange = (name, value) => {
        
        this.setState({
            [name]: value === true ? name : '',
         }, () => {
            
            let motoreValue = {
                'make_id'           : this.state.make_id,
                'model_id'          : this.state.model_id,
                'variant_id'        : this.state.variant_id,
                'registration_year' : this.state.registration_year,
                'fuel'              : this.state.fuel,
                'transmission'      : this.state.transmission,
                'condition'         : this.state.condition,
                'mileage'           : this.state.mileage,
                'aircondition'      : this.state.aircondition,
                'gps'               : this.state.gps,
                'security'          : this.state.security,
                'tire'              : this.state.tire,
            };
            
            this.props.motorEvents(motoreValue)
        });
    }

    handleChange = (name, value) => {

        if(name === 'registration_year'){

            if(value.length <= 4){
                
                this.setState({
                    [name]: value,
                }, () => {
                    
                    let motoreValue = {
                        'make_id'           : this.state.make_id,
                        'model_id'          : this.state.model_id,
                        'variant_id'        : this.state.variant_id,
                        'registration_year' : this.state.registration_year,
                        'fuel'              : this.state.fuel,
                        'transmission'      : this.state.transmission,
                        'condition'         : this.state.condition,
                        'mileage'           : this.state.mileage,
                        'aircondition'      : this.state.aircondition,
                        'gps'               : this.state.gps,
                        'security'          : this.state.security,
                        'tire'              : this.state.tire,
                    };
            
                    this.props.motorEvents(motoreValue)
                });
            }
        }
        else{

            this.setState({
                [name]: value,
            }, () => {
                
                let motoreValue = {
                    'make_id'           : this.state.make_id,
                    'model_id'          : this.state.model_id,
                    'variant_id'        : this.state.variant_id,
                    'registration_year' : this.state.registration_year,
                    'fuel'              : this.state.fuel,
                    'transmission'      : this.state.transmission,
                    'condition'         : this.state.condition,
                    'mileage'           : this.state.mileage,
                    'aircondition'      : this.state.aircondition,
                    'gps'               : this.state.gps,
                    'security'          : this.state.security,
                    'tire'              : this.state.tire,
                };
        
                this.props.motorEvents(motoreValue)
            });
            
        }
    }

    fuelChange = (value) => {

        this.setState({
            fuel: value,
        }, () => {
            
            let motoreValue = {
                'make_id'           : this.state.make_id,
                'model_id'          : this.state.model_id,
                'variant_id'        : this.state.variant_id,
                'registration_year' : this.state.registration_year,
                'fuel'              : this.state.fuel,
                'transmission'      : this.state.transmission,
                'condition'         : this.state.condition,
                'mileage'           : this.state.mileage,
                'aircondition'      : this.state.aircondition,
                'gps'               : this.state.gps,
                'security'          : this.state.security,
                'tire'              : this.state.tire,
            };
    
            this.props.motorEvents(motoreValue)
        });
    }

    radioChange = (name, value) => {

        this.setState({
            [name]:value,
        }, () => {

            let motoreValue = {
                'make_id'           : this.state.make_id,
                'model_id'          : this.state.model_id,
                'variant_id'        : this.state.variant_id,
                'registration_year' : this.state.registration_year,
                'fuel'              : this.state.fuel,
                'transmission'      : this.state.transmission,
                'condition'         : this.state.condition,
                'mileage'           : this.state.mileage,
                'aircondition'      : this.state.aircondition,
                'gps'               : this.state.gps,
                'security'          : this.state.security,
                'tire'              : this.state.tire,
            };
    
            this.props.motorEvents(motoreValue)
        });
    }

    render() {

        let {makeOption, modelOption, variantOption, fuelOption, transmissionOption, conditionOption, make_id, model_id, 
            registration_year, mileage, transmission, condition} = this.state;
            
        let errors = this.props.errors ? this.props.errors : '';
        let loaderStatus = this.state.loaderStatus;
        let motor = this.props.motorList;
        

        return (
            
            <div>
                {loaderStatus == true ? <Loader /> : ''}
                <>
                    <SelectField placeholder="Make" selected={motor.make_id} label="Make" optionChange={this.makeChange} option={makeOption} type="common" error={errors.errors_make_id} />
                    <SelectField placeholder="Model" label="Model" selected={motor.model_id} optionChange={this.modelChange} option={modelOption} type="common" error={errors.errors_model_id} />
                    <SelectField placeholder="Variant" label="Variant" selected={motor.variant_id} optionChange={this.variantChange} option={variantOption} type="common" error={errors.errors_variant_id} />
                    <Number placeholder="Registerd Year" label="Registerd Year" handleChange={this.handleChange} name="registration_year" value={motor.registration_year} error={errors.errors_registration_year} />
                    <SelectField placeholder="Fuel Type" label="Fuel Type" selected={motor.fuel} optionChange={this.fuelChange} option={fuelOption} type="common" error={errors.errors_fuel}  />
                    <Radio label="Transmission" name="transmission" radioChange={this.radioChange} selected={motor.transmission} option={transmissionOption} error={errors.errors_transmission} />
                    <Radio label="Condition" name="condition" radioChange={this.radioChange} selected={motor.condition} option={conditionOption} error={errors.errors_condition} />
                    <Number placeholder="Mileage" label="Mileage" handleChange={this.handleChange} name="mileage" value={motor.mileage} error={errors.errors_mileage} />
                    <label>Features</label>
                    <Checkbox checkboxChange={this.checkboxChange} checkStatus={motor.aircondition} name="aircondition" label="Air Conditioner" />
                    <Checkbox checkboxChange={this.checkboxChange} checkStatus={motor.gps} name="gps" label="GPS" />
                    <Checkbox checkboxChange={this.checkboxChange} checkStatus={motor.security} name="security" label="Security System" />
                    <Checkbox checkboxChange={this.checkboxChange} checkStatus={motor.tire} name="tire" label="Spare Tire" />
                </>
            </div>
        );
    }
}
