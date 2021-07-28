import React, { Component } from 'react';
import HomeFilter from '../home/homefilter';
import PopularCategoryListing from '../common/popular-category-listing';
import CategoryListingImage from '../common/category-listing-image';
import CategoryListingImage2 from '../common/category-listing-image2';
import CategoryListingImage3 from '../common/category-listing-image3';
import CategoryListingImage4 from '../common/category-listing-image4';

class Home extends React.Component{
    render() {
        let dataArray = (this.props.dataArray != undefined)?this.props.dataArray:[];
        // console.log(dataArray,'dataArray')
        return (
            <div id="page" className="site-page">
                <HomeFilter/> 
                <PopularCategoryListing/>
                {(dataArray && dataArray.map((dataArray,indexi) =>
                // console.log(dataArray.name)
                <CategoryListingImage dataArray={dataArray} />
                ))   
            }
               
                {/* <CategoryListingImage2 />
                <CategoryListingImage3 />
                <CategoryListingImage4 /> */}
                
            </div>
            )
        }
    }
    export default Home