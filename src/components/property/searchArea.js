import axios from 'axios';
import React, { Component } from 'react'
import { BASE_URL } from '../../projectString';

export default class searchArea extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            category: this.props.category,
            subcategory: [],
        }
    }


    componentWillMount(){
        
        axios({
            url: `${BASE_URL}/customer/get/subcategory`,
            method: 'POST',
            data: {
                category: this.state.category,
            }
        }).then(response => {

            if(response.data.status == 'success'){
                
                this.setState({
                    subcategory:response.data.subcategories,
                })
            }

        }).catch((error) => {

        });
    }

    changeCategory = category => {
        
        this.setState({
            category:category,
        }, () => {

            this.props.changeCategoryToggle(this.state.category);

            axios({
                url: `${BASE_URL}/customer/get/subcategory`,
                method: 'POST',
                data: {
                    category: this.state.category,
                }
            }).then(response => {
    
                if(response.data.status == 'success'){
                    
                    this.setState({
                        subcategory:response.data.subcategories,
                    })
                }
    
            }).catch((error) => {
    
            });

        });
    }

    componentDidUpdate(){

    }

    render() {

        let category1 = this.props.category;

        let {category, subcategory} = this.state;
        
        return (
            <section className="section-hero-banner section-hero-motor-main">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-8 col-md-11 mx-auto">
                            <h2 className="section-title text-white text-center">Buy properties with Jamal al bahr</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-10 mx-auto">
                            <div className="hero-filter-tab-frame pt-4">
                                <div className="toggle-btn-panel mb-3">
                                <div className="switch mx-auto">

                                    <input type="radio" value="rent" checked={category1 == 2} name="type" id="rent" />
                                    <label for="rent" onClick={() => this.changeCategory(2)}>Rent</label>

                                    <input type="radio" value="buy" checked={category1 == 3}  name="type" id="buy" /> 
                                    <label for="buy" onClick={() => this.changeCategory(3)}>Sale</label>
                                    
                                    <div className="switch-slider"></div>
                                </div>
                                </div>
                                <ul className="nav nav-tabs hero-nav-tabs" id="myTab1" role="tablist">
                                    {subcategory && subcategory.map((subcategory, index) => {
                                        return (
                                            <li className="nav-item" role="presentation" key={index}>
                                                {index == 0 ? <a className="nav-link active" id={`tab${index}-tab`} data-toggle="tab" href={`#tab${index}`} role="tab" aria-controls="tab1" aria-selected="true">{subcategory.name}</a> 
                                                : <a className="nav-link" id={`tab${index}-tab`} data-toggle="tab" href={`#tab${index}`} role="tab" aria-controls="tab1" aria-selected="true">{subcategory.name}</a> }
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
                                                        <div className="row">
                                                            <div className="col-xl-2 col-md-3">
                                                                <div className="form-group">
                                                                <label>City</label>
                                                                <select className="form-control">
                                                                    <option>Dubai</option>
                                                                    <option>Option 1</option>
                                                                    <option>Option 2</option>
                                                                </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-4 col-md-6">
                                                                <div className="form-group">
                                                                <label for="">Location</label>
                                                                <input type="text" className="form-control" placeholder="Enter Neighborhood or Building" />
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-2 col-md-3">
                                                                <div className="form-group">
                                                                <label>Property Type</label>
                                                                <select className="form-control">
                                                                    <option>All types</option>
                                                                    <option>Option 1</option>
                                                                    <option>Option 2</option>
                                                                </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-2 col-md-3">
                                                                <div className="form-group">
                                                                <label>Price Range</label>
                                                                <select className="form-control">
                                                                    <option>Any</option>
                                                                    <option>Option 1</option>
                                                                    <option>Option 2</option>
                                                                </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-2 col-md-3">
                                                                <div className="form-group">
                                                                <label>Beds</label>
                                                                <select className="form-control">
                                                                    <option>Any</option>
                                                                    <option>Option 1</option>
                                                                    <option>Option 2</option>
                                                                </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-2 col-md-3">
                                                                <div className="form-group">
                                                                <select className="form-control">
                                                                    <option>More</option>
                                                                    <option>Option 1</option>
                                                                    <option>Option 2</option>
                                                                </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-3 col-md-3">
                                                                <div className="form-group">
                                                                <button className="btn btn-primary has-icon w-100">
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
                                                            <div className="col-xl-2 col-md-3">
                                                                <div className="form-group">
                                                                <label>City</label>
                                                                <select className="form-control">
                                                                    <option>Dubai</option>
                                                                    <option>Option 1</option>
                                                                    <option>Option 2</option>
                                                                </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-4 col-md-6">
                                                                <div className="form-group">
                                                                <label for="">Location</label>
                                                                <input type="text" className="form-control" placeholder="Enter Neighborhood or Building" />
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-2 col-md-3">
                                                                <div className="form-group">
                                                                <label>Property Type</label>
                                                                <select className="form-control">
                                                                    <option>All types</option>
                                                                    <option>Option 1</option>
                                                                    <option>Option 2</option>
                                                                </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-2 col-md-3">
                                                                <div className="form-group">
                                                                <label>Price Range</label>
                                                                <select className="form-control">
                                                                    <option>Any</option>
                                                                    <option>Option 1</option>
                                                                    <option>Option 2</option>
                                                                </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-2 col-md-3">
                                                                <div className="form-group">
                                                                <label>Beds</label>
                                                                <select className="form-control">
                                                                    <option>Any</option>
                                                                    <option>Option 1</option>
                                                                    <option>Option 2</option>
                                                                </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-2 col-md-3">
                                                                <div className="form-group">
                                                                <select className="form-control">
                                                                    <option>More</option>
                                                                    <option>Option 1</option>
                                                                    <option>Option 2</option>
                                                                </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-3 col-md-3">
                                                                <div className="form-group">
                                                                <button className="btn btn-primary has-icon w-100">
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
        )
    }
}
