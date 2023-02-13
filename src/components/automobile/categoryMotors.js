import axios from 'axios'
import React, { Component } from 'react'
import { BASE_URL } from '../../projectString'
import AppDownload from '../home/app-download'
import Footer from '../layouts/footer'
import Header from '../layouts/header'
import FeaturedAds from './featuredAds'
import FeaturedDealers from './featuredDealers'
import MotorsSubcategoryAndAds from './motorsSubcategoryAndAds'
import Testimonial from './testimonial'
import Loader from '../Loader';
import SearchAutoComplete from '../home/searchAutoComplete'
import PaginationLink from '../account/paginationLink';

export default class categoryMotors extends Component {

   constructor(){
      super();

      this.state = {
         subcategory: [],
         ads: [],
         testimonial: [],
         searchKey: '',
         loaderStatus: false,
         dealer: [],
         latitude: sessionStorage.getItem('latitude') ? parseFloat(sessionStorage.getItem('latitude')) : 0,
         longitude: sessionStorage.getItem('longitude') ? parseFloat(sessionStorage.getItem('longitude')) : 0,
         city: localStorage.getItem('city_id') ? localStorage.getItem('city_id') : '',
         paginataionArray: [],
         currentPage: '',
         previousPage: '',
         nexPage: '',
         last:'',
      }
   }

   componentWillMount(){

      this.setState({
         loaderStatus: true,
      });
       // alert('hai');
      //  console.log("hi1");

      axios({
         url: `${BASE_URL}/customer/get/motors`,
         method: 'POST',
         data: {
            city: localStorage.getItem('city_id'),
            latitude: localStorage.getItem('country_id') || localStorage.getItem('city_id') ? 0 : this.state.latitude,
            longitude: localStorage.getItem('country_id') || localStorage.getItem('city_id') ? 0 : this.state.longitude,
            country: localStorage.getItem('country_id'),
         },

      }).then(response => {
              // console.log("hi2");
         if(response.data.status === 'success'){
            // console.log(response.data.data.ads.data);
            this.setState({
               subcategory: response.data.data.motors.subcategory,
               ads: response.data.data.ads.data,
               testimonial: response.data.data.testimonial,
               paginataionArray: response.data.data.ads.links,
               currentPage: response.data.data.ads.current_page,
               previousPage: response.data.data.ads.prev_page_url,
               nexPage: response.data.data.ads.next_page_url,
               last: response.data.data.ads.last_page,
            });
         }

         this.setState({
            loaderStatus:false,
         });

      }).catch((error) => {
         this.setState({
            loaderStatus:false,
         });
      });

      axios({
         url: `${BASE_URL}/customer/get/featured/dealer`,
         method: 'POST',
     }).then(response => {

         if(response.data.status === 'success'){
             
             this.setState({
                 dealer: response.data.featured,
             });
         }

     }).catch((error) => {

     });
   }

   searchEvent = e => {

      this.setState({
         searchKey: e.target.value,
      });
   }

   searchMotors = () => {
     
      this.props.history.push('/motor/list?key='+this.state.searchKey+'&city=');
   }

   searchKeyEvent = (key) => {
      this.setState({
         searchKey: key,
      });
   }

   paginationCall = (url) => {

      this.setState({
         loaderStatus: true,
      });

      axios({
         url: url,
         method: 'POST',
         data: {
            city: localStorage.getItem('city_id'),
            latitude: localStorage.getItem('country_id') || localStorage.getItem('city_id') ? 0 : this.state.latitude,
            longitude: localStorage.getItem('country_id') || localStorage.getItem('city_id') ? 0 : this.state.longitude,
            country: localStorage.getItem('country_id'),
         },

      }).then(response => {

         if(response.data.status == 'success'){
            
            this.setState({
               ads: response.data.data.ads.data,

               paginataionArray: response.data.data.ads.links,
               currentPage: response.data.data.ads.current_page,
               previousPage: response.data.data.ads.prev_page_url,
               nexPage: response.data.data.ads.next_page_url,
               last: response.data.data.ads.last_page,
            });
         }

         this.setState({
            loaderStatus:false,
         });

      }).catch((error) => {
         this.setState({
            loaderStatus:false,
         });
      })
   }

