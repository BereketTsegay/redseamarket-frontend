import React, { Component } from 'react';

import Header from '../layouts/header.js';
import Home from '../home/home';
import Footer from '../layouts/footer';
class Index extends React.Component{
    render() {
        return (
            <div className="site-frame">
                <Header />
                <Home />

                
                <Footer/>
            </div>
            )
        }
    }
    export default Index