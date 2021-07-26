import React, { Component } from 'react';

import Header from '../layouts/header.js';
import Home from '../home/home';
import Footer from '../layouts/footer';
import AppDownload from '../home/app-download';
class Index extends React.Component{
    render() {
        return (
            <div className="site-frame">
                <Header />
                <Home />

                <AppDownload/>
                <Footer/>
            </div>
            )
        }
    }
    export default Index