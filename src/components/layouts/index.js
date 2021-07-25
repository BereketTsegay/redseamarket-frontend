import React, { Component } from 'react';

import Header from '../layouts/header.js';

import Footer from '../layouts/footer';
class Index extends React.Component{
    render() {
        return (
            <div className="site-frame">
                <Header />
               
                
                <Footer/>
            </div>
            )
        }
    }
    export default Index