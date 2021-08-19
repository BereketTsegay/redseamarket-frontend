import React, { Component } from 'react'
import { IMAGE_URL } from '../../projectString';

export default class featuredDealers extends Component {

    constructor(props){
        super(props);

    }

    render() {

        let image = this.props.image;
        
        return (
            <div className="col-lg-2 col-md-4 col-6">
                <div className="category-brand-panel bg-white my-2 overflow-hidden rounded-lg">
                    <img style={{minHeight: '70px', maxHeight: '70px'}} src={`${IMAGE_URL}/${image}`} alt="media" className="w-100 d-block" />
                </div>
            </div>
        )

    }
}
