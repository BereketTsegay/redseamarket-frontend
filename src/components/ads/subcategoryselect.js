import React, { Component } from 'react';
import axios from 'axios';
import defaultImage from '../../../src/web-assets/img/icon-256x256.png';
import { BASE_URL } from '../../projectString';
import { Link } from 'react-router-dom';
import Loader from '../Loader';

class SubCategorySelect extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
           categories:[],
           loaderStatus: false,
  
        };
  
    }   

    componentWillMount() {

      this.setState({
         loaderStatus: true,
      });

        axios.post(`${BASE_URL}/customer/get/subcategory`,
        {
         //   latitude:0,
         //   longitude:0,
         category: this.props.categoryId,
        }).then(result => {
          if(result.data.status=="success" && result.status){
            //    this.setState({loginStatus:result.data.data.loged_user_status}); 
            // console.log(result.data.categories,"list of all categories");
               this.setState({
                  categories:result.data.subcategories,
               });
     
          }

          this.setState({
            loaderStatus: false,
         });
         
            
        }).catch((error) => {
           this.setState({
              loaderStatus: false,
           });
        });
      }

    render() {

         let categoryArray = (this.state.categories != undefined)?this.state.categories:[];
         let categoryId = this.props.categoryId;
         let categoryName = this.props.categoryName;
         let loaderStatus = this.state.loaderStatus;

         return (
            <>
            {loaderStatus == true ? <Loader /> :
            <>
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
                           {(categoryArray && categoryArray.map((categoryArr,indexi) => {

                                 if(categoryArr.name != ''){
                                    return(
                                       <Link to={`/create-form/${categoryId}/${categoryArr.id}/${categoryName}/${categoryArr.name}`} className="d-block mb-3 position-relative rounded-lg">
                                          {categoryArr.name}<i className="fa fa-angle-right" aria-hidden="true"></i>
                                       </Link>
                                    );
                                 }
                                 else{
                                    return '';
                                 }
                              }
                           ))}
                           </div>
                        </div>
                     </div>
                  </div>
               </section>
            </>}
            </>
        )
    }
}
export default SubCategorySelect