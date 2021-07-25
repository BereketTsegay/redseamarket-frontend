import React, { Component } from 'react';
import media1 from '../../../src/web-assets/img/media-auto-1.jpg';
import media2 from '../../../src/web-assets/img/media-auto-2.jpg';
import media3 from '../../../src/web-assets/img/media-auto-3.jpg';
import media4 from '../../../src/web-assets/img/media-auto-4.jpg';
import media5 from '../../../src/web-assets/img/media-auto-5.jpg';
class CategoryListingImage2 extends React.Component{
    render() {
        return (
         <section className="section-home-categories">
            <div className="container">
               <div className="row">
                  <div className="col-12">
                     <h2 className="section-title text-center">Popular in Used Cars for Sale</h2>
                  </div>
               </div>
               <div className="row row-product-panel">
                  <div className="col-product-panel">
                     <div className="product-panel">
                        <a href="#">
                           <div className="panel-media">
                              <img src={media1} alt="media" />
                           </div>
                           <div className="panel-content">
                              <h3 className="panel-price">AED 40,900</h3>
                              <h4 className="panel-title">Mclaren • Grey</h4>
                              <p className="panel-description">2018 • 22,891 km</p>
                           </div>
                        </a>
                     </div>
                  </div>
                  <div className="col-product-panel">
                     <div className="product-panel">
                        <a href="#">
                           <div className="panel-media">
                              <img src={media2} alt="media" />
                           </div>
                           <div className="panel-content">
                              <h3 className="panel-price">AED 64,900</h3>
                              <h4 className="panel-title">BMW • Sports</h4>
                              <p className="panel-description">2014 • 42,891 km</p>
                           </div>
                        </a>
                     </div>
                  </div>
                  <div className="col-product-panel">
                     <div className="product-panel">
                        <a href="#">
                           <div className="panel-media">
                              <img src={media3} alt="media" />
                           </div>
                           <div className="panel-content">
                              <h3 className="panel-price">AED 89,900</h3>
                              <h4 className="panel-title">Audi • A8 • Grey</h4>
                              <p className="panel-description">2014 • 12,547 km</p>
                           </div>
                        </a>
                     </div>
                  </div>
                  <div className="col-product-panel">
                     <div className="product-panel">
                        <a href="#">
                           <div className="panel-media">
                              <img src={media4} alt="media" />
                           </div>
                           <div className="panel-content">
                              <h3 className="panel-price">AED 29,500</h3>
                              <h4 className="panel-title">Ferarri • Sports • Red</h4>
                              <p className="panel-description">2012 • 25,874</p>
                           </div>
                        </a>
                     </div>
                  </div>
                  <div className="col-product-panel">
                     <div className="product-panel">
                        <a href="#">
                           <div className="panel-media">
                              <img src={media5} alt="media" />
                           </div>
                           <div className="panel-content">
                              <h3 className="panel-price">AED 39,900</h3>
                              <h4 className="panel-title">Mercedes • CLA • Coupe • Dark</h4>
                              <p className="panel-description">2018 • 14,567</p>
                           </div>
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </section>
        )
    }
}
export default CategoryListingImage2