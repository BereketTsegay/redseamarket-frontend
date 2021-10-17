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
            category_id: 1,
            city: '',
            subcategory_id: '',
            condition: '',
            transimission: '',
            priceFrom: '',
            yearFrom: '',
            mileageFrom: '',
            priceTo: '',
            yearTo: '',
            mileageTo: '',
            seller: '',
            keyword: '',
            loaderStatus: false,
            country_id: localStorage.getItem('country_id') ? localStorage.getItem('country_id') : 229,
            cityArray: [],

        }
    }

    componentWillMount = () => {

        axios({
            url: `${BASE_URL}/customer/get/subcategory`,
            method: 'POST',
            data: {
                category: this.state.category_id,
            },

        }).then(response => {

            if(response.data.status === 'success'){

                this.setState({
                    subcategory: response.data.subcategories,
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
           
            this.props.history.push(`/motor/result?keyword=${state.keyword}&city=${state.city}&subcategory=${state.subcategory_id}&condition=${state.condition}&transmission=${state.transimission}&priceFrom=${state.priceFrom}&priceTo=${state.priceTo}&yearFrom=${state.yearFrom}&yearTo=${state.yearTo}&mileageFrom=${state.mileageFrom}&mileageTo=${state.mileageTo}&seller=${state.seller}`);
    
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
                {loaderStatus == true ? <Loader /> : ''}
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
                                    <div className="col-xl-3 col-md-6">
                                        <div className="form-group">
                                            <select onChange={(e) => this.handleChange(e)} name="condition" className="form-control">
                                            <option value="">Condition</option>
                                            <option value="New">New</option>
                                            <option value="Used">Used</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6">
                                        <div className="form-group">
                                            <select onChange={(e) => this.handleChange(e)} name="transimission" className="form-control">
                                            <option value="">Transmission</option>
                                            <option value="Manual">Manual</option>
                                            <option value="Automatic">Automatic</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-min-inputs">
                                        <label for="">Price ( AED )</label>
                                        <div className="form-group">
                                            <input type="number" onChange={(e) => this.handleChange(e)} className="form-control" name="priceFrom" placeholder="From" />
                                        </div>
                                        <div className="form-group">
                                            <input type="number" onChange={(e) => this.handleChange(e)} className="form-control" name="priceTo" placeholder="To" />
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-min-inputs">
                                        <label for="">Year</label>
                                        <div className="form-group">
                                            <input type="number" onChange={(e) => this.handleChange(e)} className="form-control" name="yearFrom" placeholder="From" />
                                        </div>
                                        <div className="form-group">
                                            <input type="number" onChange={(e) => this.handleChange(e)} className="form-control" name="yearTo" placeholder="To" />
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-min-inputs">
                                        <label for="">Mileage</label>
                                        <div className="form-group">
                                            <input type="number" onChange={(e) => this.handleChange(e)} className="form-control" name="mileageFrom" placeholder="From" />
                                        </div>
                                        <div className="form-group">
                                            <input type="number" onChange={(e) => this.handleChange(e)} className="form-control" name="mileageTo" placeholder="To" />
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
                                    <div className="col-xl-9 col-lg-4 col-md-6">
                                        <div className="form-group">
                                            <input type="text" onChange={(e) => this.handleChange(e)} name="keyword" className="form-control" placeholder="Keywords" />
                                            <SearchAutoComplete searchKey={keyword} city={this.state.city} 
                                            category={this.state.category_id} subcategory={this.state.subcategory_id} seller={this.state.seller} 
                                            price_from={this.state.priceFrom} price_to={this.state.priceTo} condition={this.state.condition} 
                                            transmission={this.state.transimission} mileage_from={this.state.mileageFrom} mileage_to={this.state.mileageTo} />
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
