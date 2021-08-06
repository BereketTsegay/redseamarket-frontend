import React, { Component } from 'react'
import { IMAGE_URL } from '../../projectString';

export default class testimonial extends Component {

    constructor(props){
        super(props);

    }
    render() {

        let testimonial = this.props.testimonial;
        
        return (
            <div className="col-xl-4 col-md-6">
                <blockquote className="blockquote blockquote-alt text-center overflow-hidden">
                   <div className="blockquote-body">
                      <div className="icon mb-3"><img src="assets/img/blockquote-icon.svg" alt="icon" /></div>
                      <p>{testimonial.description}</p>
                   </div>
                   <div className="blockquote-footer mt-4">
                        <img src={IMAGE_URL+'/'+testimonial.image} alt="media" />
                        <div className="author font-weight-bold mb-0 mt-2">{testimonial.name}</div>
                   </div>
                </blockquote>
            </div>
        )
    }
}
