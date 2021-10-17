import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Motors from '../../../src/web-assets/img/icon-car.svg';
import { IMAGE_URL } from '../../projectString';

export default class subcategoryListing extends Component {
    constructor(props){
        super(props);

    }

    render() {

        let name = this.props.name != undefined ? this.props.name : '';
        let subcategory = this.props.subcategory ? this.props.subcategory : [];
        let image = this.props.image ? this.props.image : '';
        let category_id = this.props.category_id ;
        let city = localStorage.getItem('city_id') ? localStorage.getItem('city_id') : '';
        
        return (
            <div className="col-category col-md-4 col-sm-6">
                <h4 className="category-title">
                    <img src={IMAGE_URL+'/'+image} style={{maxWidth:'25px'}} alt="icon" />
                    {name}</h4>
                <ul className="category-list">
                    {subcategory && subcategory.map((subcategory, index) => {

                        if(index < 4){
                            return  <li key={index}>
                                        {subcategory.category_id == 1 ? 
                                            <Link to={`/motor/list?key=&city=${city}&subcategory=${subcategory.id}`}>{subcategory.name} </Link> 
                                        : subcategory.category_id == 2 || subcategory.category_id == 3 ? 
                                            <Link to={`/property/list?category_id=${subcategory.category_id}&subcategory_id=${subcategory.id}&city=`}>{subcategory.name} </Link> : 
                                            <Link to={`/search?key=&city=&category=&subcategory=${subcategory.id}`}>{subcategory.name} </Link>
                                        }
                                    </li>
                        }
                        else{
                            return '';
                        }
                        
                    })}
                </ul>
                {category_id == 'motors' ?
                    <Link to={`/categoryMotors`} className="btn btn-link">View All
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </Link>
                : category_id == "property-for-rent" ?
                    <Link to={`/categoryProperty/2`} className="btn btn-link">View All
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </Link>
                : category_id == category_id == 'property-for-sale' ?
                    <Link to={`/categoryProperty/3`} className="btn btn-link">View All
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </Link>
                :
                   <Link to={`/search?key=&city=&category=${category_id}&subcategory=`} className="btn btn-link"> View All
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </Link>
                }
            </div>
        )
    }
}
