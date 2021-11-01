import React, { Component } from 'react';
import HomeFilter from '../home/homefilter';
import PopularCategoryListing from '../common/popular-category-listing';
import CategoryListingImage from '../common/category-listing-image';
import CategoryListingImage2 from '../common/category-listing-image2';
import CategoryListingImage3 from '../common/category-listing-image3';
import CategoryListingImage4 from '../common/category-listing-image4';
import SubcategoryListing from '../common/subcategoryListing';

class Home extends React.Component{
    render() {
        let dataArray = (this.props.dataArray != undefined)?this.props.dataArray:[];
        let categoryDefault = (this.props.categoryDefault != undefined) ? this.props.categoryDefault : [];
        let otherCategory = (this.props.otherCategory != undefined) ? this.props.otherCategory : [];
        // console.log(dataArray,'dataArray')
        return (
            <div id="page" className="site-page">
                <HomeFilter category={categoryDefault} /> 
                <PopularCategoryListing categoryDefault={categoryDefault} />
                {(dataArray && dataArray.map((dataArray,indexi) =>
                // console.log(dataArray.name)

                    
                <CategoryListingImage key={indexi} dataArray={dataArray} />
                
                ))}
               
                {/* <CategoryListingImage2 />
                <CategoryListingImage3 />
                <CategoryListingImage4 /> */}
                
                <section className="section-home-categories-list">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h2 className="section-title text-center">Other Categories</h2>
                            </div>
                        </div>
                        <div className="row">

                            {otherCategory && otherCategory.map((categoryDefault, index) => {
                                
                                return <SubcategoryListing key={index} name={categoryDefault.name} image={categoryDefault.image} subcategory={categoryDefault.subcategory} category_id={categoryDefault.id} />
                                
                            })}
                            
                        </div>
                    </div>
                </section>
            </div>
            )
        }
    }
    export default Home