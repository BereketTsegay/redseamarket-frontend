import axios from 'axios'
import React, { Component } from 'react'
import { BASE_URL } from '../../projectString'
import PaginationLink from '../account/paginationLink'
import AppDownload from '../home/app-download'
import Footer from '../layouts/footer'
import Header from '../layouts/header'
import HeadFilter from './headFilter'
import ListAdItem from './listAdItem'

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
        }
    }
    
    componentWillMount = () => {
        
        let key = this.props.match.params.key;
        let event = this.props.match.params.event;

        if(event == 'search'){

            axios({
                url: `${BASE_URL}/customer/search/ads`,
                method: 'POST',
                data:{
                    search_key: key,
                    category: 1,
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

            }).catch((error) => {

            });
        }
        else{

        }
    }

    paginationCall = (url) => {

        axios({
            url: url,
            method: 'POST',
            data:{
                search_key: this.props.match.params.key,
                category: 1,
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

        }).catch((error) => {

        });
    }

    render() {

        let {paginataionArray, previousPage, nexPage, last, adList, resultKey} = this.state;
        
        return (
            
            <div id="page" class="site-page">
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
                                {/* <ListAdItem />
                                <ListAdItem />
                                <ListAdItem />
                                <ListAdItem /> */}
                            
                            </ul>
                        </div>
                    </div>

                    {last == 1 ? '' :
                        <PaginationLink paginataionArray={paginataionArray} last={last} previousPage={previousPage} nexPage={nexPage} paginationChange={this.paginationCall} />
                    }
                    

                </div>
            </section>

            
            <AppDownload />
            <Footer />
         </div>
        )
    }
}
