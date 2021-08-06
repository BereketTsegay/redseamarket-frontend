import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class subcategoryList extends Component {

    constructor(props){
        super(props);
    }

    render() {

        let subcategory = this.props.subcategory;
        let length = subcategory.ads.length;

        var i, j, temp, chunk = length/3, newSub = [];

        for(i = 0, j = length; i < j; i += chunk){
            
            temp = subcategory.ads.slice(i, i + chunk)
            newSub.push(temp);
        }

        return (
            <div className="row row-place-list">
                <div className="col-12">
                    <h4 className="title">{subcategory.name}</h4>
                </div>
                <div className="col-12">
                    <div className="row">

                        {newSub && newSub.map((subcategory, index) => {
                            
                            return (
                                <div className="col-lg-4 col-md-6" key={index}>
                                    <ul className="place-lists">

                                        {subcategory && subcategory.map((ads, index) => {
                                            return( 
                                                <li><Link to={`/adsdetails/${ads.id}`}>{ads.title} </Link></li>
                                            )
                                        })}
                                        
                                    </ul>
                                </div>
                            )
                        })}
                    
                    </div>
                </div>
            </div>
        )
    }
}
