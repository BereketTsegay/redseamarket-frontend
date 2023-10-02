import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL, IMAGE_URL, userToken } from '../../projectString';
import defaultImage from '../../../src/web-assets/img/icon-256x256.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loader from '../Loader';
import CurrencyFormat from 'react-currency-format';

let currency = localStorage.getItem('currency') ? localStorage.getItem('currency') : 'USD';
let currency_value=localStorage.getItem('currency_value') ;
 currency_value = currency_value&&(currency_value!='null')? localStorage.getItem('currency_value') : 0;

export default class ProfileList extends Component {

    constructor(props){
        super(props);

        this.state = {
            isFavourite: 0,
            isAd: 0,
            loaderStatus: false,
        }
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
        let profile = this.props.profile;
        let {isFavourite, isAd, loaderStatus} = this.state;
        
        return (
            <>
            {loaderStatus == true ? <Loader /> : ''}
            <li>
                <div class="panel-media">
                    <Link to={`/profileDetails/${profile.id}`}><img style={{minHeight:'150px', maxHeight:'150px'}} src={profile.user.image ? IMAGE_URL+'/'+ profile.user.image : defaultImage} alt="media" /></Link>
                </div>
                <div class="panel-content">
                    <h3 class="panel-title"><Link to={`/profileDetails/${profile.id}`}>{profile.user.name}</Link></h3>
                    <div class="panel-meta d-flex align-items-center">
                        <span class="label">{profile.title}</span>
                       
                    </div>
                    <div class="panel-meta d-flex align-items-center">
                    <span class="label">Experiance {profile.work_experience} Year</span> 

                    </div>
                    <div class="row">
                        <div class="col-lg-8">
                        <div class="panel-meta">
                            <span class="label">Overview : {profile.overview}</span>
                          
                        </div>
                        </div>
                        <div class="col-lg-4 text-left text-lg-right">

                        </div>
                    </div>
                </div>
            </li>
            
            </>
        )
    }
}
