import React, { Component } from 'react'

export default class featuredAds extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="col-product-panel">
                <div className="product-panel">
                   <a href="#">
                      <div className="panel-media">
                         <img src="assets/img/media-auto-1.jpg" alt="media" />
                         <span className="badge-featured"><span>Featured</span></span>
                      </div>
                      <div className="panel-content">
                         <h3 className="panel-price">AED 40,900</h3>
                         <h4 className="panel-title">Mclaren • Grey</h4>
                         <p className="panel-description">2018 • 22,891 km</p>
                         <p className="panel-description mt-1">Al Sufouh 2 | 27 mins</p>
                      </div>
                   </a>
                </div>
            </div>
        )
    }
}
