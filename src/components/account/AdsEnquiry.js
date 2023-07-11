import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL, userToken ,IMAGE_URL } from '../../projectString'
import AppDownload from '../home/app-download'
import Footer from '../layouts/footer'
import Header from '../layouts/header'
import Ads from './ads'
import Breadcrumb from './breadcrumb'
import Loader from '../Loader';
import NavLinks from './NavLinks';
import Moment from 'moment';
import PaginationLink from './paginationLink';
let currency = localStorage.getItem('currency') ? localStorage.getItem('currency') : 'USD';
let currency_value=localStorage.getItem('currency_value') ;
 currency_value = currency_value&&(currency_value!='null')? localStorage.getItem('currency_value') : 0;
export default class AdsEnquiry extends Component {

    constructor(){
        super();
        this.state = {
            Enquiries: [],
            paginataionArray: [],
            currentPage: '',
            previousPage: '',
            nexPage: '',
            last: '',
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
            url: `${BASE_URL}/customer/get/ad/enquiry`,
            method: 'POST',
            headers: { Authorization: "Bearer " + this.state.token },
            data:{ad_id:this.props.match.params.id}
            
        }).then(response => {
            
            if(response.data.status === 'success'  && response.data){
                //  console.log(response.data.data);
                this.setState({
                    Enquiries: response.data.data
                   
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

        let {Enquiries, loaderState} = this.state;

        return (

            <div id="page" className="site-page">
                { loaderState === true ? <Loader /> : ''}
                <>
                    <Header />
                    <Breadcrumb section="Enquiries" />

                    <section className="section-my-favorite pt-4 pb-5">
                        <div className="container">

                            <div className="my-account-title">
                                <div className="row">
                                    <div className="col-xl-11 mx-auto">
                                    <div className="row align-items-center">
                                        <div className="col-md-7 col-6"><h2 className="title mb-0">Enquiries</h2></div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="my-favorite-grid">
                                <div className="row">
                                    <div className="col-xl-11 mx-auto">
                                        <div className="row row-product-panel">

                                        <div className="list-group col-lg-12 col-md-12 col-12">

                                        {Enquiries.map((Enquiries, index) => {
                                                return(
                                                    <>
                                                    <div  className="list-group-item list-group-item-action flex-column align-items-start">
                                                    <div className="d-flex w-100 justify-content-between">
                                                    <h5 className="mb-1">{Enquiries.customer_name}</h5>
                                                    <button onClick={() => window.location = 'mailto:'+Enquiries.email} type="button" className="btn btn-primary btn-sm">Sent Mail</button>

                                                    </div>
                                                    <p className="mb-1">Email: {Enquiries.email}</p>
                                                    <p className="mb-1">Phone: {Enquiries.phone}</p>
                                                    <p className="mb-1">Message: {Enquiries.message}</p>
                                                    <small className="text-muted">{Moment(Enquiries.created_at).format('DD-MM-Y')}</small>
                                                               
                                                         
                                                    </div>

                                                <br></br>
                                                </>
                                                );
                                            })}

                                            
                                            </div>
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
