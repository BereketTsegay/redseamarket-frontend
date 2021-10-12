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
            categoryId:0,
            categoryName: '',
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




    handleCallback = (categoryId,pageValue, name) => {
        window.scrollTo(0, 0);
        switch (pageValue) {
            case 'category':

                this.setState({ categoryId:categoryId});   
                this.setState({ pageSelectVal:1});
                break;
            case 'selectsubcategory':
                this.setState({ categoryId:categoryId});
                this.setState({ 
                    pageSelectVal:2,
                    categoryName:name,
                });
                break;
            // case 'selectsubsubcategory':
            //     this.setState({
            //         categoryId:categoryId,
            //         pageSelectVal:3,
            //         categoryName:name,
            //     });
            //     break;
            default:
                break;
        }
    };

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        window.scrollTo(0, 0);
        this.setState({
            pageSelectVal: 1,
        });
    }
    
    render() {
        const pageSelectVal = this.state.pageSelectVal;
        let formField;
            
        if (pageSelectVal=="1") {
            formField = <CreateAdsCategory parentCallback = {this.handleCallback}/>;
        } else if(pageSelectVal=="2") {
            formField = <SubCategorySelect parentCallback = {this.handleCallback} categoryId={this.state.categoryId} categoryName={this.state.categoryName} />;
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