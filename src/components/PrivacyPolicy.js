import axios from 'axios';
import Header from './layouts/header';
import React, { Component } from 'react';
import { BASE_URL } from '../projectString';
import Logo from '../web-assets/img/brand.svg';
import Loader from './Loader';

export default class PrivacyPolicy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            privacyPolicy: [],
            loaderStatus: false,
        }
    }

    componentWillMount = () => {

        this.setState({
            loaderStatus: true,
        });

        window.scrollTo(0, 0);
        axios({
            url: `${BASE_URL}/privacy/policy`,
            method: 'POST',
        }).then(response => {

            if(response.data.status === 'success'){

                this.setState({
                    privacyPolicy: response.data.privacy,
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

        let {privacyPolicy, loaderStatus} = this.state;

        return (
            <div className="site-frame">
                {loaderStatus == true ? <Loader /> : ''}
                <Header />
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

                {/* <!-- =====[PAGE]===== --> */}
                <div id="page" className="site-page">

                    {/* <!-- =====[SECTION PRIVACY & POLICY] **===== --> */}

                    <section className="section-motor-sort-listing">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="section-title-panel text-center">
                                <h2 className="section-title mb-2">Privacy &amp; Policy </h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-9 col-lg-11 mx-auto">
                                <ul className="motor-sort-list">

                                    {privacyPolicy && privacyPolicy.map((privacyPolicy, index) => {
                                        return (
                                            <li key={index} style={{borderBottom: 'none'}}>
                                                <div className="panel-content" dangerouslySetInnerHTML={{ __html:privacyPolicy.policy}}>
                                                   
                                                    {/* <p style={{ textAlign: 'justify', textJustify: 'inter-word'}} dangerouslySetInnerHTML={{ __html:privacyPolicy.policy}}> </p> */}
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
