import React, { Component } from 'react';
import PopularCategoryListing from '../common/popular-category-listing';
import CategoryListingImage from '../common/category-listing-image';
import CategoryListingImage2 from '../common/category-listing-image2';
import CategoryListingImage3 from '../common/category-listing-image3';
import CategoryListingImage4 from '../common/category-listing-image4';
class HomeFilter extends React.Component{
    render() {
        return (
           <div> 
        <section className="section-home-hero">
           





           <div className="container">
                  <div className="row">
                     <div className="col-xl-6 col-lg-8 col-md-11 mx-auto">
                        <h2 className="section-title text-white text-center">The best place to buy your house, sell your car or find a job in Dubai.</h2>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-xl-10 mx-auto">
                        <ul className="nav nav-tabs hero-nav-tabs" id="heroNavTabs" role="tablist">
                           <li className="nav-item" role="presentation">
                              <a className="nav-link active" id="all-tab" data-toggle="tab" href="#all" role="tab" aria-controls="all" aria-selected="true">All</a>
                           </li>
                           <li className="nav-item" role="presentation">
                              <a className="nav-link" id="motors-tab" data-toggle="tab" href="#motors" role="tab" aria-controls="motors" aria-selected="false">Motors</a>
                           </li>
                           <li className="nav-item" role="presentation">
                              <a className="nav-link" id="classifieds-tab" data-toggle="tab" href="#classifieds" role="tab" aria-controls="classifieds" aria-selected="false">Classifieds</a>
                           </li>

                           <li className="nav-item" role="presentation">
                              <a className="nav-link" id="rent-tab" data-toggle="tab" href="#rent" role="tab" aria-controls="rent" aria-selected="false">Property for Rent</a>
                           </li>

                           <li className="nav-item" role="presentation">
                              <a className="nav-link" id="sale-tab" data-toggle="tab" href="#sale" role="tab" aria-controls="sale" aria-selected="false">Property for Sale</a>
                           </li>
                           <li className="nav-item" role="presentation">
                              <a className="nav-link" id="mandt-tab" data-toggle="tab" href="#mandt" role="tab" aria-controls="mandt" aria-selected="false">Mobiles & Tablets</a>
                           </li>
                        </ul>
                        <div className="tab-content" id="heroNavContent">
                           <div className="tab-pane fade show active" id="all" role="tabpanel" aria-labelledby="all-tab">
                              <div className="hero-search hero-search-home">
                                 <div className="row">
                                    <div className="col-md-9">
                                       <div className="form-group">
                                          <input type="text" className="form-control" placeholder="Search for anything…" />
                                       </div>
                                    </div>
                                    <div className="col-md-3">
                                       <button className="btn btn-primary has-icon w-100">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                          Search
                                       </button>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="tab-pane fade" id="motors" role="tabpanel" aria-labelledby="motors-tab">
                              <div className="hero-search hero-search-home">
                                 <div className="row row-options">
                                    <div className="col-md-4">
                                       <div className="form-group">
                                          <select className="form-control">
                                             <option>All Cities</option>
                                             <option>2</option>
                                             <option>3</option>
                                             <option>4</option>
                                             <option>5</option>
                                          </select>
                                       </div>
                                    </div>
                                    <div className="col-md-4">
                                       <div className="form-group">
                                          <select className="form-control">
                                             <option>All</option>
                                             <option>2</option>
                                             <option>3</option>
                                             <option>4</option>
                                             <option>5</option>
                                          </select>
                                       </div>
                                    </div>
                                    <div className="col-md-4">
                                       <div className="form-group">
                                          <select className="form-control">
                                             <option>All Categories</option>
                                             <option>2</option>
                                             <option>3</option>
                                             <option>4</option>
                                             <option>5</option>
                                          </select>
                                       </div>
                                    </div>
                                 </div>
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
                           <div className="tab-pane fade" id="classifieds" role="tabpanel" aria-labelledby="classifieds-tab">
                              <div className="hero-search hero-search-home">
                                 <div className="row row-options">
                                    <div className="col-md-4">
                                       <div className="form-group">
                                          <select className="form-control">
                                             <option>All Cities</option>
                                             <option>2</option>
                                             <option>3</option>
                                             <option>4</option>
                                             <option>5</option>
                                          </select>
                                       </div>
                                    </div>
                                    <div className="col-md-4">
                                       <div className="form-group">
                                          <select className="form-control">
                                             <option>All</option>
                                             <option>2</option>
                                             <option>3</option>
                                             <option>4</option>
                                             <option>5</option>
                                          </select>
                                       </div>
                                    </div>
                                    <div className="col-md-4">
                                       <div className="form-group">
                                          <select className="form-control">
                                             <option>All Categories</option>
                                             <option>2</option>
                                             <option>3</option>
                                             <option>4</option>
                                             <option>5</option>
                                          </select>
                                       </div>
                                    </div>
                                 </div>
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
                           <div className="tab-pane fade" id="rent" role="tabpanel" aria-labelledby="rent-tab">
                              <div className="hero-search hero-search-home">
                                 <div className="row row-options">
                                    <div className="col-md-4">
                                       <div className="form-group">
                                          <select className="form-control">
                                             <option>All Cities</option>
                                             <option>2</option>
                                             <option>3</option>
                                             <option>4</option>
                                             <option>5</option>
                                          </select>
                                       </div>
                                    </div>
                                    <div className="col-md-4">
                                       <div className="form-group">
                                          <select className="form-control">
                                             <option>All</option>
                                             <option>2</option>
                                             <option>3</option>
                                             <option>4</option>
                                             <option>5</option>
                                          </select>
                                       </div>
                                    </div>
                                    <div className="col-md-4">
                                       <div className="form-group">
                                          <select className="form-control">
                                             <option>All Categories</option>
                                             <option>2</option>
                                             <option>3</option>
                                             <option>4</option>
                                             <option>5</option>
                                          </select>
                                       </div>
                                    </div>
                                 </div>
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
                           <div className="tab-pane fade" id="sale" role="tabpanel" aria-labelledby="sale-tab">
                              <div className="hero-search hero-search-home">
                                 <div className="row row-options">
                                    <div className="col-md-4">
                                       <div className="form-group">
                                          <select className="form-control">
                                             <option>All Cities</option>
                                             <option>2</option>
                                             <option>3</option>
                                             <option>4</option>
                                             <option>5</option>
                                          </select>
                                       </div>
                                    </div>
                                    <div className="col-md-4">
                                       <div className="form-group">
                                          <select className="form-control">
                                             <option>All</option>
                                             <option>2</option>
                                             <option>3</option>
                                             <option>4</option>
                                             <option>5</option>
                                          </select>
                                       </div>
                                    </div>
                                    <div className="col-md-4">
                                       <div className="form-group">
                                          <select className="form-control">
                                             <option>All Categories</option>
                                             <option>2</option>
                                             <option>3</option>
                                             <option>4</option>
                                             <option>5</option>
                                          </select>
                                       </div>
                                    </div>
                                 </div>
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
                           <div className="tab-pane fade" id="mandt" role="tabpanel" aria-labelledby="mandt-tab">
                              <div className="hero-search hero-search-home">
                                 <div className="row row-options">
                                    <div className="col-md-4">
                                       <div className="form-group">
                                          <select className="form-control">
                                             <option>All Cities</option>
                                             <option>2</option>
                                             <option>3</option>
                                             <option>4</option>
                                             <option>5</option>
                                          </select>
                                       </div>
                                    </div>
                                    <div className="col-md-4">
                                       <div className="form-group">
                                          <select className="form-control">
                                             <option>All</option>
                                             <option>2</option>
                                             <option>3</option>
                                             <option>4</option>
                                             <option>5</option>
                                          </select>
                                       </div>
                                    </div>
                                    <div className="col-md-4">
                                       <div className="form-group">
                                          <select className="form-control">
                                             <option>All Categories</option>
                                             <option>2</option>
                                             <option>3</option>
                                             <option>4</option>
                                             <option>5</option>
                                          </select>
                                       </div>
                                    </div>
                                 </div>
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
                  </div>
               </div>
           
          

               




        </section>
        <PopularCategoryListing/>
        <CategoryListingImage />
        <CategoryListingImage2 />
        <CategoryListingImage3 />
        <CategoryListingImage4 />
        </div>

)
        }
    }
    export default HomeFilter