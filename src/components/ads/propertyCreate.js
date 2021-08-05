import React, { Component } from 'react'
import Checkbox from '../formcontrols/checkbox'
import Number from '../formcontrols/number'
import Radio from '../formcontrols/radio'
import SelectField from '../formcontrols/select'

export default class propertyCreate extends Component {

    constructor(props){
        super(props)
        this.state = {
            furnished: [
                {
                    'value': 'Yes',
                },{
                    'value': 'No',
                },
            ],
            building:[
                {
                    'id': 'Apartment',
                    'name': 'Apartment',
                },
                {
                    'id': 'House',
                    'name': 'House',
                },
                {
                    'id': 'Store',
                    'name': 'Store',
                },
                {
                    'id': 'Office',
                    'name' : 'Office',
                },
                {
                    'id': 'Plot of land',
                    'name': 'Plot of land',
                },
            ],
        }
    }
    render() {

        let {furnished, building} = this.state;

        return (
            <div>
                <Number placeholder="Size" />
                <Number placeholder="Room" />
                <Radio label="Furnished" option={furnished} />
                <SelectField placeholder="Building Type" option={building} type="common"  />
                <Checkbox label="Parking" />
            </div>
        )
    }
}
