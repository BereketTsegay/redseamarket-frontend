import React, { Component } from 'react';

import Header from '../layouts/header.js';
import Home from '../home/home';
import Footer from '../layouts/footer';
import AppDownload from '../home/app-download';
import axios from 'axios';
import dataArray from '../common/test.json';
import { BASE_URL, userToken } from '../../projectString.js';

class Index extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
           loginStatus: false,
           user: '',
           dataArray:[],
           token: userToken,
           categoryDefault: '',
  
        };
  
    }   
    componentWillMount() {
        
        if(this.state.token == null){
            axios({
                url : `${BASE_URL}/customer/dashboard`,
                method: 'POST',
                headers: { Authorization: "Bearer " + this.state.token },
                data:{
                    latitude:0,
                    longitude:0,
                }

            }).then(result => {
                if(result.data.status=="success" && result.status){
                    
                    this.setState({loginStatus:result.data.data.loged_user_status});
                    this.setState({user:result.data.data.user_name});
                    this.setState({dataArray:result.data.data.categories});
                    this.setState({categoryDefault:result.data.data.category_default});

                    localStorage.removeItem('user');
                    localStorage.removeItem('loginStatus');
                    localStorage.removeItem('dataArray');
                    
                    localStorage.setItem('user', this.state.user);
                    localStorage.setItem('loginStatus', this.state.loginStatus);
                    localStorage.setItem('dataArray', JSON.stringify(this.state.dataArray));
            
                }
            
            }).catch((error) => {

            });
        }
        else{

            axios({
                url : `${BASE_URL}/customer/loged/dashboard`,
                method: 'POST',
                headers: { Authorization: "Bearer " + this.state.token },
                data:{
                    latitude:0,
                    longitude:0,
                }

            }).then(result => {
                if(result.data.status=="success" && result.status){
                    
                    this.setState({loginStatus:result.data.data.loged_user_status});
                    this.setState({user:result.data.data.user_name});
                    this.setState({dataArray:result.data.data.categories});
                    this.setState({categoryDefault:result.data.data.category_default});
                    
                    localStorage.removeItem('user');
                    localStorage.removeItem('loginStatus');
                    localStorage.removeItem('dataArray');

                    localStorage.setItem('user', this.state.user);
                    localStorage.setItem('loginStatus', this.state.loginStatus);
                    localStorage.setItem('dataArray', JSON.stringify(this.state.dataArray));
            
                }
              
            }).catch((error) => {

            });
        }
      }
    render() {
        
        return (
            <div className="site-frame">
                <Header />
                <Home dataArray={this.state.dataArray} categoryDefault={this.state.categoryDefault} />

                <AppDownload/>
                <Footer/>
            </div>
            )
        }
    }
    export default Index