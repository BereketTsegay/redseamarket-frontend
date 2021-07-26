import React, { Component } from 'react';
import Header from '../layouts/header.js';
import Home from '../home/home';
import Footer from '../layouts/footer';
import AppDownload from '../home/app-download';
class CreateForm extends React.Component{
    render() {
        const mystyle = {
           
            border:"0",allowfullscreen:"",loading:"lazy"
          };
          const mystyle2={
            background: "#E3F3FF",
            paddingTop: "10px",
            paddingBottom:"10px",
            paddingLeft:"16px",
            paddingRight:"16px",
            pointerevents: "pointer",
            
            lineHeight: 1.2,
          }
        return (
            <div className="site-frame">
                <Header />
            
                <div id="page" class="site-page">
                <section className="section-create-ad-1">
               <div className="container">
                  <div className="row">
                     <div className="col-12">
                        <div className="section-title-panel text-center">
                           <h2 className="section-title mb-2">You’re almost there!</h2>
                           <p>Include as much details and pictures as possible, and set the right price!</p>
                        </div>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-xl-5 col-lg-7 col-md-9 mx-auto">
                        <ol className="breadcrumb p-0 bg-white justify-content-center">
                           <li className="breadcrumb-item"><a href="#">Sport Bike</a></li>
                           <li className="breadcrumb-item"><a href="#">Hyper sports</a></li>
                        </ol>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-xl-5 col-lg-7 col-md-9 mx-auto">
                        <div className="create-ad-form">
                           <div className="form-group">
                              <input type="text" className="form-control" placeholder="Title" />
                           </div>
                           <div className="form-group form-ad-media-upload">
                              <label for="mediaUpload" className="d-flex align-items-center rounded mb-0 overflow-hidden" style={mystyle2}>
                                 <i className="fa fa-picture-o" aria-hidden="true"></i>
                                 Add pictures
                                 <span className="btn btn-primary">Choose file</span>
                                 No file chosen
                              </label>
                              <input type="file" className="form-control-file" id="mediaUpload" />
                           </div>
                           <div className="form-group">
                              <input type="text" className="form-control" placeholder="Phone number" />
                           </div>
                           <div className="form-group">
                              <input type="text" className="form-control" placeholder="Price" />
                           </div>
                           <div className="form-group">
                              <textarea className="form-control" rows="3" placeholder="Describe your Sport Bike"></textarea>
                           </div>
                           <div className="form-group">
                              <select className="form-control">
                                 <option selected>Usage</option>
                                 <option>Option 1</option>
                                 <option>Option 2</option>
                                 <option>Option 3</option>
                                 <option>Option 4</option>
                                 <option>Option 5</option>
                              </select>
                           </div>
                           <div className="form-group">
                              <input type="text" className="form-control" placeholder="Kilometers" />
                           </div>
                           <div className="form-group">
                              <select className="form-control">
                                 <option selected>Year</option>
                                 <option>Option 1</option>
                                 <option>Option 2</option>
                                 <option>Option 3</option>
                                 <option>Option 4</option>
                                 <option>Option 5</option>
                              </select>
                           </div>
                           <div className="form-group">
                              <select className="form-control">
                                 <option selected>Seller type</option>
                                 <option>Option 1</option>
                                 <option>Option 2</option>
                                 <option>Option 3</option>
                                 <option>Option 4</option>
                                 <option>Option 5</option>
                              </select>
                           </div>
                           <div className="form-group">
                              <select className="form-control">
                                 <option selected>Final Drive System</option>
                                 <option>Option 1</option>
                                 <option>Option 2</option>
                                 <option>Option 3</option>
                                 <option>Option 4</option>
                                 <option>Option 5</option>
                              </select>
                           </div>
                           <div className="form-group">
                              <select className="form-control">
                                 <option selected>Wheels</option>
                                 <option>Option 1</option>
                                 <option>Option 2</option>
                                 <option>Option 3</option>
                                 <option>Option 4</option>
                                 <option>Option 5</option>
                              </select>
                           </div>
                           <div className="form-group">
                              <select className="form-control">
                                 <option selected>Manufacturer</option>
                                 <option>Option 1</option>
                                 <option>Option 2</option>
                                 <option>Option 3</option>
                                 <option>Option 4</option>
                                 <option>Option 5</option>
                              </select>
                           </div>
                           <div className="form-group">
                              <select className="form-control">
                                 <option selected>Engine Size</option>
                                 <option>Option 1</option>
                                 <option>Option 2</option>
                                 <option>Option 3</option>
                                 <option>Option 4</option>
                                 <option>Option 5</option>
                              </select>
                           </div>
                           <div className="form-group">
                              <select className="form-control">
                                 <option selected>Warranty</option>
                                 <option>Option 1</option>
                                 <option>Option 2</option>
                                 <option>Option 3</option>
                                 <option>Option 4</option>
                                 <option>Option 5</option>
                              </select>
                           </div>
                           <div className="form-group">
                              <input type="text" className="form-control" placeholder="Locate your motorcycle" />
                           </div>
                           <div className="create-ad-location mb-4 mb-md-5">
                              <h4 className="title mb-2">Is the pin in the right location?</h4>
                              <p>Click and drag the pin to the exact spot. Users are more likely to respond to ads that are correctly shown on the map</p>
                              <div className="map-frame overflow-hidden">
                                 <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d68715.3019452309!2d55.304360684611346!3d25.155860292817362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1626524584118!5m2!1sen!2sin" style={mystyle}></iframe>
                              </div>
                           </div>
                           <div className="form-group">
                              <button className="btn btn-primary btn-block">Next</button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            </div>








                <AppDownload/>
                <Footer/>
            </div>
            )
        }
    }
    export default CreateForm