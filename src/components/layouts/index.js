import React, { Component } from 'react';

import Header from '../layouts/header.js';
import Home from '../home/home';
import Footer from '../layouts/footer';
import AppDownload from '../home/app-download';
import axios from 'axios';
class Index extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
           loginStatus: false,
           dataArray:[],
  
        };
  
    }   
    componentWillMount() {
        axios.post('http://jama-al-backend.freshpureuae.com/api/customer/dashboard',
        {
           latitude:0,
           longitude:0,
        }).then(result => {
          if(result.data.status=="success" && result.status){
               this.setState({loginStatus:result.data.data.loged_user_status}); 
               this.setState({dataArray:result.data.data.categories});
          }
         
            
        })
      
      }
    render() {
        
        return (
            <div className="site-frame">
                <Header />
                <Home dataArray={this.state.dataArray}/>

                <AppDownload/>
                <Footer/>
            </div>
            )
        }
    }
    export default Index