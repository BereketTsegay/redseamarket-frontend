import React, { Component } from 'react'

export default class motorProperty extends Component {
    constructor(props){
        super(props);
    }

    render() {

        let make = this.props.make;
        let year = this.props.year;
        let fuel = this.props.fuel;

        return (
            <div>
                <li><img style={{width: '25px'}} src="assets/img/cogs-solid.svg" alt="media" />{make}</li>
                <li><img style={{width: '20px'}} src="assets/img/calendar-alt-solid.svg" alt="media" />{year} </li>
                <li><img style={{width: '20px'}} src="assets/img/gas-pump-solid.svg" alt="media" />{fuel} </li>
            </div>
        )
    }
}
