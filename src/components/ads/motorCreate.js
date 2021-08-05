import React, { Component } from 'react'
import Checkbox from '../formcontrols/checkbox';
import Number from '../formcontrols/number';
import Radio from '../formcontrols/radio';
import SelectField from '../formcontrols/select'

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
        }
    }
    render() {

        let {makeOption, modelOption, fuelOption, transmissionOption, conditionOption} = this.state;

        return (
            
            <div>
                <SelectField placeholder="Make" option={makeOption} type="common" />
                <SelectField placeholder="Model" option={modelOption} type="common"  />
                <Number placeholder="Registerd Year" />
                <SelectField placeholder="Fuel Type" option={fuelOption} type="common"  />
                <Radio label="Transmission" option={transmissionOption} />
                <Radio label="Condition" option={conditionOption} />
                <Number placeholder="Mileage" />
                <label>Features</label>
                <Checkbox label="Air Conditioner" />
                <Checkbox label="GPS" />
                <Checkbox label="Security System" />
                <Checkbox label="Spare Tire" />
            </div>
        )
    }
}
