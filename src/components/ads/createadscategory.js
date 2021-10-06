import React, { Component } from 'react';
import Header from '../layouts/header.js';
import Footer from '../layouts/footer';
import AppDownload from '../home/app-download';
import axios from 'axios';
import { BASE_URL, IMAGE_URL } from '../../projectString.js';
import Loader from '../Loader';

class CreateAdsCategory extends React.Component{
   constructor(props) {
      super(props);
      this.state = {
         categoryArray:[],
         loaderStatus: false,
        
      };

  }   
    onClickHandler = (id, name) => {
        this.props.parentCallback(id,"selectsubcategory", name);       

    };

    componentWillMount() {

      this.setState({
         loaderStatus: true,
      });

      axios.post(`${BASE_URL}/customer/get/category`,
      {
         latitude: sessionStorage.getItem('latitude') ? parseFloat(sessionStorage.getItem('latitude')) : 0,
         longitude: sessionStorage.getItem('longitude') ? parseFloat(sessionStorage.getItem('longitude')) : 0,
      }).then(result => {
          
        if(result.data.status=="success" && result.status){
            //  this.setState({loginStatus:result.data.data.loged_user_status}); 
             this.setState({
                categoryArray:result.data.categories,
               });
   
        }

        this.setState({
         loaderStatus: false,
     })
       
          
      })
    }



    render() {
      let categoryArray = (this.state.categoryArray != undefined)?this.state.categoryArray:[];
      let loaderStatus = this.state.loaderStatus;

         return (
            <div>
               {loaderStatus == true ? <Loader /> :
               <>
                  <section className="section-category-blocks">
                     <div className="container">
                        <div className="row">
                           <div className="col-12">
                              <div className="section-title-panel text-center">
                                 <h2 className="section-title">Hello, what are you listing today?</h2>
                                 <p>Select the area that best suits your ad</p>
                              </div>
                           </div>
                        </div>
                        <div className="row">
                           <div className="col-xl-8 col-lg-10 mx-auto">
                              <div className="row justify-content-center row-category-blocks">
                              
                              
                              
                              {(categoryArray && categoryArray.map((categoryArray,indexi) => 
                              
                                 <div className="col-md-4 col-6" key={indexi}>
                                    <a onClick={e => this.onClickHandler((categoryArray['id'])?categoryArray['id']:'', categoryArray.name)} href="javascript:void(0)" className="category-block-panel text-center d-flex align-items-center" style={{fill:"currentColor"}} >
                                       <div className="w-100">
                                          <div className="panel-media">
                                             <img src={IMAGE_URL+'/'+ categoryArray.image} alt="media" />
                                             {/* <svg xmlns="http://www.w3.org/2000/svg" width="74.65" height="60.184" viewBox="0 0 74.65 60.184"><defs>
                                                
                                                </defs>
                                                <g transform="translate(0)"><path className="a" d="M233.94,242.942h14.995a11.633,11.633,0,0,1,11.4,8.243c1.695,4.995,3.414,9.982,5.206,14.942a5.673,5.673,0,0,0,1.563,2.132,11.948,11.948,0,0,1,4.054,9.194q.064,9.684,0,19.369c-.02,3.31-1.627,5.386-4.595,6.152a5.647,5.647,0,0,1-6.708-4.435,23.778,23.778,0,0,1-.224-3.6c.01-.872-.263-1.2-1.145-1.149-11.764.684-23.538.838-35.316.609-4.61-.09-9.218-.376-13.825-.609-.928-.047-1.265.254-1.222,1.2s-.122,1.907-.137,2.862A5.7,5.7,0,0,1,196.6,297.4c-.076-6.914-.114-13.831.019-20.743a11.045,11.045,0,0,1,4.415-8.726A4.165,4.165,0,0,0,202.2,266.1q2.655-7.456,5.215-14.946a11.6,11.6,0,0,1,11.408-8.213Q226.379,242.94,233.94,242.942Zm21.691,21.635c1.905-.031,2.8-1.331,2.24-2.957-1.047-3.066-2.108-6.128-3.227-9.168a5.4,5.4,0,0,0-5.111-3.719q-15.679-.024-31.357,0a4.851,4.851,0,0,0-4.763,3.052c-1.361,3.343-2.506,6.776-3.651,10.2a1.921,1.921,0,0,0,1.909,2.566,12.17,12.17,0,0,0,1.736-.153c3.427-.38,6.845-.968,10.282-1.1,5.524-.215,11.064-.286,16.589-.125,4.439.129,8.867.683,13.3,1.071C254.358,264.316,255.132,264.5,255.63,264.577Zm-21.686,9.913c-2.786,0-5.572-.013-8.357,0-1.955.012-3.134,1.059-3.165,2.757a2.924,2.924,0,0,0,3.172,2.947q8.232.032,16.465,0c2.057-.008,3.238-1.16,3.191-3-.042-1.671-1.24-2.7-3.2-2.7C239.35,274.482,236.647,274.49,233.944,274.49Zm24.2,8.487a4.245,4.245,0,1,0-4.234-4.321A4.262,4.262,0,0,0,258.14,282.978Zm-48.691,0a4.246,4.246,0,1,0-4.264-4.279A4.274,4.274,0,0,0,209.449,282.982Z" transform="translate(-196.534 -242.942)"/></g></svg> */}
                                          </div>
                                          <h4 className="title mb-0 mt-3">{(categoryArray['name'])?categoryArray['name']:''}</h4>
                                       </div>
                                    </a>
                                 </div>
                                 ))   
                                 }
                                 
                              </div>
                           </div>
                        </div>
                     </div>
                  </section>
               </>}
            </div>
        )
    }
}
export default CreateAdsCategory