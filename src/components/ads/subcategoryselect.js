import React, { Component } from 'react';
import axios from 'axios';
import defaultImage from '../../../src/web-assets/img/icon-256x256.png';
class SubCategorySelect extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
           categories:[],
  
        };
  
    }   

    componentWillMount() {
        axios.post('http://jama-al-backend.freshpureuae.com/api/customer/get/category',
        {
           latitude:0,
           longitude:0,
        }).then(result => {
          if(result.data.status=="success" && result.status){
            //    this.setState({loginStatus:result.data.data.loged_user_status}); 
            // console.log(result.data.categories,"list of all categories");
               this.setState({categories:result.data.categories});
     
          }
         
            
        })
      }

    render() {
        let categoryArray = (this.state.categories != undefined)?this.state.categories:[];
        return (
            <section className="section-category-link">
            <div className="container">
               <div className="row">
                  <div className="col-12">
                     <div className="section-title-panel text-center">
                        <h2 className="section-title">Now choose the right category for your ad:</h2>
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-xl-5 col-lg-7 col-md-9 mx-auto">
                     <div className="category-ad-links">
                     {(categoryArray && categoryArray.map((categoryArr,indexi) => 
                        <a href="javascript:void(0)" className="d-block mb-3 position-relative rounded-lg">
                           {(categoryArr['name']!='')?<i className="fa fa-angle-right" aria-hidden="true">{categoryArr['name']}</i>:''}
                        </a>
                       ))   
                    }
                     </div>
                  </div>
               </div>
            </div>
         </section>
        )
    }
}
export default SubCategorySelect