import axios from 'axios';
import React, { Component } from 'react';
import { BASE_URL } from '../projectString';
import Logo from '../web-assets/img/brand.svg';

export default class PrivacyPolicy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            privacyPolicy: [],
        }
    }

    componentWillMount = () => {

        axios({
            url: `${BASE_URL}/privacy/policy`,
            method: 'POST',
        }).then(response => {

            if(response.data.status === 'success'){

                this.setState({
                    privacyPolicy: response.data.privacy,
                });
            }

        }).catch((error) => {

        });
    }

    render() {

        let {privacyPolicy} = this.state;

        return (
            <div className="site-frame">

                {/* <!-- =====[HEADER]===== --> */}
                <header id="header" className="site-header">
                    <div className="main-header">
                        <div className="container d-flex align-items-center flex-wrap">
                            <div className="brand">
                                <a href="#" className="d-block"><img src={Logo} className="d-block" alt="brand" /></a>
                            </div>
                        </div>
                    </div>
                </header>

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
                                                <div className="panel-content">
                                                    <h3 className="panel-title">{privacyPolicy.title}</h3>
                                                    <hr />
                                                    <p style={{ textAlign: 'justify', textJustify: 'inter-word'}}>{privacyPolicy.policy}</p>
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
