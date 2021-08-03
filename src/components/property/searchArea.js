import React, { Component } from 'react'

export default class searchArea extends Component {
    render() {
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
                                    <input type="radio" value="rent" name="type" id="rent" />
                                    <label for="rent">Rent</label>
                                    <input type="radio" value="buy" name="type" id="buy" checked />
                                    <label for="buy">Sale</label>
                                    <div className="switch-slider"></div>
                                </div>
                                </div>
                                <ul className="nav nav-tabs hero-nav-tabs" id="myTab1" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link active" id="tab1-tab" data-toggle="tab" href="#tab1" role="tab" aria-controls="tab1" aria-selected="true">Residential for Sale</a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link" id="tab2-tab" data-toggle="tab" href="#tab2" role="tab" aria-controls="tab2" aria-selected="false">Residential for Sale </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link" id="tab3-tab" data-toggle="tab" href="#tab3" role="tab" aria-controls="tab3" aria-selected="false">Multiple Units for Sale </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link" id="tab4-tab" data-toggle="tab" href="#tab4" role="tab" aria-controls="tab4" aria-selected="false">Land for Sale</a>
                                </li>
                                </ul>
                            </div>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
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
                                <div className="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
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
                                <div className="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="tab3-tab">
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
                                <div className="tab-pane fade" id="tab4" role="tabpanel" aria-labelledby="tab4-tab">
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
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
