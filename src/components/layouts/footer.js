import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../projectString';
class Footer extends React.Component{

   constructor(props){
      super(props);

      this.state = {
         socialLink: [],
      }

   }

   componentWillMount = () => {

      axios({
         url: `${BASE_URL}/customer/social/link`,
         method: 'POST',
      }).then(response => {

         if(response.data.status === 'success'){
            this.setState({
               socialLink: response.data.social,
            });
         }

      }).catch((error) => {

      });
   }

   render() {

      let {socialLink} = this.state;

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
                                 <li><Link to="/terms/conditions">Terms of Use</Link></li>
                                 <li><Link to="/privacy/policy">Privacy Policy</Link></li>
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

                                 {socialLink ? socialLink.map((socialLink, index) => {
                                    return <a key={index} href={socialLink.url}><i className={socialLink.social_icons} aria-hidden="true"></i></a>
                                 }) : ''}
                                 
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
                           <p className="text-center text-md-left mb-0">© <Link to="/">Jamal al bahr general trading</Link> , All Rights Reserved.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </footer>
        )
    }
}
export default Footer