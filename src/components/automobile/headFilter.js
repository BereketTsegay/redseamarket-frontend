import React, { Component } from 'react'

export default class headFilter extends Component {
    render() {
        return (
            <section class="section-motor-filter">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="motor-filter-panel">
                            <div class="row">
                                <div class="col-12">
                                    <h4 class="title mb-2">Search</h4>
                                </div>
                            </div>
                            <div class="row row-inputs">
                                <div class="col-xl-3 col-md-6">
                                    <div class="form-group">
                                        <select class="form-control">
                                        <option selected="">Dubai</option>
                                        <option>Option 1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-md-6">
                                    <div class="form-group">
                                        <select class="form-control">
                                        <option selected="">Motors</option>
                                        <option>Option 1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-md-6">
                                    <div class="form-group">
                                        <select class="form-control">
                                        <option selected="">Motorcycles</option>
                                        <option>Option 1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-md-6">
                                    <div class="form-group">
                                        <select class="form-control">
                                        <option selected="">All Categories</option>
                                        <option>Option 1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-4 col-md-6 col-min-inputs">
                                    <label for="">Price ( AED )</label>
                                    <div class="form-group">
                                        <select class="form-control">
                                        <option selected="">Price from</option>
                                        <option>Option 1</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <select class="form-control">
                                        <option selected="">Price to</option>
                                        <option>Option 1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-4 col-md-6 col-min-inputs">
                                    <label for="">Year</label>
                                    <div class="form-group">
                                        <select class="form-control">
                                        <option selected="">Year from</option>
                                        <option>Option 1</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <select class="form-control">
                                        <option selected="">Year to</option>
                                        <option>Option 1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-4 col-md-6 col-min-inputs">
                                    <label for="">Kilometers</label>
                                    <div class="form-group">
                                        <select class="form-control">
                                        <option selected="">KM from</option>
                                        <option>Option 1</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <select class="form-control">
                                        <option selected="">KM to</option>
                                        <option>Option 1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-4 col-md-6">
                                    <div class="form-group">
                                        <select class="form-control">
                                        <option selected="">Seller type</option>
                                        <option>Option 1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xl-9 col-lg-4 col-md-6">
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Keywords" />
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-4 col-md-6">
                                    <div class="form-group">
                                        <button class="btn btn-primary has-icon w-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
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
        )
    }
}
