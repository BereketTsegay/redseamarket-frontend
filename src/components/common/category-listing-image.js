import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../../../src/web-assets/img/icon-256x256.png';
import { BASE_URL, IMAGE_URL } from '../../projectString';
class CategoryListingImage extends React.Component{

   viewUpdate = (id) => {

      axios({
          url: `${BASE_URL}/customer/ads/view/countupdate`,
          method: 'POST',
          data: {
              ads_id: id,
          },
      }).then(response => {

      }).catch((error) => {

      });
   }

    render() {
      let dataArray = (this.props.dataArray != undefined)?this.props.dataArray:[];
      let subcategoryArray = (this.props.dataArray.ads != undefined)?this.props.dataArray.ads:[];
      // console.log(subcategoryArray,"Don bosco peter");
        return (
            <section className="section-home-categories">
            <div className="container">
               <div className="row">
                  <div className="col-12">
                     <h2 className="section-title text-center">Popular in {(dataArray.name !="")?dataArray.name:""}</h2>
                  </div>
               </div>
               <div className="row row-product-panel">

               {(subcategoryArray && subcategoryArray.map((subcatArray,indexi) => 
               
              
               

                  <div className="col-product-panel">
                     <div className="product-panel">
                        <Link to={`/adsdetails/${subcatArray.id}`} onClick={ () => this.viewUpdate(subcatArray.id) }>
                           <div className="panel-media">
                           {
                           (subcatArray['image'].length > 0) ? 
                              
                              <img style={{minHeight:'150px', maxHeight:'150px'}} src={subcatArray.image[0] ? IMAGE_URL+'/'+subcatArray.image[0].image : defaultImage} alt="media" />:<img style={{minHeight:'150px', maxHeight:'150px'}} src={defaultImage} alt="media" />
                           
                           } 
                             
                           </div>
                           <div className="panel-content">

                           
                              <h3 className="panel-price">AED {subcatArray && (subcatArray['price'])?subcatArray['price']:''}</h3>
                              <h4 className="panel-title">
                              {
                              (subcatArray['custom_value'].length >0)?
                              (subcatArray['custom_value'] && subcatArray['custom_value'].map((subcatArray2,indexi2) =>
                               (subcatArray2.value!="" && indexi2 < 2) ? (subcatArray2.name!="")?subcatArray2.value+' '+subcatArray2.name+' • ':'':''
                              ))
                              :
                             
                              subcatArray['title'].substring(0, 150)
                              } 
                              </h4>
                              <p className="panel-description">{subcatArray['description'].substring(0, 150)}</p>
                           </div>
                        </Link>
                     </div>
                  </div>
                  
                  ))   
                  }

                  {/* <div className="col-product-panel">
                     <div className="product-panel">
                        <a href="#">
                           <div className="panel-media">
                              <img src={residential2} alt="media" />
                           </div>
                           <div className="panel-content">
                              <h3 className="panel-price">AED 155,000</h3>
                              <h4 className="panel-title">2 Beds • 3 Baths</h4>
                              <p className="panel-description">Building 23B, City Walk, Jumeirah</p>
                           </div>
                        </a>
                     </div>
                  </div> */}
                  {/* <div className="col-product-panel">
                     <div className="product-panel">
                        <a href="#">
                           <div className="panel-media">
                              <img src={residential3} alt="media" />
                           </div>
                           <div className="panel-content">
                              <h3 className="panel-price">AED 37,000</h3>
                              <h4 className="panel-title">1 Bed • 1 Bath</h4>
                              <p className="panel-description">The Gate Residence 1, Dubai Residence Complex</p>
                           </div>
                        </a>
                     </div>
                  </div> */}
                  {/* <div className="col-product-panel">
                     <div className="product-panel">
                        <a href="#">
                           <div className="panel-media">
                              <img src={residential4} alt="media" />
                           </div>
                           <div className="panel-content">
                              <h3 className="panel-price">AED 35,000</h3>
                              <h4 className="panel-title">1 Bed • 1 Bath</h4>
                              <p className="panel-description">The Gate Residence 1, Dubai Residence Complex</p>
                           </div>
                        </a>
                     </div>
                  </div> */}
                  {/* <div className="col-product-panel">
                     <div className="product-panel">
                        <a href="#">
                           <div className="panel-media">
                              <img src={residential5} alt="media" />
                           </div>
                           <div className="panel-content">
                              <h3 className="panel-price">AED 155,000</h3>
                              <h4 className="panel-title">2 Beds • 3 Baths</h4>
                              <p className="panel-description">Building 23B, City Walk, Jumeirah</p>
                           </div>
                        </a>
                     </div>
                  </div> */}
               </div>
            </div>
         </section>
        )
    }
}
export default CategoryListingImage