import React, { Component } from 'react'

export default class subcategoryList extends Component {
    render() {
        return (
            <div className="row row-place-list">
                <div className="col-12">
                    <h4 className="title">Apartments for rent</h4>
                </div>
                <div className="col-12">
                    <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <ul className="place-lists">
                            <li><a href="#">Apartments for rent in Dubai Marina </a></li>
                            <li><a href="#">Apartments for rent in Downtown Dubai </a></li>
                            <li><a href="#">Apartments for rent in The Palm Jumeirah </a></li>
                            <li><a href="#">Apartments for rent in Business Bay</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <ul className="place-lists">
                            <li><a href="#">Apartments for rent in Dubai Silicon Oasis </a></li>
                            <li><a href="#">Apartments for rent in Jebel Ali </a></li>
                            <li><a href="#">Apartments for rent in JLT Jumeirah Lake Towers </a></li>
                            <li><a href="#">Apartments for rent in International City</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <ul className="place-lists">
                            <li><a href="#">Apartments for rent in Dubai Hills Estate </a></li>
                            <li><a href="#">Apartments for rent in JBR Jumeirah Beach Residence</a></li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
