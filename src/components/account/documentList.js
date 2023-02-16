import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL,IMAGE_URL, userToken } from '../../projectString'
import AppDownload from '../home/app-download'
import Footer from '../layouts/footer'
import Header from '../layouts/header'
import Breadcrumb from './breadcrumb'
import Loader from '../Loader';
import Iframe from 'react-iframe'

let currency = localStorage.getItem('currency') ? localStorage.getItem('currency') : 'USD';
let currency_value=localStorage.getItem('currency_value') ;
 currency_value = currency_value&&(currency_value!='null')? localStorage.getItem('currency_value') : 0;
export default class documentList extends Component {

    constructor(){
        super();
        this.state = {
            myAdsDoc: [],
           
            token: userToken,
            loaderState: false,
        }
    }

    componentWillMount(){

        if(localStorage.getItem('loginStatus') === 'false' || localStorage.getItem('loginStatus') === false){

            this.props.history.push('/');
        }

        this.setState({
            loaderState: true,
           

        });

        axios({
            url: `${BASE_URL}/customer/get/ad-cvdocuments`,
            method: 'POST',
            headers: { Authorization: "Bearer " + this.state.token },
            data:{ads_id:this.props.match.params.id}
        }).then(response => {
            
            if(response.data.status === 'success'){
                 // console.log(response.data.data);
                this.setState({
                     myAdsDoc: response.data.data,
                   
                });
            }

            this.setState({
                loaderState: false,
            });

        }).catch((error) => {
            this.setState({
                loaderState: false,
            });
        });
    }

    


    render() {

        let { loaderState} = this.state;

        return (

            <div id="page" className="site-page">
                { loaderState === true ? <Loader /> : ''}
                <>
                    <Header />
                    <Breadcrumb section="Jobs Request Document" />

                    <section className="section-my-favorite pt-4 pb-5">
                        <div className="container">
                            
                          
                            <div className="my-account-title">
                                <div className="row">
                                    <div className="col-xl-11 mx-auto">
                                    <div className="row align-items-center">
                                        <div className="col-md-7 col-6"><h2 className="title mb-0">Document List</h2></div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="my-favorite-grid">
                                <div className="row">
                                    <div className="col-xl-11 mx-auto">
                                        <div className="row row-product-panel">
                                       
                                            {this.state.myAdsDoc.map((AdDoc, index) => {
                                                return(
                                            <div className="col-lg-3 col-md-4 col-6">
                                                    <div className="product-panel">
                                                   
                                                    <Iframe url={IMAGE_URL+'/'+ AdDoc.document}
                                                        width="300px"
                                                        height="400px"
                                                        id=""
                                                        className=""
                                                        display="block"
                                                        position="relative"/>
                                                        
                                                               
                                                    </div>
                                            </div>
                                                 );
                                                })}
                                               
                                        </div>
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                    </section>
                    <AppDownload />
                    <Footer />
                </>
            </div>
        )
    }
}
