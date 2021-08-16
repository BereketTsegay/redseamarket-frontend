import axios from 'axios';
import React, { Component } from 'react';
import { BASE_URL } from '../../projectString';
class Header extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            city: [],
            country_id: 229,
        }
    }

    componentWillMount = () => {

        axios({
            url: `${BASE_URL}/customer/city/list`,
            method: 'POST',
            data: {
                country_id: this.state.country_id,
            },
        }).then(response => {
            if(response.data.status === 'success'){

                this.setState({
                    city: response.data.city,
                });
            }

        }).catch((error) => {

        });
    }

    render() {

        let {city, country_id} = this.state;
        return (
            <div className="country-select-panel d-block d-md-inline-block">
            <select className="form-control form-control-sm d-block d-md-inline-block">

               <option selected>All cities</option>
               {city ? city.map((city, index) => {
                   return <option value={city.id}>{city.name}</option>
               }) : ''}
               
            </select>
         </div>
        )
    }
}
export default Header