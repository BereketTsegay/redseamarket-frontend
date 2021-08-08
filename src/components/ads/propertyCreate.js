import React, { Component } from 'react'
import Checkbox from '../formcontrols/checkbox'
import Number from '../formcontrols/number'
import Radio from '../formcontrols/radio'
import SelectField from '../formcontrols/select'

export default class propertyCreate extends Component {

    constructor(props){
        super(props)
        this.state = {
            furnishedOption: [
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
            size: '',
            room: '',
            furnished: '',
            buildingType: '',
            parking: '',
        }
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value,
        }, () => {

            let propertyValue = {
                'size': this.state.size,
                'room': this.state.room,
                'furnished': this.state.furnished,
                'buildingType': this.state.buildingType,
                'parking': this.state.parking,
            }

            this.props.propertyEvent(propertyValue);

         });
    }

    radioChange = (name, value) => {

        this.setState({
            [name]:value,
        }, () => {

            let propertyValue = {
                'size': this.state.size,
                'room': this.state.room,
                'furnished': this.state.furnished,
                'buildingType': this.state.buildingType,
                'parking': this.state.parking,
            }

            this.props.propertyEvent(propertyValue);

         });
    }

    typeChange = (value) => {

        this.setState({
            buildingType: value,
        }, () => {

            let propertyValue = {
                'size': this.state.size,
                'room': this.state.room,
                'furnished': this.state.furnished,
                'buildingType': this.state.buildingType,
                'parking': this.state.parking,
            }

            this.props.propertyEvent(propertyValue);

         });
    }

    checkboxChange = (name, value) => {

        this.setState({
            [name]: value,
         }, () => {

            let propertyValue = {
                'size': this.state.size,
                'room': this.state.room,
                'furnished': this.state.furnished,
                'buildingType': this.state.buildingType,
                'parking': this.state.parking,
            }

            this.props.propertyEvent(propertyValue);

         });
    }

    render() {

        let {furnishedOption, building, size, room} = this.state;

        return (
            <div>
                <Number placeholder="Size" handleChange={this.handleChange} name="size" value={size} />
                <Number placeholder="Room" handleChange={this.handleChange} name="room" value={room} />
                <Radio label="furnished" radioChange={this.radioChange} option={furnishedOption} />
                <SelectField placeholder="Building Type" optionChange={this.typeChange} option={building} type="common"  />
                <Checkbox checkboxChange={this.checkboxChange} name="parking" label="Parking" />
            </div>
        )
    }
}
