import React, { Component } from 'react'
import AppDownload from '../home/app-download'
import Footer from '../layouts/footer'
import Header from '../layouts/header'
import PopularAreaInDubai from './popularAreaInDubai'
import PopularCategory from './popularCategory'
import PopularResidentialForRend from './popularResidentialForRend'
import SearchArea from './searchArea'
import SubcategoryList from './subcategoryList'

export default class categoryProperty extends Component {
    render() {
        return (
            <div id="page" className="site-page">

            <Header />
            <SearchArea />
            
            {/* <!-- =====[SECTION CATEGORY CAROUSEL] **===== --> */}
            <section className="section-category-carousel">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="section-title text-center">Popular Categories</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div id="categoryCarousel" className="owl-carousel category-carousel">

                                <PopularCategory />
                                <PopularCategory />
                                <PopularCategory />
                                <PopularCategory />
                                <PopularCategory />
                                <PopularCategory />
                            
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- =====[SECTION PLACE PANEL] **===== --> */}
            
            <PopularAreaInDubai />

            {/* <!-- =====[SECTION]===== --> */}
            <section className="section-no-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="section-title text-center">Popular in Residential for Rent</h2>
                        </div>
                    </div>
                    <div className="row row-product-panel">
                        
                        <PopularResidentialForRend />
                        <PopularResidentialForRend />
                        <PopularResidentialForRend />
                        <PopularResidentialForRend />
                        <PopularResidentialForRend />

                    </div>
                </div>
            </section>

            {/* <!-- =====[SECTION PLACE LIST]===== --> */}
            <section className="section-place-list">
                <div className="container">
                    
                    <SubcategoryList />
                    <SubcategoryList />
                    <SubcategoryList />
                    
                </div>
            </section>

            <AppDownload />
            <Footer />
         </div>
        )
    }
}
