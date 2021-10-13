import axios from 'axios'
import React, { Component } from 'react'
import { BASE_URL } from '../../projectString'
import PaginationLink from '../account/paginationLink'
import HeadFilter from '../common/headFilter'
import ListAdItem from '../automobile/listAdItem'
import AppDownload from '../home/app-download'
import Footer from '../layouts/footer'
import Header from '../layouts/header';
import Loader from '../Loader';
import queryString from 'querystring';
import Nodata from '../../web-assets/img/5406715.jpg';

export default class searchList extends Component {

    constructor(props){
        super(props);

        this.state = {
            paginataionArray: [],
            previousPage: '',
            nexPage: '',
            last: '',
            adList: [],
            resultKey: '',
            category: '',
            subcategory: '',
            city: '',
            searchKey: '',
            seller: '',
            priceFrom: '',
            priceTo: '',
            total: 0,
            latitude: sessionStorage.getItem('latitude') ? parseFloat(sessionStorage.getItem('latitude')) : 0,
            longitude: sessionStorage.getItem('longitude') ? parseFloat(sessionStorage.getItem('longitude')) : 0,
            loaderStatus: false,
        }
    }


    UNSAFE_componentWillReceiveProps = (nextProps) => {
        
        let key = ((new URLSearchParams(nextProps.location.search).get('key')) != '') ? (new URLSearchParams(nextProps.location.search).get('key')) : '';
        let category = ((new URLSearchParams(nextProps.location.search).get('category'))!='')?(new URLSearchParams(nextProps.location.search).get('category')):'';
        let city = ((new URLSearchParams(nextProps.location.search).get('city')) != '') ? (new URLSearchParams(nextProps.location.search).get('city')) : localStorage.getItem('city_id') ? localStorage.getItem('city_id') : '';
        let subcategory = ((new URLSearchParams(nextProps.location.search).get('subcategory')) != '') ? (new URLSearchParams(nextProps.location.search).get('subcategory')) : '';
        let seller = ((new URLSearchParams(nextProps.location.search).get('seller')) != '') ? (new URLSearchParams(nextProps.location.search).get('seller')) : '';
        let priceFrom = ((new URLSearchParams(nextProps.location.search).get('priceFrom')) != '') ? (new URLSearchParams(nextProps.location.search).get('priceFrom')) : '';
        let priceTo = ((new URLSearchParams(nextProps.location.search).get('priceTo')) != '') ? (new URLSearchParams(nextProps.location.search).get('priceTo')) : '';

        if(!key && category ){

            this.setState({
                category: category,
                city: city,
                subcategory: subcategory,
                searchKey: key,
                loaderStatus: true,

            }, () => {
                axios({
                    url: `${BASE_URL}/customer/get/category/ads`,
                    method: 'POST',
                    data: {
                        category_id: this.state.category,
                        latitude: localStorage.getItem('country_id') || city ? 0 : this.state.latitude,
                        longitude: localStorage.getItem('country_id') || city ? 0 : this.state.longitude,
                        city: city,
                    },
                }).then(response => {

                    if(response.data.status == 'success'){
                        
                        this.setState({

                            resultKey: response.data.message,
                            adList: response.data.ads.data,
                            paginataionArray: response.data.ads.links,
                            previousPage: response.data.ads.prev_page_url,
                            nexPage: response.data.ads.next_page_url,
                            last:response.data.ads.last_page,
                            total:response.data.ads.total,
                        });
                    }

                    this.setState({
                        loaderStatus: false,
                    });

                }).catch((error) => {
                    this.setState({
                        loaderStatus:false,
                    })
                });
            });

        }
        else if(!key && subcategory ){

            this.setState({
                category: category,
                city: city,
                subcategory: subcategory,
                searchKey: key,
                loaderStatus:true,

            }, () => {
                axios({
                    url: `${BASE_URL}/customer/get/subcategory/ads`,
                    method: 'POST',
                    data: {
                        subcategory_id: this.state.subcategory,
                        latitude: localStorage.getItem('country_id') || city ? 0 : this.state.latitude,
                        longitude: localStorage.getItem('country_id') || city ? 0 : this.state.longitude,
                        city: city,
                    },
                }).then(response => {

                    if(response.data.status == 'success'){
                        
                        this.setState({

                            resultKey: response.data.message,
                            adList: response.data.ads.data,
                            paginataionArray: response.data.ads.links,
                            previousPage: response.data.ads.prev_page_url,
                            nexPage: response.data.ads.next_page_url,
                            last:response.data.ads.last_page,
                            total:response.data.ads.total,
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
        else{

            this.setState({
                category: category,
                city: city,
                subcategory: subcategory,
                searchKey: key,
                seller: seller,
                priceFrom: priceFrom,
                priceTo: priceTo,
                loaderStatus: true,

            }, () => {
                axios({
                    url: `${BASE_URL}/customer/search/ads`,
                    method: 'POST',
                    data: {
                        search_key: key,
                        category: this.state.category,
                        latitude: localStorage.getItem('country_id') || this.state.city ? 0 : this.state.latitude,
                        longitude: localStorage.getItem('country_id') || this.state.city ? 0 : this.state.longitude,
                        city: this.state.city,
                        priceFrom: this.state.priceFrom,
                        priceTo: this.state.priceTo,
                        seller: this.state.seller,
                    },
                }).then(response => {

                    if(response.data.status == 'success'){
                        
                        this.setState({

                            resultKey: response.data.message,
                            adList: response.data.ads.data,
                            paginataionArray: response.data.ads.links,
                            previousPage: response.data.ads.prev_page_url,
                            nexPage: response.data.ads.next_page_url,
                            last:response.data.ads.last_page,
                            total:response.data.ads.total,
                        });
                    }

                    this.setState({
                        loaderStatus: false,
                    });

                }).catch((error) => {
                    this.setState({
                        loaderStatus: false,
                    })
                });
            });
        }
    }

    componentWillMount = () => {
        
        let key = ((new URLSearchParams(this.props.location.search).get('key')) != '') ? (new URLSearchParams(this.props.location.search).get('key')) : '';
        let category = ((new URLSearchParams(this.props.location.search).get('category'))!='')?(new URLSearchParams(this.props.location.search).get('category')):'';
        let city = ((new URLSearchParams(this.props.location.search).get('city')) != '') ? (new URLSearchParams(this.props.location.search).get('city')) : localStorage.getItem('city_id') ? localStorage.getItem('city_id') : '';
        let subcategory = ((new URLSearchParams(this.props.location.search).get('subcategory')) != '') ? (new URLSearchParams(this.props.location.search).get('subcategory')) : '';
        let seller = ((new URLSearchParams(this.props.location.search).get('seller')) != '') ? (new URLSearchParams(this.props.location.search).get('seller')) : '';
        let priceFrom = ((new URLSearchParams(this.props.location.search).get('priceFrom')) != '') ? (new URLSearchParams(this.props.location.search).get('priceFrom')) : '';
        let priceTo = ((new URLSearchParams(this.props.location.search).get('priceTo')) != '') ? (new URLSearchParams(this.props.location.search).get('priceTo')) : '';


        if(!key && category){
            
            this.setState({
                category: category,
                city: city,
                subcategory: subcategory,
                searchKey: key,
                loaderStatus: true,

            }, () => {
                axios({
                    url: `${BASE_URL}/customer/get/category/ads`,
                    method: 'POST',
                    data: {
                        canonical_name: this.state.category,
                        latitude: localStorage.getItem('country_id') || this.state.city ? 0 : this.state.latitude,
                        longitude: localStorage.getItem('country_id') || this.state.city ? 0 : this.state.longitude,
                        city: this.state.city,
                    },
                }).then(response => {

                    if(response.data.status == 'success'){
                        
                        this.setState({

                            resultKey: response.data.message,
                            adList: response.data.ads.data,
                            paginataionArray: response.data.ads.links,
                            previousPage: response.data.ads.prev_page_url,
                            nexPage: response.data.ads.next_page_url,
                            last:response.data.ads.last_page,
                            total:response.data.ads.total,
                        });
                    }

                    this.setState({
                        loaderStatus: false,
                    });

                }).catch((error) => {
                    this.setState({
                        loaderStatus: false,
                    })
                });
            });

        }
        else if(!key && subcategory){

            this.setState({
                category: category,
                city: city,
                subcategory: subcategory,
                searchKey: key,
                loaderStatus: true,

            }, () => {
                axios({
                    url: `${BASE_URL}/customer/get/subcategory/ads`,
                    method: 'POST',
                    data: {
                        subcategory_id: this.state.subcategory,
                        latitude: localStorage.getItem('country_id') || this.state.city ? 0 : this.state.latitude,
                        longitude: localStorage.getItem('country_id') || this.state.city ? 0 : this.state.longitude,
                        city: this.state.city,
                    },
                }).then(response => {

                    if(response.data.status == 'success'){
                        
                        this.setState({

                            resultKey: response.data.message,
                            adList: response.data.ads.data,
                            paginataionArray: response.data.ads.links,
                            previousPage: response.data.ads.prev_page_url,
                            nexPage: response.data.ads.next_page_url,
                            last:response.data.ads.last_page,
                            total:response.data.ads.total,
                        });
                    }

                    this.setState({
                        loaderStatus: false,
                    });

                }).catch((error) => {
                    this.setState({
                        loaderStatus: false,
                    })
                });
            });
        }
        else{
            
            this.setState({
                category: category,
                city: city,
                subcategory: subcategory,
                searchKey: key,
                seller: seller,
                priceFrom: priceFrom,
                priceTo: priceTo,
                loaderStatus: true,

            }, () => {
                axios({
                    url: `${BASE_URL}/customer/search/ads`,
                    method: 'POST',
                    data: {
                        search_key: key,
                        category: this.state.category,
                        latitude: localStorage.getItem('country_id') || this.state.city ? 0 : this.state.latitude,
                        longitude: localStorage.getItem('country_id') || this.state.city ? 0 : this.state.longitude,
                        city: this.state.city,
                        priceFrom: this.state.priceFrom,
                        priceTo: this.state.priceTo,
                        seller: this.state.seller,
                    },
                }).then(response => {

                    if(response.data.status == 'success'){
                        
                        this.setState({

                            resultKey: response.data.message,
                            adList: response.data.ads.data,
                            paginataionArray: response.data.ads.links,
                            previousPage: response.data.ads.prev_page_url,
                            nexPage: response.data.ads.next_page_url,
                            last:response.data.ads.last_page,
                            total:response.data.ads.total,
                        });
                    }

                    this.setState({
                        loaderStatus: false,
                    });

                }).catch((error) => {
                    this.setState({
                        loaderStatus: false,
                    })
                });
            });
            
        }
    }

    paginationCall = (url) => {
        
        this.setState({
            loaderStatus: true,
        });

        if(!this.state.search_key && this.state.category ){
            
            axios({
                url: url,
                method: 'POST',
                data: {
                    category_id: this.state.category,
                    latitude: localStorage.getItem('country_id') || this.state.city ? 0 : this.state.latitude,
                    longitude: localStorage.getItem('country_id') || this.state.city ? 0 : this.state.longitude,
                    city: this.state.city,
                    seller: this.state.seller,
                    priceFrom: this.state.priceFrom,
                    priceTo: this.state.priceTo,
                },
            }).then(response => {
                
                if(response.data.status == 'success'){
                    
                    this.setState({
                        
                        resultKey: response.data.message,
                        adList: response.data.ads.data,
                        paginataionArray: response.data.ads.links,
                        previousPage: response.data.ads.prev_page_url,
                        nexPage: response.data.ads.next_page_url,
                        last:response.data.ads.last_page,
                        total:response.data.ads.total,
                    });
                    window.scrollTo(0, 0);
                }

                this.setState({
                    loaderStatus: false,
                });

            }).catch((error) => {
                this.setState({
                    loaderStatus: false,
                })
            });
        }
        else if(!this.state.search_key && this.state.subcategory ){

            axios({
                url: url,
                method: 'POST',
                data: {
                    subcategory_id: this.state.subcategory,
                    latitude: localStorage.getItem('country_id') || this.state.city ? 0 : this.state.latitude,
                    longitude: localStorage.getItem('country_id') || this.state.city ? 0 : this.state.longitude,
                    city: this.state.city,
                },
            }).then(response => {
                
                if(response.data.status == 'success'){
                    
                    this.setState({
                        
                        resultKey: response.data.message,
                        adList: response.data.ads.data,
                        paginataionArray: response.data.ads.links,
                        previousPage: response.data.ads.prev_page_url,
                        nexPage: response.data.ads.next_page_url,
                        last:response.data.ads.last_page,
                        total:response.data.ads.total,
                    });
                    window.scrollTo(0, 0);
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
        else{

            axios({
                url: url,
                method: 'POST',
                data: {
                    search_key: this.state.searchKey,
                    category: this.state.category,
                    city: this.state.city,
                },
            }).then(response => {
                
                if(response.data.status == 'success'){
                    
                    this.setState({
                        
                        resultKey: response.data.message,
                        adList: response.data.ads.data,
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        paginataionArray: response.data.ads.links,
                        previousPage: response.data.ads.prev_page_url,
                        nexPage: response.data.ads.next_page_url,
                        last:response.data.ads.last_page,
                        total:response.data.ads.total,
                    });
                    window.scrollTo(0, 0);
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
    }

    render() {

        let {paginataionArray, previousPage, nexPage, last, adList, resultKey, category, subcategory, city, searchKey, total} = this.state;
        let loaderStatus = this.state.loaderStatus;

        return (
            <div id="page" class="site-page">
            {loaderStatus == true ? <Loader /> :
            <>
                <Header />
                {/* <!-- =====[SECTION MOTOR HERO] **===== --> */}
                <section class="section-hero-banner" style={{position: 'relative', background: '#0783FF', padding: '55px 0 120px 0'}}>
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h2 class="section-title text-white text-center">The UAE’s leading marketplace to buy and sell Products</h2>
                        </div>
                    </div>
                </div>
                </section>

                {/* <!-- =====[SECTION MOTOR FILTER] **===== --> */}
                
                <HeadFilter />

                {/* <!-- =====[SECTION MOTOR LISTING] **===== --> */}
                {adList.length == 0 ? <img style={{width: '50%', height: '50%', marginLeft: '25%'}} src={Nodata} /> :
                <section class="section-motor-sort-listing">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <div class="section-title-panel text-center">
                                <h2 class="section-title mb-2">{resultKey} <small class="text-muted"> {total} ads</small></h2>
                                <p class="text-muted">Brand new &amp; used Products for sale in Dubai - Sell your 2nd hand Products on Jamal al bahr &amp; reach 1.6 million buyers today.</p>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-9 col-lg-11 mx-auto">
                                <ul class="motor-sort-list">
                                    {adList.length == 0 ? '' :
                                        adList.length != 0 && adList.map((adList, index) => {
                                        return (
                                            <ListAdItem key={index} ads={adList} />
                                        )
                                    }) }
                                    
                                </ul>
                            </div>
                        </div>

                        {last == 1 || last == '' ? '' :
                            <PaginationLink paginataionArray={paginataionArray} last={last} previousPage={previousPage} nexPage={nexPage} paginationChange={this.paginationCall} />
                        }
                        

                    </div>
                </section>
                }

                
                <AppDownload />
                <Footer />
            </>}
         </div>
        )
    }
}
