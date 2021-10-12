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
           collaps: 'hide',
  
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

      onClickHandler = (id) => {

         let collaps = 'collaps'+id;

         this.setState({
            [collaps]: this.state.collaps+id == 'show' ? 'hide' : 'show',
         });
     };

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
                                    
                                    if(categoryArr.subcategory_child.length != 0){
                                       return(
                                          <>
                                             <a href="javascript:void(0);" key={indexi} className="d-block mb-3 position-relative rounded-lg accordion" id={'subChild'+indexi} onClick={() => this.onClickHandler(indexi)}>
                                                <button className="btn w-100 text-left" type="button" data-toggle="collapse" data-target={'#collapseOne'+indexi} aria-expanded="true" aria-controls={'collapseOne'+indexi}>
                                                   {categoryArr.name}<i className="fa fa-angle-right" aria-hidden="true"></i>
                                                </button>
        
                                             </a>
                                             {categoryArr.subcategory_child.map((child, index) => {
                                                return (
                                                   <div id={'collapseOne'+indexi} className={'collapse '+ this.state.collaps+indexi} aria-labelledby="headingOne" data-parent={'#subChild'+indexi}>
                                                      <Link key={index} to={`/create-form/${categoryId}/${child.id}/${categoryName}/${child.name}`} className="d-block mb-3 position-relative rounded-lg">
                                                         {child.name}<i className="fa fa-angle-right" aria-hidden="true"></i>
                                                      </Link>
                                                   </div>
                                                )
                                             })}
                                          </>
                                       )
                                    }
                                    else{
                                       return(
                                          <Link key={indexi} to={`/create-form/${categoryId}/${categoryArr.id}/${categoryName}/${categoryArr.name}`} className="d-block mb-3 position-relative rounded-lg">
                                             {categoryArr.name}<i className="fa fa-angle-right" aria-hidden="true"></i>
                                          </Link>
                                       );
                                    }
                                 }
                                 else{
                                    return '';
                                 }
                              }
                           ))}
                           </div>
                           {/* <Link to={`/create-form/${categoryId}/&nvlp/${categoryName}/&!$*`} className="float-right">Skip this<i className="fa fa-angle-right ml-1" aria-hidden="true"></i></Link> */}
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