import axios from 'axios';
import React, { Component } from 'react';
import { BASE_URL } from '../../projectString';
class Header extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            city: [],
            country_id: 229,
            city_id: '',
        }
    }

    componentWillMount = () => {
        
        this.setState({
            city_id: sessionStorage.getItem('city_id') ? sessionStorage.getItem('city_id') : '',
        });

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
    
    countryChange = (e) => {

        sessionStorage.removeItem('city_id');
        
        sessionStorage.setItem('city_id', e.target.value);
    }

    render() {

        let {city, country_id, city_id} = this.state;
        
        return (
            <div className="country-select-panel d-block d-md-inline-block">
            <select onChange={ (e) => this.countryChange(e) } className="form-control form-control-sm d-block d-md-inline-block">
                {city_id ? city ? city.map((city, index) => {
                    if(city.id == city_id){
                        return <option selected value={city.id}>{city.name}</option>
                    }
                    else{
                        return <option value={city.id}>{city.name}</option>
                    }

                }) : '' : city ? 
                <>
                    <option selected value="">All cities</option>
                    {city.map((city, index) => {
                        return <option value={city.id}>{city.name}</option>
                    })}
                </>
                : <option selected value="">All cities</option> }
               
            </select>
         </div>
        )
    }
}
export default Header