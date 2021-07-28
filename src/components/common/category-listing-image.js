import React, { Component } from 'react';
import residential1 from '../../../src/web-assets/img/media-residential-1.jpg';
import residential2 from '../../../src/web-assets/img/media-residential-2.jpg';
import residential3 from '../../../src/web-assets/img/media-residential-3.jpg';
import residential4 from '../../../src/web-assets/img/media-residential-4.jpg';
import residential5 from '../../../src/web-assets/img/media-residential-5.jpg';
class CategoryListingImage extends React.Component{
    render() {
      let dataArray = (this.props.dataArray != undefined)?this.props.dataArray:[];
      let subcategoryArray = (this.props.dataArray.ads != undefined)?this.props.dataArray.ads:[];
      console.log(subcategoryArray,"Don bosco peter");
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
                        <a href="#">
                           <div className="panel-media">
                              <img src={residential1} alt="media" />
                           </div>
                           <div className="panel-content">

                           
                              <h3 className="panel-price">AED {subcatArray && (subcatArray['price'])?subcatArray['price']:''}</h3>
                              <h4 className="panel-title">1 Bed • 2 Baths</h4>
                              <p className="panel-description">No. 9, Dubai Marina</p>
                           </div>
                        </a>
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