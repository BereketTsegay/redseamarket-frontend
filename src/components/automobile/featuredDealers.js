import React, { Component } from 'react'

export default class featuredDealers extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="col-lg-2 col-md-4 col-6">
                <div className="category-brand-panel bg-white my-2 overflow-hidden rounded-lg">
                   <img src={this.props.image} alt="media" className="w-100 d-block" />
                </div>
            </div>
        )
    }
}
