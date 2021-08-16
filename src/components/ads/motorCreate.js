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
            make_id: '',
            model_id: '',
            registration_year: '',
            mileage: '',
            fuel: '',
            transmission: '',
            condition: '',
            aircondition: false,
            gps: false,
            security: false,
            tire: false,
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

        this.setState({
            model_id: id,
        }, () => {
            
            let motoreValue = {
                'make_id'           : this.state.make_id,
                'model_id'          : this.state.model_id,
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
            [name]: value,
         }, () => {
            
            let motoreValue = {
                'make_id'           : this.state.make_id,
                'model_id'          : this.state.model_id,
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

        this.setState({
            [name]: value,
        }, () => {
            
            let motoreValue = {
                'make_id'           : this.state.make_id,
                'model_id'          : this.state.model_id,
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

    fuelChange = (value) => {

        this.setState({
            fuel: value,
        }, () => {
            
            let motoreValue = {
                'make_id'           : this.state.make_id,
                'model_id'          : this.state.model_id,
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

        let {makeOption, modelOption, fuelOption, transmissionOption, conditionOption, make_id, model_id, 
            registration_year, mileage, transmission, condition} = this.state;
            
        let errors = this.props.errors ? this.props.errors : '';
        let loaderStatus = this.state.loaderStatus;

        return (
            
            <div>
                {loaderStatus == true ? <Loader /> : 
                <>
                    <SelectField placeholder="Make" optionChange={this.makeChange} option={makeOption} type="common" error={errors.errors_make_id} />
                    <SelectField placeholder="Model" optionChange={this.modelChange} option={modelOption} type="common" error={errors.errors_model_id} />
                    <Number placeholder="Registerd Year" handleChange={this.handleChange} name="registration_year" value={registration_year} error={errors.errors_registration_year} />
                    <SelectField placeholder="Fuel Type" optionChange={this.fuelChange} option={fuelOption} type="common" error={errors.errors_fuel}  />
                    <Radio label="Transmission" name="transmission" radioChange={this.radioChange} option={transmissionOption} error={errors.errors_transmission} />
                    <Radio label="Condition" name="condition" radioChange={this.radioChange} option={conditionOption} error={errors.errors_condition} />
                    <Number placeholder="Mileage" handleChange={this.handleChange} name="mileage" value={mileage} error={errors.errors_mileage} />
                    <label>Features</label>
                    <Checkbox checkboxChange={this.checkboxChange} name="aircondition" label="Air Conditioner" />
                    <Checkbox checkboxChange={this.checkboxChange} name="gps" label="GPS" />
                    <Checkbox checkboxChange={this.checkboxChange} name="security" label="Security System" />
                    <Checkbox checkboxChange={this.checkboxChange} name="tire" label="Spare Tire" />
                </>}
            </div>
        );
    }
}
