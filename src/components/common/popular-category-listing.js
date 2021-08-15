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

                            if(index < 5){
                                return <SubcategoryListing key={index} name={categoryDefault.name} image={categoryDefault.image} subcategory={categoryDefault.subcategory} category_id={categoryDefault.id} />
                            }
                            else{
                                return '';
                            }
                        })}
                        
                    </div>
                </div>
                </section>


)
        }
    }
    export default PopularCategoryListing