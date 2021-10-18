import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { IMAGE_URL } from '../../projectString';

export default class popularCategory extends Component {

    constructor(props){
        super(props);
    }

    render() {

        let {id, category_id, name, image} = this.props;
        
        return (
            <div className="item">
                <div className="cc-panel text-center overflow-hidden">
                    <Link to="#" className="d-block w-100">
                        <div className="panel-media">
                        <img src={IMAGE_URL+'/'+image} alt="media" style={{width: '200px', height: '210px'}} />
                        </div>
                        <div className="overlay w-100">
                        <h5 className="mb-0 text-white">{name}</h5>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}
