import axios from 'axios'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { BASE_URL } from '../../projectString'
import AppDownload from '../home/app-download'
import Footer from '../layouts/footer'
import Header from '../layouts/header'
import Ads from './ads'
import Breadcrumb from './breadcrumb'
import NavLinks from './NavLinks'
import PaginationLink from './paginationLink'

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
        }
    }

    componentWillMount(){

        axios({
            url: `${BASE_URL}/customer/view/favourite`,
            method: 'POST',
            
        }).then(response => {
            
            if(response.data.status === 'success'  && response.data.favourite){

                this.setState({
                    favourite: response.data.favourite.data,
                    paginataionArray: response.data.favourite.links,
                    currentPage: response.data.favourite.current_page,
                    previousPage: response.data.favourite.prev_page_url,
                    nexPage: response.data.favourite.next_page_url,
                    last:response.data.favourite.last_page,
                });
            }

        }).catch((error) => {

        });
    }

    paginationCall = (url) => {

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
                });
            }

        }).catch((error) => {

        });
    }

    render() {

        

        let {favourite, paginataionArray, currentPage, previousPage, nexPage, last} = this.state;

        return (
            <div id="page" className="site-page">
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

                        {last == 1 ? '' : 
                            <PaginationLink paginataionArray={paginataionArray} last={last} previousPage={previousPage} nexPage={nexPage} paginationChange={this.paginationCall} />
                            
                        }

                    </div>
                </section>

                <AppDownload/>
                <Footer/>
            </div>
        )
    }
}
