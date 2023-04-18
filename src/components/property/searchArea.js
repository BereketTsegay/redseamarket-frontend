import axios from 'axios';
import React, { Component } from 'react'
import { BASE_URL } from '../../projectString';
import { withRouter } from 'react-router';
import Loader from '../Loader';

class searchArea extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            category: '',
            subcategory: [],
            category_id: '',
            subcategory_id: '',
            city: '',
            property_type: '',
            price: '',
            room: '',
            area:'',
            subArea:'',
            loaderStatus: false,
            country_id: localStorage.getItem('country_id') ? localStorage.getItem('country_id') : 229,
            cityArray: [],
        }
    }


    componentWillMount(){
        
        this.setState({
            category_id: this.props.category,
            loaderStatus: true,
        });

        axios({
            url: `${BASE_URL}/customer/get/subcategory`,
            method: 'POST',
            data: {
                category: this.props.category,
            }
        }).then(response => {
            
            if(response.data.status == 'success'){
                
                this.setState({
                    subcategory:response.data.subcategories,
                    subcategory_id: this.state.subcategory_id !== '' ? this.state.subcategory_id : response.data.subcategories[0] ? response.data.subcategories[0].id : '',
                    loaderStatus: false,
                });
            }

        }).catch((error) => {
            this.setState({
                loaderStatus: false,
            });
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

    UNSAFE_componentWillReceiveProps = (nextProps) => {

        this.setState({
            category_id: this.props.category,
            loaderStatus: true,
        });

        axios({
            url: `${BASE_URL}/customer/get/subcategory`,
            method: 'POST',
            data: {
                category: nextProps.category,
            }
        }).then(response => {
            
            if(response.data.status == 'success'){
                
                this.setState({
                    subcategory:response.data.subcategories,
                    subcategory_id: this.state.subcategory_id ? this.state.subcategory_id : response.data.subcategories[0] ? response.data.subcategories[0].id : '',
                    loaderStatus: false,
                });
            }

        }).catch((error) => {
            this.setState({
                loaderStatus: false,
            });
        });
    }

    changeCategory = category => {
        
        this.setState({
            category:category,
            category_id: category,

        }, () => {

            this.props.changeCategoryToggle(this.state.category);

            if(this.props.type == 'list'){
                this.props.history.push('/categoryProperty/'+this.state.category);
            }
            
        });
    }

    subcategoryChange = (subcategory) => {
        
        this.setState({
            subcategory_id: subcategory,
        });
    }

    handleChange = e => {
        
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit = () => {
        
        let {category, subcategory, category_id, subcategory_id, city, property_type, price, room,area,subArea} = this.state;
        
        if(category_id !== '' && subcategory_id !== ''){
            
            this.props.history.push(`/property/list?category_id=${category_id}&subcategory_id=${subcategory_id}&city=${city}&property_type=${property_type}&price=${price}&room=${room}&area=${area}&subArea=${subArea}`);
        }
        
    }


    render() {

        let category1 = this.props.category;
        let {category, subcategory} = this.state;
        let loaderStatus = this.state.loaderStatus;
        let cityArray = this.state.cityArray;
        
        return (
            <>
            {loaderStatus == true ? <Loader /> : ''}
                <section className="section-hero-banner section-hero-motor-main">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6 col-lg-8 col-md-11 mx-auto">
                                <h2 className="section-title text-white text-center">Buy properties with Red Sea Market</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-10 mx-auto">
                                <div className="hero-filter-tab-frame pt-4">
                                    <div className="toggle-btn-panel mb-3">
                                    {this.props.type !== 'result' ? 
                                    <div className="switch mx-auto">

                                        <input type="radio" value="rent" checked={category == '' ? category1 == 2 : category == 2} name="type" id="rent" />
                                        <label for="rent" onClick={() => this.changeCategory(2)}>Rent</label>

                                        <input type="radio" value="buy" checked={category == '' ? category1 == 3 :category == 3}  name="type" id="buy" /> 
                                        <label for="buy" onClick={() => this.changeCategory(3)}>Sale</label>
                                        
                                        <div className="switch-slider"></div>
                                    </div>
                                    : '' }
                                    </div>
                                    <ul className="nav nav-tabs hero-nav-tabs" id="myTab1" role="tablist">
                                        {subcategory && subcategory.map((subcategory, index) => {
                                            return (
                                                <li className="nav-item" role="presentation" key={index}>
                                                    {index == 0 ? <a className="nav-link active" onClick={() => this.subcategoryChange(subcategory.id)} id={`tab${index}-tab`} data-category_id={subcategory.id} data-toggle="tab" href={`#tab${index}`} role="tab" aria-controls="tab1" aria-selected="true">{subcategory.name}</a>
                                                    : <a className="nav-link" onClick={() => this.subcategoryChange(subcategory.id)} id={`tab${index}-tab`} data-toggle="tab" href={`#tab${index}`} role="tab" aria-controls="tab1" aria-selected="true">{subcategory.name}</a> }
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                <div className="tab-content" id="myTabContent">
                                    {subcategory && subcategory.map((subcategory, index) => {

                                        if(index == 0){
                                            return(
                                                    <div className="tab-pane fade show active" id={`tab${index}`} role="tabpanel" aria-labelledby={`tab${index}-tab`}>
                                                        <div className="hero-search hero-search-filter">
                                                            <div className="row ">
                                                                <div className="col-xl-4 col-md-4 p-2">
                                                                    <div className="form-group">
                                                                    <label>City</label>
                                                                    <select name="city" onChange={(e) => this.handleChange(e)} className="form-control">
                                                                        <option value="">Select city</option>

                                                                        {cityArray ? cityArray.map((city, index) => {
                                                                            return <option key={index} value={city.id}>{city.name}</option>
                                                                        }) : ''}
                                                                        
                                                                    </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-4 col-md-4 p-2">
                                                                    <div className="form-group">
                                                                    <label>Property Type</label>
                                                                    <select name="property_type" onChange={(e) => this.handleChange(e)} className="form-control">
                                                                        <option>Select types</option>
                                                                        <option value="Apartment">Apartment</option>
                                                                        <option value="House">House</option>
                                                                        <option value="Store">Store</option>
                                                                        <option value="Office">Office</option>
                                                                        <option value="Plot of land">Plot of land</option>
                                                                    </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-4 col-md-4 p-2">
                                                                    <div className="form-group">
                                                                        <label>Price Range</label>
                                                                        <input name="price" onChange={(e) => this.handleChange(e)} type="text" className="form-control" placeholder="Price" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-4 col-md-4">
                                                                    <div className="form-group">
                                                                        <label>Room</label>
                                                                        <input name="room" onChange={(e) => this.handleChange(e)} type="text" className="form-control" placeholder="Room count" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-4 col-lg-4 col-md-4 p-2">
                                                                    <div className="form-group">
                                                                        <input type="text" onChange={(e) => this.handleChange(e)} name="area" className="form-control" placeholder="Area" />
                                                                        {/* <SearchAutoComplete searchKey={keyword} city={this.state.city} category={this.state.category_id} 
                                                                        seller={this.state.seller} price_from={this.state.priceFrom} price_to={this.state.priceTo} /> */}
                                                                    </div>
                                                                </div>
                                                                    <div className="col-xl-4 col-lg-4 col-md-4 p-2">
                                                                        <div className="form-group">
                                                                            <input type="text" onChange={(e) => this.handleChange(e)} name="subArea" className="form-control" placeholder="SubArea" />
                                                                            {/* <SearchAutoComplete searchKey={keyword} city={this.state.city} category={this.state.category_id} 
                                                                            seller={this.state.seller} price_from={this.state.priceFrom} price_to={this.state.priceTo} /> */}
                                                                        </div>
                                                                    </div>
                                                               
                                                                <div className="col-xl-4 col-md-4 p-2">
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
                                                );
                                        }
                                        else{
                                            
                                            return (
                                                <div className="tab-pane fade show" id={`tab${index}`} role="tabpanel" aria-labelledby={`tab${index}-tab`}>
                                                    <div className="hero-search hero-search-filter">
                                                        <div className="row">
                                                            <div className="col-xl-4 col-md-4 p-2">
                                                                <div className="form-group">
                                                                <label>City</label>
                                                                <select name="city" onChange={(e) => this.handleChange(e)} className="form-control">
                                                                    <option value="">Select city</option>

                                                                    {cityArray ? cityArray.map((city, index) => {
                                                                        return <option key={index} value={city.id}>{city.name}</option>
                                                                    }) : ''}
                                                                </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-4 col-md-4 p-2">
                                                                <div className="form-group">
                                                                <label>Property Type</label>
                                                                <select name="property_type" onChange={(e) => this.handleChange(e)} className="form-control">
                                                                    <option value="all">All types</option>
                                                                    <option value="Apartment">Apartment</option>
                                                                    <option value="House">House</option>
                                                                    <option value="Store">Store</option>
                                                                    <option value="Office">Office</option>
                                                                    <option value="Plot of land">Plot of land</option>
                                                                </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-4 col-md-4 p-2">
                                                                <div className="form-group">
                                                                    <label>Price Range</label>
                                                                    <input name="price" onChange={(e) => this.handleChange(e)} type="text" className="form-control" placeholder="Price" />
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-4 col-md-4 p-2">
                                                                <div className="form-group">
                                                                    <label>Room</label>
                                                                    <input name="room" onChange={(e) => this.handleChange(e)} type="text" className="form-control" placeholder="Room count" />
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-4 col-lg-4 col-md-4 p-2">
                                                                    <div className="form-group">
                                                                        <input type="text" onChange={(e) => this.handleChange(e)} name="area" className="form-control" placeholder="Area" />
                                                                        {/* <SearchAutoComplete searchKey={keyword} city={this.state.city} category={this.state.category_id} 
                                                                        seller={this.state.seller} price_from={this.state.priceFrom} price_to={this.state.priceTo} /> */}
                                                                    </div>
                                                                </div>
                                                                    <div className="col-xl-4 col-lg-4 col-md-4 p-2">
                                                                        <div className="form-group">
                                                                            <input type="text" onChange={(e) => this.handleChange(e)} name="subArea" className="form-control" placeholder="SubArea" />
                                                                            {/* <SearchAutoComplete searchKey={keyword} city={this.state.city} category={this.state.category_id} 
                                                                            seller={this.state.seller} price_from={this.state.priceFrom} price_to={this.state.priceTo} /> */}
                                                                        </div>
                                                                    </div>
                                                            <div className="col-xl-4 col-md-5 p-2">
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
                                            );
                                        }

                                    })}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default withRouter(searchArea)