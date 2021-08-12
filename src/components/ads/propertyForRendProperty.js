import React, { Component } from 'react'

export default class propertyForRendProperty extends Component {
    constructor(props){
        super(props);
    }

    render() {
        let {room, property_type, size, furnished} = this.props;

        return (
            <div>
                <li><img src="assets/img/pdt-bed.svg" alt="media" />{property_type} </li>
                <li><img src="assets/img/door-open-solid.svg" alt="media" style={{width:'20px'}} />{room} Room </li>
                <li><img src="assets/img/pdt-space.svg" alt="media" />{size} SqFt </li>
                <li><img src="assets/img/pdt-sofa.svg" alt="media" />{furnished == 1 ? 'Furnished' : 'Unfurnished'}</li>
            </div>
        )
    }
}
