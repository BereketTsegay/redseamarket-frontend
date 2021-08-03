import React, { Component } from 'react';
import CitySelect from '../common/citySelect';
import Menu from '../layouts/menu';
import Signup from '../login/signup';
import Logo from '../../../src/web-assets/img/brand.svg';

import {
   BrowserRouter as Router,
   Link,
   Route // for later
 } from 'react-router-dom'
class Header extends React.Component{

      
    render() {
   
      
      // console.log(this.state.loginStatus,'logo status');
        return (
           <div>
            <header id="header" className="site-header">
            <div className="main-header">
                     <div className="container d-flex align-items-center flex-wrap">
                        <div className="brand">
                       
                           <a href="#" className="d-block"><img src={Logo} className="d-block" alt="brand"/></a>
                        </div>
                       <CitySelect />
                      
                        <div className="header-right d-none d-lg-flex align-items-center ml-auto">
                           <Link to="/myfavourite" className="header-link">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                              Favorites
                           </Link>
                           <a href="#" className="header-link">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                              Log in or sign up
                           </a>
                           <Link to='/create-ads' className="btn btn-primary">Place Your Ad</Link>
                        </div>
                        <button className="btn btn-primary btn-toggle-menu d-inline-block d-lg-none ml-auto">
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                        </button>
                     </div>
                  </div>
            </header>
             <Menu />

             
             </div>

             
        )
    }
}
export default Header