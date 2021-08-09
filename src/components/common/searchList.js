import React, { Component } from 'react'
import paginationLink from '../account/paginationLink'

export default class searchList extends Component {
    render() {
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
                        <paginationLink paginataionArray={paginataionArray} last={last} previousPage={previousPage} nexPage={nexPage} paginationChange={this.paginationCall} />
                    }
                    

                </div>
            </section>

            
            <AppDownload />
            <Footer />
         </div>
        )
    }
}
