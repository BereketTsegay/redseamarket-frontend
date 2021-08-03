import React, { Component } from 'react';

import Header from '../layouts/header.js';
import Home from '../home/home';
import Footer from '../layouts/footer';
import AppDownload from '../home/app-download';
import axios from 'axios';
import dataArray from '../common/test.json';
class Index extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
           loginStatus: false,
           user: '',
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
               this.setState({user:result.data.data.user_name});
               this.setState({dataArray:result.data.data.categories});
     
          }
         
            
        })
      }
    render() {
        let {loginStatus, user} = this.state;
        
        return (
            <div className="site-frame">
                <Header user={user} loginStatus={loginStatus} />
                <Home dataArray={this.state.dataArray}/>

                <AppDownload/>
                <Footer/>
            </div>
            )
        }
    }
    export default Index