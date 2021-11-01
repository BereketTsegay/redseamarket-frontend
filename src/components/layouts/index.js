import React, { Component } from 'react';

import Header from '../layouts/header.js';
import Home from '../home/home';
import Footer from '../layouts/footer';
import AppDownload from '../home/app-download';
import axios from 'axios';
import dataArray from '../common/test.json';
import { BASE_URL, userToken } from '../../projectString.js';
import Loader from "../Loader";

class Index extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loginStatus: false,
            user: '',
            dataArray:[],
            token: userToken,
            categoryDefault: '',
            loaderState: false,
            latitude: sessionStorage.getItem('latitude') ? parseFloat(sessionStorage.getItem('latitude')) : 0,
            longitude: sessionStorage.getItem('longitude') ? parseFloat(sessionStorage.getItem('longitude')) : 0,
            otherCategory: [],
  
        };
  
    }   
    componentDidMount() {
        
        this.setState({
            loaderState: true,
        });

        if(this.state.token == null){
            
            axios({
                url : `${BASE_URL}/customer/dashboard`,
                method: 'POST',
                headers: { Authorization: "Bearer " + this.state.token },
                data:{
                    latitude: localStorage.getItem('city_id') || localStorage.getItem('country_id') ?  0 : this.state.latitude,
                    longitude: localStorage.getItem('city_id') || localStorage.getItem('country_id') ?  0 : this.state.longitude,
                    city: localStorage.getItem('city_id'),
                    country: localStorage.getItem('country_id'),
                }

            }).then(result => {
                if(result.data.status=="success" && result.status){
                    
                    this.setState({loginStatus:result.data.data.loged_user_status});
                    this.setState({user:result.data.data.user_name});
                    this.setState({dataArray:result.data.data.categories});
                    this.setState({
                        categoryDefault:result.data.data.category_default,
                        otherCategory: result.data.data.otherCategory,
                    });

                    localStorage.removeItem('user');
                    localStorage.removeItem('loginStatus');
                    localStorage.removeItem('dataArray');
                    
                    localStorage.setItem('user', this.state.user);
                    localStorage.setItem('loginStatus', this.state.loginStatus);
                    localStorage.setItem('dataArray', JSON.stringify(this.state.categoryDefault));
            
                }
                
                this.setState({
                    loaderState: false,
                });
            
            }).catch((error) => {
                this.setState({ loaderState: false,});
            });
        }
        else{

            axios({
                url : `${BASE_URL}/customer/loged/dashboard`,
                method: 'POST',
                headers: { Authorization: "Bearer " + this.state.token },
                data:{
                    latitude: localStorage.getItem('city_id') || localStorage.getItem('country_id') ?  0 : this.state.latitude,
                    longitude: localStorage.getItem('city_id') || localStorage.getItem('country_id') ?  0 : this.state.longitude,
                    city: localStorage.getItem('city_id'),
                    country: localStorage.getItem('country_id'),
                }

            }).then(result => {
                if(result.data.status=="success" && result.status){
                    
                    this.setState({loginStatus:result.data.data.loged_user_status});
                    this.setState({user:result.data.data.user_name});
                    this.setState({dataArray:result.data.data.categories});
                    this.setState({
                        categoryDefault:result.data.data.category_default,
                        otherCategory: result.data.data.otherCategory,
                    });

                    localStorage.removeItem('user');
                    localStorage.removeItem('loginStatus');
                    localStorage.removeItem('dataArray');

                    localStorage.setItem('user', this.state.user);
                    localStorage.setItem('loginStatus', this.state.loginStatus);
                    localStorage.setItem('dataArray', JSON.stringify(this.state.categoryDefault));
            
                }

                this.setState({
                    loaderState: false,
                });
              
            }).catch((error) => {
                this.setState({ loaderState: false,});
            });
        }
      }
    render() {
        
        let loaderState = this.state.loaderState;

        return (
            <div className="site-frame">
                { loaderState == true ? <Loader /> : ''}
                <>
                    <Header />
                    <Home dataArray={this.state.dataArray} categoryDefault={this.state.categoryDefault} otherCategory={this.state.otherCategory} />

                    <AppDownload/>
                    <Footer/>
                </>
                
            </div>
            )
        }
    }
    export default Index