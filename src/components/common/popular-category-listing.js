import React, { Component } from 'react';
import Motors from '../../../src/web-assets/img/icon-car.svg';
import Flat from '../../../src/web-assets/img/icon-flat.svg';
import House from '../../../src/web-assets/img/icon-house.svg'
import Machine from '../../../src/web-assets/img/icon-washing-machine.svg';
import Mobile from '../../../src/web-assets/img/icon-tab-mobile.svg';
import SubcategoryListing from './subcategoryListing';

class PopularCategoryListing extends React.Component{

    constructor(props){
        super(props);

    }
    render() {
        let categoryDefault = this.props.categoryDefault;
        
        return (
                <section className="section-home-categories-list">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="section-title text-center">Popular Categories</h2>
                        </div>
                    </div>
                    <div className="row">
                        {categoryDefault && categoryDefault.map((categoryDefault, index) => {

                            return <SubcategoryListing key={index} name={categoryDefault.name} subcategory={categoryDefault.subcategory} />
                        })}
                        
                        <div className="col-category col-md-4 col-sm-6">
                            <h4 className="category-title"><img src={Motors} alt="icon" />Motors</h4>
                            <ul className="category-list">
                            <li><a href="#">Used Cars for Sale </a></li>
                            <li><a href="#">Motorcycles </a></li>
                            <li><a href="#">Auto Accessories & Parts </a></li>
                            <li><a href="#">Heavy Vehicles</a></li>
                            </ul>
                            <a href="#" className="btn btn-link">
                            View All
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </a>
                        </div>
                        <div className="col-category col-md-4 col-sm-6">
                            <h4 className="category-title"><img src={Flat} alt="icon" />Property for Rent</h4>
                            <ul className="category-list">
                            <li><a href="#">Residential Units for Rent </a></li>
                            <li><a href="#">Rooms for rent (Flatmates) </a></li>
                            <li><a href="#">Short Term (Monthly) </a></li>
                            <li><a href="#">Commercial for Rent</a></li>
                            </ul>
                            <a href="#" className="btn btn-link">
                            View All
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </a>
                        </div>
                        <div className="col-category col-md-4 col-sm-6">
                            <h4 className="category-title"><img src={House} alt="icon" />Property for Sale</h4>
                            <ul className="category-list">
                            <li><a href="#">Residential for Sale </a></li>
                            <li><a href="#">Commercial for Sale </a></li>
                            <li><a href="#">Land for Sale </a></li>
                            <li><a href="#">Multiple Units for Sale</a></li>
                            </ul>
                            <a href="#" className="btn btn-link">
                            View All
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </a>
                        </div>
                        <div className="col-category col-md-4 col-sm-6">
                            <h4 className="category-title"><img src={Machine} alt="icon" />classifieds</h4>
                            <ul className="category-list">
                            <li><a href="#">Electronics </a></li>
                            <li><a href="#">Computers & Networking </a></li>
                            <li><a href="#">Jewelry & Watches </a></li>
                            <li><a href="#">Clothing & Accessories</a></li>
                            </ul>
                            <a href="#" className="btn btn-link">
                            View All
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </a>
                        </div>
                       
                        <div className="col-category col-md-4 col-sm-6">
                            <h4 className="category-title"><img src={Mobile} alt="icon" />Mobile & Tablets</h4>
                            <ul className="category-list">
                            <li><a href="#">Accounting </a></li>
                            <li><a href="#">Sales</a></li>
                            <li><a href="#">Engineering </a></li>
                            <li><a href="#">Secretarial</a></li>
                            </ul>
                            <a href="#" className="btn btn-link">
                            View All
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </a>
                        </div>
                    </div>
                </div>
                </section>


)
        }
    }
    export default PopularCategoryListing