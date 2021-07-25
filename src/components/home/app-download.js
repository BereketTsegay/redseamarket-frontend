import React, { Component } from 'react';
import AppStore from '../../../src/web-assets/img/app-store-icon.svg';
import GooglePlay from '../../../src/web-assets/img/google-play-icon.svg';
class AppDownload extends React.Component{
    render() {
        return (
            <section className="section-app-download">
               <div className="container">
                <div className="row align-items-center">
                <div className="col-lg-7">
                        <h2 className="section-title text-white text-center text-lg-left">Find amazing deals on the go. <br />Download the app now!</h2>
                    </div>
                    <div className="col-lg-5">
                    <div className="app-btn-group text-center text-lg-right">
                        <a href="#"><img src={AppStore} alt="media" /></a>
                        <a href="#"><img src={GooglePlay} alt="media" /></a>
                    </div>
                </div>
                </div>
               </div>
            </section>
            )
        }
    }
    export default AppDownload