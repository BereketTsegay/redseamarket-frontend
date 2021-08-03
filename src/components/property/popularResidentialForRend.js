import React, { Component } from 'react'

export default class popularResidentialForRend extends Component {
    render() {
        return (
            <div className="col-product-panel">
                <div className="product-panel">
                    <a href="#">
                        <div className="panel-media">
                            <img src="assets/img/media-residential-1.jpg" alt="media" />
                        </div>
                        <div className="panel-content">
                            <h3 className="panel-price">AED 119,000</h3>
                            <h4 className="panel-title">1 Bed • 2 Baths</h4>
                            <p className="panel-description">No. 9, Dubai Marina</p>
                        </div>
                    </a>
                </div>
            </div>
        )
    }
}
