import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../projectString';

export default class categoryList extends Component {

    constructor(props){
        super(props);
    }



    render() {

        let category = this.props.category;
        // let length = subcategory.ads.length;

        // var i, j, temp, chunk = length/3, newSub = [];

        // for(i = 0, j = length; i < j; i += chunk){
            
        //     temp = subcategory.ads.slice(i, i + chunk)
        //     newSub.push(temp);
        // }

        return (
            <>
                <div className="col-4">
                <Link to={`/search?key=&city=&category=${category.id}&subcategory=`} ><h4 className="title">{category.name}</h4></Link>

                    <ul className="place-lists">

                                        { category.subcategory && category.subcategory.map((item, index) => {
                                            return( 
                                                <li><b><Link to={`/search?key=&city=&category=${item.category_id}&subcategory=${item.id}`} >{item.name} </Link></b></li>
                                            )
                                        })}
                                        
                                    </ul>
                   
                </div>
               
                    {/* <div className="row">

                        {category.map((category, index) => {
                            
                            return (
                                
                               
                                 <div className="col-lg-4 col-md-6" key={index}>
                                    <ul className="place-lists">

                                        {subcategory && subcategory.map((item, index) => {
                                            return( 
                                                <li><Link to={`/adsdetails/${item.id}`} >{item.name} </Link></li>
                                            )
                                        })}
                                        
                                    </ul>
                                </div> 
                               
                            )
                        })}
                    
                    </div> */}
              </>
        )
    }
}
