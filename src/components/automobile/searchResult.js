import axios from 'axios'
import React, { Component } from 'react';
import { BASE_URL } from '../../projectString'
import PaginationLink from '../account/paginationLink'
import AppDownload from '../home/app-download'
import Footer from '../layouts/footer'
import Header from '../layouts/header'
import HeadFilter from './headFilter'
import ListAdItem from './listAdItem'
import Loader from '../Loader';

export default class searchResult extends Component {
    constructor(props){
        super(props);

        this.state = {
            paginataionArray: [],
            previousPage: '',
            nexPage: '',
            last: '',
            adList: [],
            resultKey: '',
            latitude: 0,
            longitude: 0,
            loaderStatus: false,
        }
    }
    
    componentWillMount = () => {
        
        this.setState({
            loaderStatus: true,
        });

        let key = this.props.match.params.keyword;
        let subcategory = this.props.match.params.subcategory == '-' ? '' : this.props.match.params.subcategory;
        let condition = this.props.match.params.condition == '-' ? '' : this.props.match.params.condition;
        let transmission = this.props.match.params.transmission == '-' ? '' : this.props.match.params.transmission;
        let priceFrom = this.props.match.params.priceFrom == '-' ? '' : this.props.match.params.priceFrom;
        let priceTo = this.props.match.params.priceTo == '-' ? '' : this.props.match.params.priceTo;
        let yearFrom = this.props.match.params.yearFrom == '-' ? '' : this.props.match.params.yearFrom;
        let yearTo = this.props.match.params.yearTo == '-' ? '' : this.props.match.params.yearTo;
        let mileageFrom = this.props.match.params.mileageFrom == '-' ? '' : this.props.match.params.mileageFrom;
        let mileageTo = this.props.match.params.mileageTo == '-' ? '' : this.props.match.params.mileageTo;
        let seller = this.props.match.params.seller == '-' ? '' : this.props.match.params.seller;

        if(key != ''){
            axios({
                url: `${BASE_URL}/customer/search/motors`,
                method: 'POST',
                data:{
                    search_key: key,
                    category: 1,
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    subcategory: subcategory,
                    condition: condition,
                    transmission: transmission,
                    priceFrom: priceFrom,
                    priceTo: priceTo,
                    yearFrom: yearFrom,
                    yearTo: yearTo,
                    mileageFrom: mileageFrom,
                    mileageTo: mileageTo,
                    seller: seller,
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
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        
        this.setState({
            loaderStatus: true,
        });

        let key = nextProps.match.params.keyword;
        let subcategory = nextProps.match.params.subcategory == '-' ? '' : nextProps.match.params.subcategory;
        let condition = nextProps.match.params.condition == '-' ? '' : nextProps.match.params.condition;
        let transmission = nextProps.match.params.transmission == '-' ? '' : nextProps.match.params.transmission;
        let priceFrom = nextProps.match.params.priceFrom == '-' ? '' : nextProps.match.params.priceFrom;
        let priceTo = nextProps.match.params.priceTo == '-' ? '' : nextProps.match.params.priceTo;
        let yearFrom = nextProps.match.params.yearFrom == '-' ? '' : nextProps.match.params.yearFrom;
        let yearTo = nextProps.match.params.yearTo == '-' ? '' : nextProps.match.params.yearTo;
        let mileageFrom = nextProps.match.params.mileageFrom == '-' ? '' : nextProps.match.params.mileageFrom;
        let mileageTo = nextProps.match.params.mileageTo == '-' ? '' : nextProps.match.params.mileageTo;
        let seller = nextProps.match.params.seller == '-' ? '' : nextProps.match.params.seller;

        if(key != ''){
            axios({
                url: `${BASE_URL}/customer/search/motors`,
                method: 'POST',
                data:{
                    search_key: key,
                    category: 1,
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    subcategory: subcategory,
                    condition: condition,
                    transmission: transmission,
                    priceFrom: priceFrom,
                    priceTo: priceTo,
                    yearFrom: yearFrom,
                    yearTo: yearTo,
                    mileageFrom: mileageFrom,
                    mileageTo: mileageTo,
                    seller: seller,
                },
            }).then(response => {

                if(response.data.status == 'success'){
                    console.log(response.data);
                    this.setState({
                        resultKey: response.data.message,
                        adList: response.data.ads.data,
                        paginataionArray: response.data.ads.links,
                        previousPage: response.data.ads.prev_page_url,
                        nexPage: response.data.ads.next_page_url,
                        last:response.data.ads.last_page,
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
    }

    paginationCall = (url) => {

        this.setState({
            loaderStatus: true,
        });

        let key = this.props.match.params.keyword;
        let subcategory = this.props.match.params.subcategory == '-' ? '' : this.props.match.params.subcategory;
        let condition = this.props.match.params.condition == '-' ? '' : this.props.match.params.condition;
        let transmission = this.props.match.params.transmission == '-' ? '' : this.props.match.params.transmission;
        let priceFrom = this.props.match.params.priceFrom == '-' ? '' : this.props.match.params.priceFrom;
        let priceTo = this.props.match.params.priceTo == '-' ? '' : this.props.match.params.priceTo;
        let yearFrom = this.props.match.params.yearFrom == '-' ? '' : this.props.match.params.yearFrom;
        let yearTo = this.props.match.params.yearTo == '-' ? '' : this.props.match.params.yearTo;
        let mileageFrom = this.props.match.params.mileageFrom == '-' ? '' : this.props.match.params.mileageFrom;
        let mileageTo = this.props.match.params.mileageTo == '-' ? '' : this.props.match.params.mileageTo;
        let seller = this.props.match.params.seller == '-' ? '' : this.props.match.params.seller;

        axios({
            url: url,
            method: 'POST',
            data:{
                search_key: key,
                category: 1,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                subcategory: subcategory,
                condition: condition,
                transmission: transmission,
                priceFrom: priceFrom,
                priceTo: priceTo,
                yearFrom: yearFrom,
                yearTo: yearTo,
                mileageFrom: mileageFrom,
                mileageTo: mileageTo,
                seller: seller,
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

        let {paginataionArray, previousPage, nexPage, last, adList, resultKey} = this.state;
        let loaderStatus = this.state.loaderStatus;

        return (
            <div id="page" class="site-page">
                {loaderStatus == true ? <Loader /> :
                <>
                <Header />
                {/* <!-- =====[SECTION MOTOR HERO] **===== --> */}
                <section class="section-hero-banner section-hero-motor-filter">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h2 class="section-title text-white text-center">The UAE’s leading marketplace to buy and sell cars</h2>
                        </div>
                    </div>
                </div>
                </section>

                {/* <!-- =====[SECTION MOTOR FILTER] **===== --> */}
                
                <HeadFilter />

                {/* <!-- =====[SECTION MOTOR LISTING] **===== --> */}
                <section class="section-motor-sort-listing">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <div class="section-title-panel text-center">
                                <h2 class="section-title mb-2">{resultKey} <small class="text-muted"> {adList.length} ads</small></h2>
                                <p class="text-muted">Brand new &amp; used Motorcycles for sale in Dubai - Sell your 2nd hand Motorcycles on dubizzle &amp; reach 1.6 million buyers today.</p>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-9 col-lg-11 mx-auto">
                                <ul class="motor-sort-list">
                                    
                                    {adList.length == 0 ? <h4 className="text-center">No Data Found!</h4>:
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

                
                <AppDownload />
                <Footer />
                </>}
            </div>
        )
    }
}
