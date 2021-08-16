import axios from 'axios'
import React, { Component } from 'react'
import { BASE_URL } from '../../projectString'
import PaginationLink from '../account/paginationLink'
import AppDownload from '../home/app-download'
import Footer from '../layouts/footer'
import Header from '../layouts/header'
import HeadFilter from './headFilter'
import ListAdItem from './listAdItem'
import Loader from '../Loader';
import ResultTitleArea from './resultTitleArea'

export default class motorListing extends Component {

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

        let key = this.props.match.params.key;
        let event = this.props.match.params.event;

        if(event == 'search'){

            axios({
                url: `${BASE_URL}/customer/search/ads`,
                method: 'POST',
                data:{
                    search_key: key,
                    category: 1,
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
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
        else{

        }
    }

    paginationCall = (url) => {

        this.setState({
            loaderStatus: true,
        });

        axios({
            url: url,
            method: 'POST',
            data:{
                search_key: this.props.match.params.key,
                category: 1,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
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
                        
                        <ResultTitleArea resultKey={resultKey} lengthValue={adList.length} />
                        
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
