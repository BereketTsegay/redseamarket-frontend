import React, { Component } from 'react';
import HomeFilter from '../home/homefilter';
class Home extends React.Component{
    render() {
        return (
            <div id="page" className="site-page">
                <HomeFilter/> 
            </div>
            )
        }
    }
    export default Home