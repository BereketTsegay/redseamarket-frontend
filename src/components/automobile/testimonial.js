import React, { Component } from 'react'

export default class testimonial extends Component {
    render() {
        return (
            <div className="col-xl-4 col-md-6">
                <blockquote className="blockquote blockquote-alt text-center overflow-hidden">
                   <div className="blockquote-body">
                      <div className="icon mb-3"><img src="assets/img/blockquote-icon.svg" alt="icon" /></div>
                      <p>Lorem ipsum dolor sit amet, consetetur sadipsc sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores</p>
                   </div>
                   <div className="blockquote-footer mt-4">
                      <img src="assets/img/b-author-1.png" alt="media" />
                      <div className="author font-weight-bold mb-0 mt-2">David John</div>
                   </div>
                </blockquote>
            </div>
        )
    }
}
