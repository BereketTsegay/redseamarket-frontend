import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { IMAGE_URL } from '../../projectString';
import defaultImage from '../../../src/web-assets/img/icon-256x256.png';

export default class listAdItem extends Component {

    constructor(props){
        super(props);

    }

    render() {
        let ads = this.props.ads;

        return (
            <li>
                <div class="panel-media">
                    <a href="#"><img src={ads.image[0] ? IMAGE_URL+'/'+ ads.image[0].image : defaultImage} alt="media" /></a>
                </div>
                <div class="panel-content">
                    <h3 class="panel-title"><Link to={`/adsdetails/${ads.id}`}>{ads.title}</Link></h3>
                    <div class="panel-price text-brand">AED {ads.price}</div>
                    <div class="panel-meta d-flex align-items-center">
                        <span class="label">{ads.created_on}</span> 
                        {ads.featured_flag == 1 ? <span class="badge-featured ml-3"><span>Featured</span></span> : ''}
                    </div>
                    {ads.category_id == 1 ? 
                    <>
                        <div class="panel-meta">
                            <span class="label">Year:</span>
                            <strong>{ads.motore_value ? ads.motore_value.registration_year : ''}</strong>
                        </div>
                        <div class="row">
                            <div class="col-xl-4 col-6">
                            <div class="panel-meta">
                                <span class="label">Fuel:</span>
                                <strong>{ads.motore_value ? ads.motore_value.fuel_type : ''}</strong>
                            </div>
                            </div>
                            <div class="col-xl-4 col-6">
                            <div class="panel-meta">
                                <span class="label">Condition:</span>
                                <strong>{ads.motore_value ? ads.motore_value.condition : ''}</strong>
                            </div>
                            </div>
                        </div>
                    </>
                    : ads.category_id == 2 ?
                    <>
                        <div class="panel-meta">
                            <span class="label">Size:</span>
                            <strong>{ads.property_rend ? ads.property_rend.size : ''}</strong>
                        </div>
                        <div class="row">
                            <div class="col-xl-4 col-6">
                            <div class="panel-meta">
                                <span class="label">Rooms:</span>
                                <strong>{ads.property_rend ? ads.property_rend.room : ''}</strong>
                            </div>
                            </div>
                            <div class="col-xl-4 col-6">
                            <div class="panel-meta">
                                <span class="label">Furnished:</span>
                                <strong>{ads.property_rend ? ads.property_rend.furnished : ''}</strong>
                            </div>
                            </div>
                        </div>
                    </>
                    : ads.category_id == 3 ?
                    <>
                        <div class="panel-meta">
                            <span class="label">Size:</span>
                            <strong>{ads.property_sale ? ads.property_sale.size : ''}</strong>
                        </div>
                        <div class="row">
                            <div class="col-xl-4 col-6">
                            <div class="panel-meta">
                                <span class="label">Rooms:</span>
                                <strong>{ads.property_sale ? ads.property_sale.room : ''}</strong>
                            </div>
                            </div>
                            <div class="col-xl-4 col-6">
                            <div class="panel-meta">
                                <span class="label">Furnished:</span>
                                <strong>{ads.property_sale ? ads.property_sale.furnished : ''}</strong>
                            </div>
                            </div>
                        </div>
                    </>
                    : ''
                    }
                    <div class="row">
                        <div class="col-lg-8">
                        <div class="panel-meta">
                            <span class="label">Located :</span>
                            <strong>{ads.country_name} &gt; {ads.state_name} &gt; {ads.city_name}</strong>
                        </div>
                        </div>
                        <div class="col-lg-4 text-left text-lg-right">
                        <button class="btn btn-favorite">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                            Add to Favorites
                        </button>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}
