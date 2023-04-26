import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL, userToken } from '../../projectString'
import AppDownload from '../home/app-download'
import Footer from '../layouts/footer'
import Header from '../layouts/header'
import Ads from './ads'
import Breadcrumb from './breadcrumb'
import Loader from '../Loader';
import NavLinks from './NavLinks'
import PaginationLink from './paginationLink';
let currency = localStorage.getItem('currency') ? localStorage.getItem('currency') : 'USD';
let currency_value=localStorage.getItem('currency_value') ;
 currency_value = currency_value&&(currency_value!='null')? localStorage.getItem('currency_value') : 0;
export default class myAds extends Component {

    constructor(){
        super();
        this.state = {
            myAds: [],
            paginataionArray: [],
            currentPage: '',
            previousPage: '',
            nexPage: '',
            last: '',
            token: userToken,
            loaderState: false,
            emailVerify:localStorage.getItem('emailverify') != '' ? localStorage.getItem('emailverify'):'',
            loginStatus: (localStorage.getItem('loginStatus'))?localStorage.getItem('loginStatus'):false,

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
            url: `${BASE_URL}/customer/view/myAds`,
            method: 'POST',
            headers: { Authorization: "Bearer " + this.state.token },
            
        }).then(response => {
            
            if(response.data.status === 'success'  && response.data.ads){
                //  console.log(response.data.ads.data);
                this.setState({
                    myAds: response.data.ads.data,
                    paginataionArray: response.data.ads.links,
                    currentPage: response.data.ads.current_page,
                    previousPage: response.data.ads.prev_page_url,
                    nexPage: response.data.ads.next_page_url,
                    last:response.data.ads.last_page,
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

    paginationCall = (url) => {

        this.setState({
            loaderState: true,
        });

        axios({
            url: url,
            method: 'POST',
            headers: { Authorization: "Bearer " + this.state.token },
            
        }).then(response => {
            
            if(response.data.status === 'success'  && response.data.ads){

                this.setState({
                    myAds: response.data.ads.data,
                    paginataionArray: response.data.ads.links,
                    currentPage: response.data.ads.current_page,
                    previousPage: response.data.ads.prev_page_url,
                    nexPage: response.data.ads.next_page_url,
                    last:response.data.ads.last_page,
                });
            }

            this.setState({
                loaderState: false,
            });

        }).catch((error) => {
            this.setState({
                loaderState: true,
            });
        });

    }


    render() {

        let {myAds, paginataionArray, currentPage, previousPage, nexPage, last, token, loaderState} = this.state;

        return (

            <div id="page" className="site-page">
                { loaderState === true ? <Loader /> : ''}
                <>
                    <Header />
                    <Breadcrumb section="My Ads" />

                    <section className="section-my-favorite pt-4 pb-5">
                        <div className="container">
                            
                            <NavLinks linkState="myads" />

                            <div className="my-account-title">
                                <div className="row">
                                    <div className="col-xl-11 mx-auto">
                                    <div className="row align-items-center">
                                        <div className="col-md-7 col-6"><h2 className="title mb-0">My Ads</h2></div>
                                        {this.state.loginStatus === true || this.state.loginStatus === 'true' && this.state.emailVerify == 1 ?
                                        <div className="col-md-5 col-6 text-right"><Link to='/create-ads' className="btn btn-primary">Post Ad Now</Link></div>:''}
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="my-favorite-grid">
                                <div className="row">
                                    <div className="col-xl-11 mx-auto">
                                        <div className="row row-product-panel">
                                        {myAds.map((myAd, index) => {
                                                return(
                                                    <Ads key={index} ads={myAd} />
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {last === 1 || last === '' ? '' :
                                <PaginationLink paginataionArray={paginataionArray} last={last} previousPage={previousPage} nexPage={nexPage} paginationChange={this.paginationCall} />
                            }
                        </div>
                    </section>
                    <AppDownload />
                    <Footer />
                </>
            </div>
        )
    }
}
