import React, { Component } from 'react';
class Footer extends React.Component{
    render() {
        return (
               
            <footer id="footer" className="site-footer">
               <div className="top-footer">
                  <div className="container">
                     <div className="row">
                        <div className="col-footer col-md-3 col-6">
                           <div className="footer-panel">
                              <h4 className="footer-title">Company</h4>
                              <ul className="footer-menu">
                                 <li><a href="#">About Us</a></li>
                                 <li><a href="#">Advertising</a></li>
                                 <li><a href="#">Careers</a></li>
                                 <li><a href="#">Terms of Use</a></li>
                                 <li><a href="#">Privacy Policy</a></li>
                                 <li><a href="#">Contact Us</a></li>
                              </ul>
                           </div>
                        </div>
                        <div className="col-footer col-md-3 col-6">
                           <div className="footer-panel">
                              <h4 className="footer-title">UAE</h4>
                              <ul className="footer-menu">
                                 <li><a href="#">Dubai</a></li>
                                 <li><a href="#">Abu Dhabi</a></li>
                                 <li><a href="#">Ras al Khaimah</a></li>
                                 <li><a href="#">Sharjah</a></li>
                                 <li><a href="#">Fujairah</a></li>
                                 <li><a href="#">Ajman</a></li>
                                 <li><a href="#">Umm al Quwain</a></li>
                                 <li><a href="#">Al Ain</a></li>
                              </ul>
                           </div>
                        </div>
                        <div className="col-footer col-md-3 col-6">
                           <div className="footer-panel">
                              <h4 className="footer-title">Other Countries</h4>
                              <ul className="footer-menu">
                                 <li><a href="#">Egypt</a></li>
                                 <li><a href="#">Bahrain</a></li>
                                 <li><a href="#">Saudi Arabia</a></li>
                                 <li><a href="#">Lebanon</a></li>
                                 <li><a href="#">Kuwait</a></li>
                                 <li><a href="#">Oman</a></li>
                                 <li><a href="#">Qatar</a></li>
                                 <li><a href="#">Pakistan</a></li>
                              </ul>
                           </div>
                        </div>
                        <div className="col-footer col-md-3 col-6">
                           <div className="footer-panel">
                              <h4 className="footer-title">Support</h4>
                              <ul className="footer-menu">
                                 <li><a href="#">Help</a></li>
                                 <li><a href="#">Contact Us</a></li>
                              </ul>
                           </div>
                        </div>
                        <div className="col-footer col-md-12">
                           <div className="footer-panel text-center text-lg-left">
                              <h4 className="footer-title">Get Social</h4>
                              <div className="footer-social">
                                 <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                                 <a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                                 <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                                 <a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="bottom-footer py-3">
                  <div className="container">
                     <div className="row">
                        <div className="col-12">
                           <p className="text-center text-md-left mb-0">© <a href="#">Jamal al bahr general trading</a> , All Rights Reserved.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </footer>
        )
    }
}
export default Footer