import React, { Component } from 'react';
import Header from '../layouts/header.js';
import Home from '../home/home';
import Footer from '../layouts/footer';
import AppDownload from '../home/app-download';
import TextField from '../formcontrols/text';
import FileField from '../formcontrols/file';
import TextArea from '../formcontrols/textarea';
import SelectField from '../formcontrols/select';
import Checkbox from '../formcontrols/checkbox';
import Number from '../formcontrols/number';
import Date from '../formcontrols/date';
import Radio from '../formcontrols/radio';
import DependencySelect from '../formcontrols/dependencySelect';
import axios from 'axios';
import {BASE_URL} from '../../projectString';
import MotorCreate from './motorCreate.js';
import PropertyCreate from './propertyCreate.js';

class CreateForm extends React.Component{

   constructor(props) {
      super(props)
      this.state = {
         category: 2,
         subcategory:1,
         categoryField: [],
         master:'',
         master_id:'',
         option: [],
         country: [],
         state: [],
         city:[],
      }
   }

   componentWillMount(){
      axios({
         method: 'POST',
         url: `${BASE_URL}/customer/ads/custom_field_and_dependency`,
         data:{
            category:this.state.category,
            subcategory:this.state.subcategory,
         }
      }).then(response => {
         
         if(response.data.status == 'success'){
            
            this.setState({
               categoryField:response.data.data.category_field,
            });
            
         }
      });

      axios({
         method: 'POST',
         url: `${BASE_URL}/customer/get/country`,
      }).then(response => {

         if(response.data.status == 'success'){
            this.setState({
               country: response.data.country,
            });
         }

      });

   }


   countryChange = (id) => {
      
      axios({
         method: 'POST',
         url: `${BASE_URL}/customer/get/state`,
         data:{
            country:id,
         }
      }).then(response => {

         if(response.data.status == 'success'){
            this.setState({
               state: response.data.state,
            });
         }

      }).catch((error) => {
        
      });
   }

   statesChange = (id) => {
      
      axios({
         method: 'POST',
         url: `${BASE_URL}/customer/get/city`,
         data:{
            state:id,
         }
      }).then(response => {

         if(response.data.status == 'success'){
            this.setState({
               city: response.data.city,
            });
         }

      }).catch((error) => {
        
      });
   }
   

    render() {
      
      let {category, subcategory, categoryField, master, master_id, option, country, state, city} = this.state;
      
         return (
            <div className="site-frame">
                <Header />
            
                <div id="page" className="site-page">
                <section className="section-create-ad-1">
               <div className="container">
                  <div className="row">
                     <div className="col-12">
                        <div className="section-title-panel text-center">
                           <h2 className="section-title mb-2">You’re almost there!</h2>
                           <p>Include as much details and pictures as possible, and set the right price!</p>
                        </div>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-xl-5 col-lg-7 col-md-9 mx-auto">
                        <ol className="breadcrumb p-0 bg-white justify-content-center">
                           <li className="breadcrumb-item"><a href="#">Sport Bike</a></li>
                           <li className="breadcrumb-item"><a href="#">Hyper sports</a></li>
                        </ol>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-xl-5 col-lg-7 col-md-9 mx-auto">
                        <div className="create-ad-form">
                          
                           <TextField  placeholder="Title"/>
                           <TextField  placeholder="Canonical Name"/>
                           <FileField placeholder="Add Pictures" />
                           {/* <TextField placeholder="Phone number"/> */}
                           <TextField placeholder="Price"/>
                           <TextArea placeholder="Describe your Sport Bike" />
                           <SelectField placeholder="Country" option={country} optionChange={this.countryChange} type="common" />
                           <SelectField placeholder="State" option={state} optionChange={this.statesChange} type="common" />
                           <SelectField placeholder="City" option={city} type="common" />
                           <Checkbox label="Price Negotiable" />
                           <Checkbox label="Featured" />

                           { category == 1 ?  <MotorCreate /> : category == 2 ? <PropertyCreate /> : category == 3 ? <PropertyCreate /> : '' }

                           {categoryField.map((categoryField, index) => {
                              if(categoryField.field.type === 'text'){
                                 return(
                                    <TextField key={index} placeholder={categoryField.field.name}/>
                                 );
                              }
                              else if(categoryField.field.type === 'textarea'){
                                 return(
                                    <TextArea key={index} placeholder={categoryField.field.name}/>
                                 );
                              }
                              else if(categoryField.field.type === 'checkbox'){
                                 return(
                                    <Checkbox key={index} label={categoryField.field.name} />
                                 );
                              }
                              else if(categoryField.field.type === 'select'){
                                 return(
                                    <SelectField key={index} placeholder={categoryField.field.name} option={categoryField.field.field_option} type="customField" />
                                 );
                              }
                              else if(categoryField.field.type === 'radio'){
                                 return (
                                    <Radio key={index} label={categoryField.field.name} option={categoryField.field.field_option} />
                                 );
                              }
                              else if(categoryField.field.type === 'file'){
                                 return(
                                    <FileField key={index} placeholder={categoryField.field.name} />
                                 );
                              }
                              else if(categoryField.field.type === 'url'){
                                 return(
                                    <TextField key={index} placeholder={categoryField.field.name}/>
                                 );
                              }
                              else if(categoryField.field.type === 'number'){
                                 return(
                                    <Number key={index} placeholder={categoryField.field.name}/>
                                 );
                              }
                              else if(categoryField.field.type === 'date'){
                                 return(
                                    <Date key={index} placeholder={categoryField.field.name}/>
                                 );
                              }
                              else if(categoryField.field.type === 'dependency'){
                                 return (
                                    <DependencySelect key={index} dependency={categoryField.field.dependency} />
                                 );
                              }
                           })}
                           <hr />
                           <h4>Seller Information</h4>
                           <hr />

                           <TextField placeholder="Name" />
                           <TextField placeholder="Email" />
                           <Number placeholder="Phone" />
                           <TextArea placeholder="Address" />
                           <Checkbox label="Phone Hide" />

                           <hr />
                           <TextField placeholder="Locate your motorcycle" />

                           <div className="create-ad-location mb-4 mb-md-5">
                              <h4 className="title mb-2">Is the pin in the right location?</h4>
                              <p>Click and drag the pin to the exact spot. Users are more likely to respond to ads that are correctly shown on the map</p>
                              <div className="map-frame overflow-hidden">
                                 <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d68715.3019452309!2d55.304360684611346!3d25.155860292817362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1626524584118!5m2!1sen!2sin"></iframe>
                              </div>
                           </div>
                           <div className="form-group">
                              <button className="btn btn-primary btn-block">Next</button>
                           </div>
                        </div>
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
    export default CreateForm