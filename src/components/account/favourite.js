import axios from 'axios'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { BASE_URL, userToken } from '../../projectString'
import AppDownload from '../home/app-download'
import Footer from '../layouts/footer'
import Header from '../layouts/header'
import Ads from './ads'
import Breadcrumb from './breadcrumb'
import NavLinks from './NavLinks'
import PaginationLink from './paginationLink';
import Loader from '../Loader';

export default class favourite extends Component {

    constructor(){
        super();

        this.state = {
            favourite: [],
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
        
        this.setState({
            loaderState: true,
        });

        axios({
            url: `${BASE_URL}/customer/view/favourite`,
            method: 'POST',
            headers: { Authorization: "Bearer " + this.state.token },
            
        }).then(response => {
            
            if(response.data.status === 'success'  && response.data.favourite){

                this.setState({
                    favourite: response.data.favourite.data,
                    paginataionArray: response.data.favourite.links,
                    currentPage: response.data.favourite.current_page,
                    previousPage: response.data.favourite.prev_page_url,
                    nexPage: response.data.favourite.next_page_url,
                    last:response.data.favourite.last_page,
                    loaderState: false,
                });
            }

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
            
        }).then(response => {
            
            if(response.data.status === 'success'){

                this.setState({
                    favourite: response.data.favourite.data,
                    paginataionArray: response.data.favourite.links,
                    currentPage: response.data.favourite.current_page,
                    previousPage: response.data.favourite.prev_page_url,
                    nexPage: response.data.favourite.next_page_url,
                    last:response.data.favourite.last_page,
                    loaderState: false,
                });
            }

        }).catch((error) => {

            this.setState({
                loaderState: false,
            });
        });
    }

    render() {

        

        let {favourite, paginataionArray, currentPage, previousPage, nexPage, last, token, loaderState} = this.state;

        return (
            <div id="page" className="site-page">
                {loaderState == true ? <Loader /> :
                <>
                    <Header />
                    <Breadcrumb section="My Favorites" />
                    
                    <section className="section-my-favorite pt-4 pb-5">
                        <div className="container">

                            <NavLinks linkState="myfavourite" />

                            <div className="my-account-title">
                                <div className="row">
                                    <div className="col-xl-11 mx-auto">
                                    <div className="row align-items-center">
                                        <div className="col-12"><h2 className="title mb-0">My Favorites</h2></div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="my-favorite-grid">
                                <div className="row">
                                    <div className="col-xl-11 mx-auto">
                                        <div className="row row-product-panel">
                                            
                                            {favourite.map((favourite, index) => {
                                                return(
                                                    <Ads key={index} ads={favourite.ads} />
                                                );
                                            })}
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {last == 1 || last == '' ? '' : 
                                <PaginationLink paginataionArray={paginataionArray} last={last} previousPage={previousPage} nexPage={nexPage} paginationChange={this.paginationCall} />
                                
                            }

                        </div>
                    </section>

                    <AppDownload/>
                    <Footer/>
                </>}
            </div>
        )
    }
}