   render() {

      let subcategory = this.state.subcategory;
      let ads = this.state.ads;
      let testimonial = this.state.testimonial;
      let searchKey = this.state.searchKey;
      let loaderStatus = this.state.loaderStatus;
      let dealer = this.state.dealer;

      let paginataionArray = this.state.paginataionArray;
      let currentPage = this.state.currentPage;
      let previousPage = this.state.previousPage;
      let nexPage = this.state.nexPage;
      let last = this.state.last;
      
         return (
            <div id="page" className="site-page">
               {loaderStatus == true ? <Loader /> : ''}
               <>
                  <Header />
                  {/* <!-- =====[SECTION HOME HERO] **===== --> */}
                  <section className="section-hero-banner section-hero-motor-main">
                     <div className="container">
                        <div className="row">
                           <div className="col-xl-6 col-lg-8 col-md-11 mx-auto">
                              <h2 className="section-title text-white text-center">The {localStorage.getItem('country_name')?localStorage.getItem('country_name'):'UAE'}’s leading marketplace to buy and sell cars</h2>
                           </div>
                        </div>
                        <div className="row">
                           <div className="col-xl-10 mx-auto">
                              <div className="hero-search">
                                 <div className="row">
                                    <div className="col-md-9">
                                       <div className="form-group">
                                          <input type="text" onChange={(e) => this.searchEvent(e)} value={searchKey} className="form-control" placeholder="Search for anything…" />
                                          <SearchAutoComplete searchKey={searchKey} city={this.state.city} category="1" />
                                       </div>
                                    </div>
                                    <div className="col-md-3">
                                       <button className="btn btn-primary has-icon w-100" onClick={this.searchMotors}>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                          Search
                                       </button>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </section>
                  
                  {/* <!-- =====[SECTION CATEGORY COUNT] **===== --> */}
                  <section className="section-category-count py-4">
                     <div className="container">
                        <div className="row">

                           {subcategory && subcategory.map((subcategory, index) => {
                              return <MotorsSubcategoryAndAds key={index} count={subcategory.ads_count} subcategory={subcategory.name} />
                           })}
                           
                        </div>
                     </div>
                  </section>

                  {/* <!-- =====[SECTION CATEGORY BRAND] **===== --> */}
                  <section className="section-category-brand py-5">
                     <div className="container">
                        <div className="row">
                           <div className="col-12">
                              <h2 className="section-title text-center mb-4">Featured Dealers</h2>
                           </div>
                        </div>
                        <div className="row">

                        {dealer ? dealer.map((dealer, index) => {

                           return <FeaturedDealers key={index} image={dealer.dealer_image} />

                        }) : ''}
                        </div>
                     </div>
                  </section>

                  {/* <!-- =====[SECTION INNER PRODUCT LIST] **===== --> */}
                  <section className="section-inner-product-list border-bottom">
                     <div className="container">
                        <div className="row">
                           <div className="col-12">
                              <h2 className="section-title text-center">Motor Listings</h2>
                              {/* <h2 className="section-title text-center">Featured Listings</h2> */}
                           </div>
                        </div>
                        <div className="row row-product-panel">

                           {ads && ads.map((ads, index) => {
                              return <FeaturedAds key={index} ads={ads} />
                           })}
                        </div>
                        {last === 1 || last === '' ? '' :
                           <PaginationLink paginataionArray={paginataionArray} last={last} previousPage={previousPage} nexPage={nexPage} paginationChange={this.paginationCall} />
                        }
                     </div>
                  </section>

                  {/* <!-- =====[SECTION TESTIMONIALS] **===== --> */}
                  <section className="section-testimonials">
                     <div className="container">
                        <div className="row">
                           <div className="col-12">
                              <h2 className="section-title text-center">Testimonials</h2>
                           </div>
                        </div>
                        <div className="row">
                           
                           {testimonial && testimonial.map((testimonial, index) => {
                              return <Testimonial key={index} testimonial={testimonial} />;
                           })}
                           
                        </div>
                     </div>
                  </section>

                  <AppDownload />
                  <Footer />
               </>
            </div>
        )
    }
}
