import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import defaultImage from '../../../src/web-assets/img/icon-256x256.png';
import { BASE_URL, IMAGE_URL, userToken } from '../../projectString';
let currency = localStorage.getItem('currency') ? localStorage.getItem('currency') : 'USD';
let currency_value=localStorage.getItem('currency_value') ;
 currency_value = currency_value&&(currency_value!='null')? localStorage.getItem('currency_value') : 0;

export default class propertyAdsItem extends Component {

    constructor(props){
        super(props);

        this.state = {
            favourite: '',
            loginStatus: localStorage.getItem('loginStatus') ? localStorage.getItem('loginStatus') : false,
        }
    }
    
    componentWillMount = () => {

        if(userToken != null){
            axios({
                url: `${BASE_URL}/customer/ad/favourite`,
                method: 'POST',
                headers: {
                    Authorization: "Bearer " + userToken,
                },
                data:{
                    ads_id: this.props.ads.id,
                }

            }).then(response => {

                if(response.data.status == 'success'){
                    if(response.data.favourite != 0){
                        this.setState({
                            favourite: response.data.favourite,
                        });
                    }
                }
                
            }).catch((error) => {

            });
        }
    }

    favouriteChange = id => {

        let action = '';

        if(this.state.favourite == 0){
            action = 'store';
        }
        else{
            action = 'remove';
        }

        axios({
            url: `${BASE_URL}/customer/favourite/adOrRemove`,
            method: 'POST',
            headers: {
                Authorization: "Bearer " + userToken,
            },
            data: {
                ads_id: id,
                action: action,
            }
        }).then(response => {

            if(response.data.status == 'success'){

                this.setState({
                    favourite: !this.state.favourite,
                });

                Swal.fire({
                    title: 'success!',
                    text: response.data.message,
                    icon: 'success',
                    confirmButtonText: 'OK'
                 });
            }

        }).catch((error) => {

        });
    }


    viewUpdate = (id) => {

        axios({
            url: `${BASE_URL}/customer/ads/view/countupdate`,
            method: 'POST',
            data: {
                ads_id: id,
            },
        }).then(response => {
  
        }).catch((error) => {
  
        });
     }

    render() {

        let ads = this.props.ads;
        let {favourite, loginStatus} = this.state;
        return (
            <li>
                <div class="panel-media">
                    <Link to={`/adsdetails/${ads.id}`} onClick={ () => this.viewUpdate(ads.id) }><img style={{minHeight:'150px', maxHeight:'150px'}} src={ads.image[0] ? IMAGE_URL+'/'+ ads.image[0].image : defaultImage} alt="media" /></Link>
                    {loginStatus == true || loginStatus === 'true' ?
                    <button class="btn" onClick={() => this.favouriteChange(ads.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"  fill={favourite != 0 ? '#007bff' : 'none'} stroke={favourite != 0 ? '#007bff' : 'currentColor'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button> : ''}
                </div>
                <div class="panel-content">
                    <h3 class="panel-title"><Link to={`/adsdetails/${ads.id}`} onClick={ () => this.viewUpdate(ads.id) }> {ads.title}</Link></h3>
                    <div class="panel-price text-brand">{currency} <span className="notranslate">{(ads.price * currency_value).toFixed(0)}</span></div>
                    <div class="panel-date d-flex align-items-center">
                        <small>{ads.created_on}</small> 
                        {ads.featured_flag == 1 ? <span class="badge-featured"><span>Featured</span></span> : '' }
                    </div>
                    <div class="panel-badge">
                        <span class="badge">
                        <img src="assets/img/pdt-bed.svg" alt="media" />
                        {ads.property_rend ? ads.property_rend.building_type: ads.property_sale ? ads.property_sale.building_type : ''}
                        </span>
                        <span class="badge">
                        <img src="assets/img/door-open-solid.svg" alt="media" style={{width:'20px'}} />
                        {ads.property_rend ? ads.property_rend.room: ads.property_sale ? ads.property_sale.room : ''} Room
                        </span>
                        <span class="badge">
                        <img src="assets/img/pdt-space.svg" alt="media" />
                        {ads.property_rend ? ads.property_rend.size : ads.property_sale ? ads.property_sale.size : ''} SqFt
                        </span>
                    </div>
                    <div class="panel-location">
                        <img src="assets/img/pdt-location.svg" alt="media" />
                        {ads.country_name}, {ads.state_name}, {ads.city_name}
                    </div>
                    {/* <div class="panel-btn-group">
                        <a href="#" class="btn btn-dark has-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        Email
                        </a>
                        <a href="#" class="btn btn-primary has-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        Call
                        </a>
                    </div> */}
                </div>
            </li>
        )
    }
}
