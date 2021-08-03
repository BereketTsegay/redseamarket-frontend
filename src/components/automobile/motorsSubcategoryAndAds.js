import React, { Component } from 'react'

export default class motorsSubcategoryAndAds extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="col-lg-2 col-md-4 col-6">
                <div className="category-count-panel text-center py-2">
                    <div className="count-title font-weight-bold mb-1">{this.props.count}</div>
                    <div className="count-sub-title font-weight-bold text-muted text-uppercase">{this.props.subcategory}</div>
                </div>
            </div>
        )
    }
}
