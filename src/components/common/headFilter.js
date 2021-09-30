import axios from 'axios';
import React, { Component } from 'react';
import { BASE_URL } from '../../projectString';
import Loader from '../Loader';
import { withRouter } from 'react-router';
import SearchAutoComplete from '../home/searchAutoComplete';

class headFilter extends Component {

    constructor(props){
        super(props);

        this.state = {
            subcategory: [],
            latitude: localStorage.getItem('latitude') ? localStorage.getItem('latitude') : 0,
            longitude: localStorage.getItem('longitude') ? localStorage.getItem('longitude') : 0,
            city: '',
            category_id: '',
            priceFrom: '',
            priceTo: '',
            seller: '',
            keyword: '',
            loaderStatus: false,
            country_id: localStorage.getItem('country_id') ? localStorage.getItem('country_id') : 229,
            cityArray: [],

        }
    }

    componentWillMount = () => {

        axios({
            url: `${BASE_URL}/customer/get/category`,
            method: 'POST',
            data: {
                latitude:this.state.latitude,
                longitude: this.state.longitude,
            },

        }).then(response => {

            if(response.data.status === 'success'){

                this.setState({
                    subcategory: response.data.categories,
                });
            }

        }).catch((error) => {

        });

        axios({
            url: `${BASE_URL}/customer/city/list`,
            method: 'POST',
            data: {
                country_id: this.state.country_id,
            },
        }).then(response => {
               if(response.data.status === 'success'){
   
                  this.setState({
                     cityArray: response.data.city,
                  });
               }
   
        }).catch((error) => {
   
        });
    }

    handleChange = e => {

        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit = () => {
        
        let state = this.state;

        if(state.keyword !== ''){
           
            this.props.history.push(`/search?key=${state.keyword}&city=${state.city}&category=${state.category_id}&priceFrom=${state.priceFrom}&priceTo=${state.priceTo}&seller=${state.seller}`);
        }
    }

    searchKeyEvent = (key) => {

        this.setState({
            keyword: key,
        });
    }

    render() {

        let {subcategory, category_id, city, subcategory_id, condition, transimission, priceFrom, yearFrom, mileageFrom, priceTo,
            yearTo, mileageTo, seller, keyword, loaderStatus, country_id, cityArray} = this.state;
            
        return (
            <>
                {/* {loaderStatus == true ? <Loader /> :  */}
                <section className="section-motor-filter">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="motor-filter-panel">
                                <div className="row">
                                    <div className="col-12">
                                        <h4 className="title mb-2">Search</h4>
                                    </div>
                                </div>
                                <div className="row row-inputs">
                                    <div className="col-xl-3 col-md-6">
                                        <div className="form-group">
                                            <select onChange={(e) => this.handleChange(e)} name="city" className="form-control">
                                            <option value="">Select City</option>
                                            {cityArray ? cityArray.map((city, index) => {
                                                if(this.state.city === city.id){
                                                    return <option selected key={index} value={city.id}>{city.name}</option>
                                                }
                                                else{
                                                    return <option key={index} value={city.id}>{city.name}</option>
                                                }
                                                
                                            }) : ''}
                                            
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6">
                                        <div className="form-group">
                                            <select onChange={(e) => this.handleChange(e)} name="subcategory_id" className="form-control">
                                            <option value="">All Categories</option>
                                            {subcategory ? subcategory.map((subcategory, index) => {
                                                return <option key={index} value={subcategory.id}>{subcategory.name}</option>
                                            }) : ''}
                                            
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-md-6">
                                        <div className="form-group">
                                            <select onChange={(e) => this.handleChange(e)} className="form-control" name="seller">
                                            <option selected="">Seller type</option>
                                            <option value="0">Admin</option>
                                            <option value="1">Users</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-min-inputs">
                                        <label for="">Price</label>
                                        <div className="form-group">
                                            <input type="number" onChange={(e) => this.handleChange(e)} className="form-control" name="priceFrom" placeholder="From" />
                                        </div>
                                        <div className="form-group">
                                            <input type="number" onChange={(e) => this.handleChange(e)} className="form-control" name="priceTo" placeholder="To" />
                                        </div>
                                    </div>
                                    
                                    <div className="col-xl-9 col-lg-4 col-md-6">
                                        <div className="form-group">
                                            <input type="text" onChange={(e) => this.handleChange(e)} name="keyword" className="form-control" placeholder="Keywords" />
                                            <SearchAutoComplete searchKey={keyword} city={this.state.city} category={this.state.category_id} 
                                            seller={this.state.seller} price_from={this.state.priceFrom} price_to={this.state.priceTo} />
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-md-6">
                                        <div className="form-group">
                                            <button onClick={this.handleSubmit} className="btn btn-primary has-icon w-100">
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
                </section>
            {/* } */}
            </>
        )
    }
}

export default withRouter(headFilter);
