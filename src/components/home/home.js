import React, { Component } from 'react';
import HomeFilter from '../home/homefilter';
import PopularCategoryListing from '../common/popular-category-listing';
import CategoryListingImage from '../common/category-listing-image';
import CategoryListingImage2 from '../common/category-listing-image2';
import CategoryListingImage3 from '../common/category-listing-image3';
import CategoryListingImage4 from '../common/category-listing-image4';

class Home extends React.Component{
    render() {
        return (
            <div id="page" className="site-page">
                <HomeFilter/> 
                <PopularCategoryListing/>
                <CategoryListingImage />
                <CategoryListingImage2 />
                <CategoryListingImage3 />
                <CategoryListingImage4 />
                
            </div>
            )
        }
    }
    export default Home