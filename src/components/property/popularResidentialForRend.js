import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import defaultImage from '../../../src/web-assets/img/icon-256x256.png';
import { BASE_URL, IMAGE_URL } from '../../projectString';
let currency = localStorage.getItem('currency') ? localStorage.getItem('currency') : 'USD';
let currency_value = localStorage.getItem('currency_value') ? localStorage.getItem('currency_value') : '1';

export default class popularResidentialForRend extends Component {

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
            <div className="col-product-panel">
                <div className="product-panel">
                    <Link to={`/adsdetails/${ads.id}`} onClick={ () => this.viewUpdate(ads.id) }>
                        <div className="panel-media">
                            <img style={{maxHeight: '150px', minHeight: '150px'}} src={ads.image[0] ? IMAGE_URL+'/'+ads.image[0].image : defaultImage } alt="media" />
                            {ads.featured_flag == 1 ? <span className="badge-featured"><span>Featured</span></span> : '' }
                        </div>
                        <div className="panel-content">
                            <h3 className="panel-price">{currency} {(ads.price * currency_value).toFixed(2)}</h3>
                            <h4 className="panel-title">{ads.room} Room • {ads.size} SqFt</h4>
                            <p className="panel-description">{ads.state_name}, {ads.city_name}</p>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}
