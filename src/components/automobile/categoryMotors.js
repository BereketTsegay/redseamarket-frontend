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

export default class categoryMotors extends Component {

   constructor(){
      super();

      this.state = {
         subcategory: [],
         ads: [],
         testimonial: [],
      }
   }

   componentWillMount(){
      axios({
         url: `${BASE_URL}/customer/get/motors`,
         method: 'POST',
      }).then(response => {

         if(response.data.status == 'success'){
            
            this.setState({
               subcategory: response.data.data.motors.subcategory,
               ads: response.data.data.ads,
               testimonial: response.data.data.testimonial,
            });
         }

      }).catch((error) => {

      })
   }

   render() {

      let {subcategory, ads, testimonial} = this.state;
      
         return (
            <div id="page" className="site-page">
               <Header />
               {/* <!-- =====[SECTION HOME HERO] **===== --> */}
               <section className="section-hero-banner section-hero-motor-main">
                  <div className="container">
                     <div className="row">
                        <div className="col-xl-6 col-lg-8 col-md-11 mx-auto">
                           <h2 className="section-title text-white text-center">The UAE’s leading marketplace to buy and sell cars</h2>
                        </div>
                     </div>
                     <div className="row">
                        <div className="col-xl-10 mx-auto">
                           <div className="hero-search">
                              <div className="row">
                                 <div className="col-md-9">
                                    <div className="form-group">
                                       <input type="text" className="form-control" placeholder="Search for anything…" />
                                    </div>
                                 </div>
                                 <div className="col-md-3">
                                    <button className="btn btn-primary has-icon w-100">
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

                        <FeaturedDealers image="assets/img/motor-brand-1.jpg" />
                        <FeaturedDealers image="assets/img/motor-brand-2.jpg" />
                        <FeaturedDealers image="assets/img/motor-brand-3.jpg" />
                        <FeaturedDealers image="assets/img/motor-brand-4.jpg" />
                        <FeaturedDealers image="assets/img/motor-brand-5.jpg" />
                        <FeaturedDealers image="assets/img/motor-brand-6.jpg" />
                        
                     </div>
                  </div>
               </section>

               {/* <!-- =====[SECTION INNER PRODUCT LIST] **===== --> */}
               <section className="section-inner-product-list border-bottom">
                  <div className="container">
                     <div className="row">
                        <div className="col-12">
                           <h2 className="section-title text-center">Featured Listings</h2>
                        </div>
                     </div>
                     <div className="row row-product-panel">

                        {ads && ads.map((ads, index) => {
                           return <FeaturedAds key={index} ads={ads} />
                        })}
                        
                     </div>
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
            </div>
        )
    }
}
