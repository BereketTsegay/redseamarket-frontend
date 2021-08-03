import React, { Component } from 'react';
import Header from '../layouts/header.js';
import Footer from '../layouts/footer';
import AppDownload from '../home/app-download';
import CreateAdsCategory from './createadscategory';
import SubCategorySelect from './subcategoryselect'
import CreateForm from './createform';
import axios from 'axios';
class CreateAds extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pageSelectVal:1,
            categoryId:0
        };
        
    }     

    // componentWillMount() {
    //     axios.post('http://jama-al-backend.freshpureuae.com/api/customer/get/category',
    //     {
    //        latitude:0,
    //        longitude:0,
    //     }).then(result => {
    //         console.log(result,"values")
    //     //   if(result.data.status=="success" && result.status){
    //         //    this.setState({loginStatus:result.data.data.loged_user_status}); 
    //         //    this.setState({dataArray:result.data.data.categories});
     
    //     //   }
         
            
    //     })
    //   }




    handleCallback = (categoryId,pageValue) =>{
        switch (pageValue) {
            case 'category':

            console.log(categoryId,"categoryId");        
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