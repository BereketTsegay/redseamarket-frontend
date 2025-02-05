import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../../../src/web-assets/img/icon-256x256.png';
import { BASE_URL, IMAGE_URL,userToken } from '../../projectString';
import Swal from 'sweetalert2';
import CurrencyFormat from 'react-currency-format';

let currency = localStorage.getItem('currency') ? localStorage.getItem('currency') : 'USD';
let currency_value=localStorage.getItem('currency_value') ;
 currency_value = currency_value&&(currency_value!='null')? localStorage.getItem('currency_value') : 0;
 export default class ads extends Component {

    constructor(props){
        super(props);
        this.state = {
            token: userToken,
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

    adDelete = (id) => {

        axios({
            url: `${BASE_URL}/customer/ad/delete`,
            method: 'POST',
            headers: { Authorization: "Bearer " + this.state.token },

            data: {
                ads_id: id,
            },
        }).then(response => {

            if(response.data.status === 'success'){
                Swal.fire({
                    'icon': 'success',
                    'title': 'Success!',
                    'text': response.data.message,
                    timer: 1000
                }).then(() => {
                    window.location.reload();
                });
            }

           // window.location.reload();


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
                                <h3 className="panel-price">{currency} <CurrencyFormat value={(ads.price*currency_value).toFixed(0)} displayType={'text'} thousandSeparator={true}  /></h3>
                                <h4 className="panel-title">{ads.title} {ads.custom_value ? ads.custom_value.map((customValue, index) => {
                                    if(index < 2){
                                        return ' • '+customValue.name+':'+ customValue.value
                                    }
                                }) : ''}</h4>
                                <p className="panel-description">{ads.country_name}, {ads.state_name}, {ads.city_name}</p>
                            </div>
                        </Link>
                        <Link to={`/update-form/${ads.id}`}>edit</Link>
                        <Link onClick={ () => this.adDelete(ads.id) }>delete</Link>

                        {ads.status == 2 ? <span className="badge-pending" style={{'color':'red'}}><span>Rejected</span></span> :
                        ads.status == 0 ? <span className="badge-pending"><span>Pending</span></span> :
                        ads.category.name=="Jobs" ?  <Link to={`/job/document/list/${ads.id}`}>View Request Documets</Link> : '' 
                       }

                       {ads.status == 1 ? <Link to={`/ad/enquiries/${ads.id}`}>Ads Enquiries <span className="badge-pending"style={{'color':'red'}}>({ads.enquiries.length})</span></Link>:''}
                        
                    </div>
                </div>
        )
    }
}
