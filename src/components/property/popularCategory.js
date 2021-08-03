import React, { Component } from 'react'

export default class popularCategory extends Component {
    render() {
        return (
            <div className="item">
                <div className="cc-panel text-center overflow-hidden">
                    <a href="#" className="d-block w-100">
                        <div className="panel-media">
                        <img src="assets/img/cc-media-1.jpg" alt="media" />
                        </div>
                        <div className="overlay w-100">
                        <h5 className="mb-0 text-white">Commercial for Sale</h5>
                        </div>
                    </a>
                </div>
            </div>
        )
    }
}
