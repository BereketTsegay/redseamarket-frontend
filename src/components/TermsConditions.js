import axios from 'axios';
import Header from './layouts/header';
import React, { Component } from 'react';
import { BASE_URL } from '../projectString';
import Logo from '../web-assets/img/brand.svg';
import Loader from './Loader';

export default class TermsConditions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            termsConditions: [],
            loaderStatus: false,
        }
    }

    componentWillMount = () => {

        this.setState({
            loaderStatus: true,
        });

        window.scrollTo(0, 0);
        axios({
            url: `${BASE_URL}/terms/conditions`,
            method: 'POST',
        }).then(response => {

            if(response.data.status === 'success'){

                this.setState({
                    termsConditions: response.data.terms,
                });
            }

            this.setState({
                loaderStatus: false,
            });

        }).catch((error) => {
            this.setState({
                loaderStatus: false,
            });
        });
    }

    render() {

        let {termsConditions, loaderStatus} = this.state;

        return (
            <div className="site-frame">
                {loaderStatus == true ? <Loader /> : ''}
                {/* <!-- =====[HEADER]===== --> */}
                {/* <header id="header" className="site-header">
                    <div className="main-header">
                        <div className="container d-flex align-items-center flex-wrap">
                            <div className="brand">
                                <a href="#" className="d-block"><img src={Logo} className="d-block" alt="brand" /></a>
                            </div>
                        </div>
                    </div>
                </header> */}
                <Header />
                {/* <!-- =====[PAGE]===== --> */}
                <div id="page" className="site-page">

                    {/* <!-- =====[SECTION PRIVACY & POLICY] **===== --> */}

                    <section className="section-motor-sort-listing">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="section-title-panel text-center">
                                <h2 className="section-title mb-2">Terms &amp; Conditions </h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-9 col-lg-11 mx-auto">
                                <ul className="motor-sort-list">

                                    {termsConditions && termsConditions.map((termsConditions, index) => {
                                        return (
                                            <li key={index} style={{borderBottom: 'none'}}>
                                                <div className="panel-content">
                                                    <h3 className="panel-title">{termsConditions.title}</h3>
                                                    <hr />
                                                    <p style={{ textAlign: 'justify', textJustify: 'inter-word'}}>{termsConditions.terms}</p>
                                                </div>
                                            </li>
                                        );
                                    })}
                                    
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                    </section>
                </div>
            </div>
        )
    }
}
