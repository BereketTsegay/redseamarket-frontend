import React, { Component } from 'react';
import Header from '../layouts/header.js';
import Footer from '../layouts/footer';
import AppDownload from '../home/app-download';
import CreateAdsCategory from './createadscategory';
import SubCategorySelect from './subcategoryselect'
import CreateForm from './createform';

class CreateAds extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pageSelectVal:1,
            categoryId:0
        };
        
    }     

    handleCallback = (categoryId,pageValue) =>{
        // console.log(childData,"call back value");
        // console.log(pageValue,"Page value");
        // // this.setState({data: childData})

        switch (pageValue) {
            case 'category':
            this.setState({ categoryId:categoryId});   
            this.setState({ pageSelectVal:1});
            break;
            case 'selectsubcategory':
            this.setState({ categoryId:categoryId});
            this.setState({ pageSelectVal:2});
            break;
            default:
            break;
        }



    };
    render() {
        const pageSelectVal = this.state.pageSelectVal;
        let formField;
            console.log(pageSelectVal,"id value")
        if (pageSelectVal=="1") {
            formField = <CreateAdsCategory parentCallback = {this.handleCallback}/>;
        } else if(pageSelectVal=="2") {
            formField = <SubCategorySelect parentCallback = {this.handleCallback} categoryId={this.state.categoryId} />;
            // formField = <CreateForm parentCallback = {this.handleCallback}/>;
        }
        return (
            <div>
            <Header />
            {formField}
            <AppDownload/>
            <Footer/>
            </div>
        )
    }
}
export default CreateAds