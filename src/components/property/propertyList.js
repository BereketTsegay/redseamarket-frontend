import axios from 'axios';
import React, { Component } from 'react'
import { BASE_URL } from '../../projectString';
import PaginationLink from '../account/paginationLink';
import AppDownload from '../home/app-download'
import Footer from '../layouts/footer';
import Header from '../layouts/header'
import PropertyAdsItem from './propertyAdsItem';
import PropertyCityList from './propertyCityList';
import SearchArea from './searchArea';
import Loader from '../Loader';

export default class propertyList extends Component {

    constructor(props){
        super(props);

        this.state = {
            category_id: '',
            subcategory_id: '',
            city: '',
            property_type: '',
            price: '',
            room: '',
            ads: [],
            paginataionArray: [],
            last: '',
            previousPage: '',
            nextPage: '',
            total: '',
            subcategory: {},
            latitude: localStorage.getItem('latitude') ? localStorage.getItem('latitude') : 0,
            longitude: localStorage.getItem('longitude') ? localStorage.getItem('longitude') : 0,
            loaderStatus: false,
        }
    }

    componentWillMount = () => {

        this.setState({
            category_id: ((new URLSearchParams(this.props.location.search).get('category_id')) != '') ? (new URLSearchParams(this.props.location.search).get('category_id')) : '',
            subcategory_id: ((new URLSearchParams(this.props.location.search).get('subcategory_id')) != '') ? (new URLSearchParams(this.props.location.search).get('subcategory_id')) : '',
            city: ((new URLSearchParams(this.props.location.search).get('city')) != '') ? (new URLSearchParams(this.props.location.search).get('city')) : '',
            property_type: ((new URLSearchParams(this.props.location.search).get('property_type')) != '') ? (new URLSearchParams(this.props.location.search).get('property_type')) : '',
            price: ((new URLSearchParams(this.props.location.search).get('price')) != '') ? (new URLSearchParams(this.props.location.search).get('price')) : '',
            room: ((new URLSearchParams(this.props.location.search).get('room')) != '') ? (new URLSearchParams(this.props.location.search).get('room')) : '',
            loaderStatus: true,

        }, () => {
            
            axios({

                url: `${BASE_URL}/customer/get/property/filter`,
                method: 'POST',
                data: {
                    category_id: this.state.category_id,
                    subcategory_id: this.state.subcategory_id,
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    city: this.state.city,
                    property_type: this.state.property_type,
                    price: this.state.price,
                    room: this.state.room,
                },

            }).then(response => {

                if(response.data.status == 'success'){
                   
                    this.setState({
                        ads: response.data.ads.data,
                        paginataionArray: response.data.ads.links,
                        last: response.data.ads.last_page,
                        previousPage: response.data.ads.prev_page_url,
                        nextPage: response.data.ads.next_page_url,
                        total: response.data.ads.total,
                        subcategory: response.data.subcategory,
                    });
                }

                this.setState({
                    loaderStatus: false,
                });

            }).catch((error) => {
                this.setState({
                    loaderStatus: false,
                });
            });
        });
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {

        this.setState({
            category_id: ((new URLSearchParams(nextProps.location.search).get('category_id')) != '') ? (new URLSearchParams(nextProps.location.search).get('category_id')) : '',
            subcategory_id: ((new URLSearchParams(nextProps.location.search).get('subcategory_id')) != '') ? (new URLSearchParams(nextProps.location.search).get('subcategory_id')) : '',
            city: ((new URLSearchParams(nextProps.location.search).get('city')) != '') ? (new URLSearchParams(nextProps.location.search).get('city')) : '',
            property_type: ((new URLSearchParams(nextProps.location.search).get('property_type')) != '') ? (new URLSearchParams(nextProps.location.search).get('property_type')) : '',
            price: ((new URLSearchParams(nextProps.location.search).get('price')) != '') ? (new URLSearchParams(nextProps.location.search).get('price')) : '',
            room: ((new URLSearchParams(nextProps.location.search).get('room')) != '') ? (new URLSearchParams(nextProps.location.search).get('room')) : '',
            loaderStatus: true,
        }, () => {
            
            axios({

                url: `${BASE_URL}/customer/get/property/filter`,
                method: 'POST',
                data: {
                    category_id: this.state.category_id,
                    subcategory_id: this.state.subcategory_id,
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    city: this.state.city,
                    property_type: this.state.property_type,
                    price: this.state.price,
                    room: this.state.room,
                },

            }).then(response => {

                if(response.data.status == 'success'){
                   
                    this.setState({
                        ads: response.data.ads.data,
                        paginataionArray: response.data.ads.links,
                        last: response.data.ads.last_page,
                        previousPage: response.data.ads.prev_page_url,
                        nextPage: response.data.ads.next_page_url,
                        total: response.data.ads.total,
                        subcategory: response.data.subcategory,
                    });
                }

                this.setState({
                    loaderStatus: false,
                });

            }).catch((error) => {
                this.setState({
                    loaderStatus: false,
                });
            });
        });

    }

    changeCategory = (category_id) => {

        this.setState({
            loaderStatus: true,
        });

        axios({

            url: `${BASE_URL}/customer/get/property/filter`,
            method: 'POST',
            data: {
                category_id: category_id,
                subcategory_id: this.state.subcategory_id,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                city: this.state.city,
                property_type: this.state.property_type,
                price: this.state.price,
                room: this.state.room,
            },

        }).then(response => {

            if(response.data.status == 'success'){
               
                this.setState({
                    ads: response.data.ads.data,
                    paginataionArray: response.data.ads.links,
                    last: response.data.ads.last_page,
                    previousPage: response.data.ads.prev_page_url,
                    nextPage: response.data.ads.next_page_url,
                    total: response.data.ads.total,
                    subcategory: response.data.subcategory,
                });
            }

            this.setState({
                loaderStatus: false,
            });

        }).catch((error) => {
            this.setState({
                loaderStatus: false,
            });
        });
    }

    paginationCall = url => {

        this.setState({
            loaderStatus: true,
        });

        axios({

            url: url,
            method: 'POST',
            data: {
                category_id: this.state.category_id,
                subcategory_id: this.state.subcategory_id,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                city: this.state.city,
                property_type: this.state.property_type,
                price: this.state.price,
                room: this.state.room,
            },

        }).then(response => {

            if(response.data.status == 'success'){
               
                this.setState({
                    ads: response.data.ads.data,
                    paginataionArray: response.data.ads.links,
                    last: response.data.ads.last_page,
                    previousPage: response.data.ads.prev_page_url,
                    nextPage: response.data.ads.next_page_url,
                    total: response.data.ads.total,
                    subcategory: response.data.subcategory,
                });
            }

            this.setState({
                loaderStatus: false,
            });

        }).catch((error) => {
            this.setState({
                loaderStatus: false,
            });
        });
    }

    render() {

        let {category_id, subcategory_id, city, property_type, price, room, ads, paginataionArray,
            last, previousPage, nextPage, total, subcategory, latitude, longitude, loaderStatus} = this.state;

        return (
            <div id="page" class="site-page">
                {loaderStatus == true ? <Loader /> :
                <>
                    <Header />
                    {/* <!-- =====[SECTION HERO] **===== --> */}
                    
                    <SearchArea category={category_id} changeCategoryToggle={this.changeCategory} type="result" />

                    {/* <!-- =====[SECTION CATEGORY LIST HEAD] **===== --> */}
                    <section class="section-category-list-head">
                        <div class="container">
                            <div class="row align-items-center">
                                <div class="col-xl-8 col-lg-7">
                                    <h2 class="section-title">{subcategory ? subcategory.name : ''} <small class="text-muted d-inline-block pl-2">{total} results</small> </h2>
                                </div>
                                {/* <div class="col-xl-4 col-lg-5">
                                    <div class="form-group mb-0">
                                    <label class="mb-0 pr-3">Sort By </label>
                                    <select class="form-control">
                                        <option>Newest to Oldest</option>
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                        <option>Option 3</option>
                                        <option>Option 4</option>
                                    </select>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </section>
                    <hr className="mb-5" />
                    {/* <!-- =====[SECTION CATEGORY TAGS] **===== --> */}

                    {/* <PropertyCityList /> */}

                    {/* <!-- =====[SECTION CATEGORY LIST] **===== --> */}
                    <section class="section-category-list">
                        <div class="container">
                            <div class="row">
                                <div class="col-xl-10 mx-auto">
                                    <ul class="category-sort-list">
                                        {ads ? ads.map((ads, index) => {
                                            return <PropertyAdsItem key={index} ads={ads} />
                                        })
                                        : <h3 className="text-center">No Data found!</h3>}
                                        
                                    </ul>
                                </div>
                            </div>

                            {last == 1 || last == '' ? '' :
                                <PaginationLink paginataionArray={paginataionArray} last={last} previousPage={previousPage} nexPage={nextPage} paginationChange={this.paginationCall} />
                            }
                        </div>
                    </section>


                    <AppDownload />
                    <Footer />
                </>}
            </div>
        )
    }
}
