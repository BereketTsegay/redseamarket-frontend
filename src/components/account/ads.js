import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../../../src/web-assets/img/icon-256x256.png';
import { BASE_URL, IMAGE_URL } from '../../projectString';
let currency = localStorage.getItem('currency') ? localStorage.getItem('currency') : 'USD';
let currency_value = localStorage.getItem('currency_value') ? localStorage.getItem('currency_value') : '1';
export default class ads extends Component {

    constructor(props){
        super(props);
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
        
        return (
                
                <div className="col-lg-3 col-md-4 col-6">
                    <div className="product-panel">
                        <Link to={`/adsdetails/${ads.id}`} onClick={ () => this.viewUpdate(ads.id) }>
                            <div className="panel-media">
                                {ads.image.length > 0 ? <img style={{minHeight:'150px', maxHeight:'150px'}} src={IMAGE_URL+'/'+ ads.image[0].image} alt="media" />: <img style={{minHeight:'150px', maxHeight:'150px'}} src={defaultImage} alt="media" />}
                                {ads.featured_flag == 1 ? <span className="badge-featured"><span>Featured</span></span> : ''}
                            </div>
                            <div className="panel-content">
                                <h3 className="panel-price">{currency} {(ads.price * currency_value).toFixed(2)}</h3>
                                <h4 className="panel-title">{ads.custom_value ? ads.custom_value.map((customValue, index) => {
                                    if(index < 2){
                                        return customValue.value+' '+ customValue.name+' • '
                                    }
                                }) : ''}</h4>
                                <p className="panel-description">{ads.country_name}, {ads.state_name}, {ads.city_name}</p>
                            </div>
                        </Link>
                        <Link to={`/update-form/${ads.id}`}>edit</Link>
                        {ads.status == 0 ? <span className="badge-pending"><span>Pending</span></span> : '' }
                        
                    </div>
                </div>
        )
    }
}
