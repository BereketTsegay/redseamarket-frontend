import React, { Component } from 'react';

import Header from '../layouts/header.js';
import Menu from '../layouts/menu';
import Footer from '../layouts/footer';
class Index extends React.Component{
    render() {
        return (
            <div className="site-frame">
                <Header />
                <Menu />
                
                <Footer/>
            </div>
            )
        }
    }
    export default Index