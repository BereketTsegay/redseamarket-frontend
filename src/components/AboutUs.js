import React, { Component } from 'react';
import Header from './layouts/header';
import Footer from './layouts/footer';
import AppDownload from './home/app-download';

export default class AboutUs extends Component {
    render() {
        return (
            <div className="site-frame">

                <Header />
                
                {/* <!-- =====[PAGE]===== --> */}
                <div id="page" className="site-page">

                    {/* <!-- =====[SECTION PRIVACY & POLICY] **===== --> */}

                    <section className="section-motor-sort-listing">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="section-title-panel text-center">
                                    <h2 className="section-title mb-2">About Us </h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-9 col-lg-11 mx-auto">
                                    <ul className="motor-sort-list">  
                                        <li  style={{borderBottom: 'none'}}>
                                            <div className="panel-content">
                                                <p style={{ textAlign: 'justify', textJustify: 'inter-word'}}>
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                    Lorem Ipsum has been the industry's standard dummy text 
                                                    ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived 
                                                    not only five centuries, but also the leap into electronic typesetting, 
                                                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                                                    and more recently with desktop publishing software 
                                                    like Aldus PageMaker including versions of Lorem Ipsum.
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                        </div>
                    </section>
                </div>

                <AppDownload/>
                <Footer/>
            </div>
        )
    }
}
