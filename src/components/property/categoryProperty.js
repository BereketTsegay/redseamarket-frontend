import axios from 'axios'
import React, { Component } from 'react'
import { BASE_URL } from '../../projectString'
import AppDownload from '../home/app-download'
import defaultImage from '../../../src/web-assets/img/icon-256x256.png';
import Footer from '../layouts/footer'
import Header from '../layouts/header'
import PopularAreaInDubai from './popularAreaInDubai'
import PopularCategory from './popularCategory'
import PopularResidentialForRend from './popularResidentialForRend'
import SearchArea from './searchArea'
import SubcategoryList from './subcategoryList'

export default class categoryProperty extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            category_id: '',
            popularCategory: [],
            subcategory: [],
        }
    }

    componentWillMount(){

        this.setState({
            category_id: this.props.match.params.id,
        }, () => {

            axios({
                url: `${BASE_URL}/customer/get/property`,
                method: 'POST',
                data: {
                    category_id: this.state.category_id,
                }
            }).then(response => {

                if(response.data.status == 'success'){

                    this.setState({
                        popularCategory: response.data.data.property.subcategory,
                        subcategory: response.data.data.subcategory,
                    })
                }

            }).catch((error) => {

            });
        })
    }

    componentDidUpdate(){

        if(this.state.category_id != this.props.match.params.id){
            this.setState({
                category_id: this.props.match.params.id,
            }, () => {

                axios({
                    url: `${BASE_URL}/customer/get/property`,
                    method: 'POST',
                    data: {
                        category_id: this.state.category_id,
                    }
                }).then(response => {
        
                    if(response.data.status == 'success'){
        
                        this.setState({
                            popularCategory: response.data.data.property.subcategory,
                            subcategory: response.data.data.subcategory,
                        })
                    }
        
                }).catch((error) => {
        
                });

            });
            
        }
    }

    changeCategory = (category_id) => {

        this.setState({
            category_id: category_id,
        }, () => {

            axios({
                url: `${BASE_URL}/customer/get/property`,
                method: 'POST',
                data: {
                    category_id: this.state.category_id,
                }
            }).then(response => {
    
                if(response.data.status == 'success'){
    
                    this.setState({
                        popularCategory: response.data.data.property.subcategory,
                        subcategory: response.data.data.subcategory,
                    })
                }
    
            }).catch((error) => {
    
            });

        });
    }

    render() {

        let category = this.props.match.params.id
        let {category_id, popularCategory, subcategory} = this.state;

        return (
            <div id="page" className="site-page">

            <Header />
            <SearchArea category={category} changeCategoryToggle={this.changeCategory} type="list" />
            
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

                                {popularCategory && popularCategory.map((popularCategory, index) => {
                                    
                                    return <PopularCategory key={index} id={popularCategory.id} category_id={popularCategory.category_id} name={popularCategory.name} image={popularCategory.image} />
                                })}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- =====[SECTION PLACE PANEL] **===== --> */}
            
            {/* <PopularAreaInDubai /> */}

            {/* <!-- =====[SECTION]===== --> */}
            
            <section className="section-no-padding pt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="section-title text-center">{subcategory[0] ? subcategory[0].name : ''}</h2>
                        </div>
                    </div>
                    <div className="row row-product-panel">
                        
                    {subcategory[0] ? subcategory[0].ads.map((ads, index) => {
                        
                        if(index < 5){
                            return <PopularResidentialForRend key={index} ads={ads} />
                        }

                    }) : ''}
                        
                    </div>
                </div>
            </section>

            {/* <!-- =====[SECTION PLACE LIST]===== --> */}
            <section className="section-place-list">
                <div className="container">
                    
                    {subcategory && subcategory.map((subcategory, index) => {
                        if(index != 0){
                            return <SubcategoryList key={index} subcategory={subcategory} />
                        }
                    })} 

                </div>
            </section>

            <AppDownload />
            <Footer />
         </div>
        )
    }
}
