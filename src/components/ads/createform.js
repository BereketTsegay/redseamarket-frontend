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
import LocationPicker from './locationPicker.js';
import CustomField from './customField.js';

class CreateForm extends React.Component{

   constructor(props) {
      super(props)

      this.state = {
         category: '',
         subcategory:'',
         categoryField: [],
         master:'',
         master_id:'',
         option: [],
         country: [],
         state: [],
         city:[],
         categoryName: '',
         subcategoryName: '',
         title: '',
         canonicalName: '',
         price: '',
         userName: '',
         email: '',
         description: '',
         number: '',
         address: '',
         country_id: '',
         state_id: '',
         city_id: '',
         negotiable: false,
         featured: false,
         phoneHide: false,

         make_id: '',
         model_id: '',
         registration_year: '',
         fuel: '',
         transmission: '',
         condition: '',
         mileage: '',
         aircondition: '',
         gps: '',
         security: '',
         tire: '',
         
         size: '',
         room: '',
         furnished: '',
         building: '',
         parking: '',

         formPage: 1,
      }
   }

   componentWillMount(){

      this.setState({

         category: this.props.match.params.category_id,
         subcategory: this.props.match.params.subcategory_id,
         categoryName: this.props.match.params.category,
         subcategoryName: this.props.match.params.subcategory
         ,
      }, () => {
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
               country_id: id,
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
               state_id: id,
               city: response.data.city,
            });
         }

      }).catch((error) => {
        
      });
   }

   cityChange = (id) => {

      this.setState({
         city_id: id,
      });
   }


   handleChange = (name, value) => {

      if(name == 'title'){

         let canonical = value.toLowerCase().replace(/ +/g, '-').replace(/[^-\w]/g, '');

         
         this.setState({
            [name]: value,
            canonicalName: canonical,
         });
      }
      else{

         this.setState({
            [name]: value,
         });

      }
      console.log(name, value);
   }

   checkboxChange = (name, value) => {
      
      this.setState({
         [name]: value,
      });
   }

   motorChanges = (motor) => {
      
         this.setState({
            make_id: motor.make_id,
            model_id: motor.model_id,
            registration_year: motor.registration_year,
            fuel: motor.fuel,
            transmission: motor.transmission,
            condition: motor.condition,
            mileage: motor.mileage,
            aircondition: motor.aircondition,
            gps: motor.gps,
            security: motor.security,
            tire: motor.tire,
         });
   }

   propertyChange = (property) => {

      this.setState({
         size: property.size,
         room: property.room,
         furnished: property.furnished,
         building: property.buildingType,
         parking: property.parking,
      });
   }

   pageUpdate = () => {
      this.setState({
         formPage: this.state.formPage + 1,
      });
   }

    render() {
      
      
      let {category, subcategory, categoryField, master, master_id, option, country, state,
         city, categoryName, subcategoryName, title, canonicalName, price, userName, email,
         description, number, address} = this.state;
      
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
                           <li className="breadcrumb-item"><a>{categoryName}</a></li>
                           <li className="breadcrumb-item"><a>{subcategoryName}</a></li>
                        </ol>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-xl-5 col-lg-7 col-md-9 mx-auto">
                        <div className="create-ad-form">
                          {this.state.formPage == 1 ?
                           <>
                              <TextField handleChange={this.handleChange} name="title" value={title} placeholder="Title" readonly={false} />
                              <TextField handleChange={this.handleChange} name="canonicalName" value={canonicalName} placeholder="Canonical Name" readonly={true} />
                              <FileField placeholder="Add Pictures" />
                              <TextField handleChange={this.handleChange} name="price" value={price} placeholder="Price" readonly={false}/>
                              <TextArea handleChange={this.handleChange} name="description" value={description} placeholder={`Describe your ${subcategoryName}`} />
                              <SelectField placeholder="Country" option={country} optionChange={this.countryChange} type="common" />
                              <SelectField placeholder="State" option={state} optionChange={this.statesChange} type="common" />
                              <SelectField placeholder="City" option={city} optionChange={this.cityChange} type="common" />
                              <Checkbox checkboxChange={this.checkboxChange} name="negotiable" label="Price Negotiable" />
                              <Checkbox checkboxChange={this.checkboxChange} name="featured" label="Featured" />
                              
                              <div className="form-group">
                                 <button onClick={this.pageUpdate} className="btn btn-primary btn-block">Next</button>
                              </div>
                           </>
                           : 
                           this.state.formPage == 2 && category == 1 ?  
                           <>
                              <MotorCreate motorEvents={this.motorChanges} /> 
                              <div className="form-group">
                                 <button onClick={this.pageUpdate} className="btn btn-primary btn-block">Next</button>
                              </div>
                           </>
                           : this.state.formPage == 2 && category == 2 ? 
                           <>
                              <PropertyCreate propertyEvent={this.propertyChange} />
                              <div className="form-group">
                                 <button onClick={this.pageUpdate} className="btn btn-primary btn-block">Next</button>
                              </div>
                           </>
                           : this.state.formPage == 2 && category == 3 ? 
                           <>
                              <PropertyCreate propertyEvent={this.propertyChange} />
                              <div className="form-group">
                                 <button onClick={this.pageUpdate} className="btn btn-primary btn-block">Next</button>
                              </div>
                           </>
                           : this.state.formPage == 2 && (category != 1 || category != 2 || category != 3 ) &&  categoryField.length != 0 ? 
                              <>
                                 <CustomField categoryField={categoryField} />
                                 <div className="form-group">
                                    <button onClick={this.pageUpdate} className="btn btn-primary btn-block">Next</button>
                                 </div>
                              </>
                           : this.state.formPage == 2 && (category == 1 || category == 2 || category == 3 ) &&  categoryField.length != 0 ? 
                              <>
                                 <CustomField categoryField={categoryField} />
                                 <div className="form-group">
                                    <button onClick={this.pageUpdate} className="btn btn-primary btn-block">Next</button>
                                 </div>
                              </>
                           : this.state.formPage == 2 && (category != 1 || category != 2 || category != 3 ) && categoryField.length == 0 ? 
                           <>
                              <h4>Seller Information</h4>
                              <hr />

                              <TextField handleChange={this.handleChange} name="name" value={userName} placeholder="Name" readonly={false} />
                              <TextField handleChange={this.handleChange} name="email" value={email} placeholder="Email" readonly={false} />
                              <Number handleChange={this.handleChange} name="number" value={number} placeholder="Phone" />
                              <TextArea handleChange={this.handleChange} name="address" value={address} placeholder="Address" />
                              <Checkbox checkboxChange={this.checkboxChange} name="phoneHide" label="Phone Hide" />

                              <hr />
                              <LocationPicker subcategoryName={subcategoryName} />

                              <div className="form-group">
                                 <button className="btn btn-primary btn-block">Create</button>
                              </div>
                           </>
                           : this.state.formPage == 3 && (category == 1 || category == 2 || category == 3 ) && categoryField.length != 0 ? 
                              <>
                                 <CustomField categoryField={categoryField} />
                                 <div className="form-group">
                                    <button onClick={this.pageUpdate} className="btn btn-primary btn-block">Next</button>
                                 </div>
                              </>
                           : this.state.formPage == 3 && (category == 1 || category == 2 || category == 3 ) && categoryField.length == 0 ? 
                           
                           <>
                              <h4>Seller Information</h4>
                              <hr />

                              <TextField handleChange={this.handleChange} name="name" value={userName} placeholder="Name" readonly={false} />
                              <TextField handleChange={this.handleChange} name="email" value={email} placeholder="Email" readonly={false} />
                              <Number handleChange={this.handleChange} name="number" value={number} placeholder="Phone" />
                              <TextArea handleChange={this.handleChange} name="address" value={address} placeholder="Address" />
                              <Checkbox checkboxChange={this.checkboxChange} name="phoneHide" label="Phone Hide" />

                              <hr />
                              <LocationPicker subcategoryName={subcategoryName} />

                              <div className="form-group">
                                 <button className="btn btn-primary btn-block">Create</button>
                              </div>
                           </>
                           : this.state.formPage == 3 && categoryField.length != 0 ?
                              <>
                                 <CustomField categoryField={categoryField} />
                                 <div className="form-group">
                                    <button onClick={this.pageUpdate} className="btn btn-primary btn-block">Next</button>
                                 </div>
                              </>
                           : this.state.formPage == 3 && categoryField.length == 0 ? 
                           <>
                              <h4>Seller Information</h4>
                              <hr />

                              <TextField handleChange={this.handleChange} name="name" value={userName} placeholder="Name" readonly={false} />
                              <TextField handleChange={this.handleChange} name="email" value={email} placeholder="Email" readonly={false} />
                              <Number handleChange={this.handleChange} name="number" value={number} placeholder="Phone" />
                              <TextArea handleChange={this.handleChange} name="address" value={address} placeholder="Address" />
                              <Checkbox checkboxChange={this.checkboxChange} name="phoneHide" label="Phone Hide" />

                              <hr />
                              <LocationPicker subcategoryName={subcategoryName} />

                              <div className="form-group">
                                 <button className="btn btn-primary btn-block">Create</button>
                              </div>
                           </>
                           : <>
                                 <h4>Seller Information</h4>
                                 <hr />

                                 <TextField handleChange={this.handleChange} name="name" value={userName} placeholder="Name" readonly={false} />
                                 <TextField handleChange={this.handleChange} name="email" value={email} placeholder="Email" readonly={false} />
                                 <Number handleChange={this.handleChange} name="number" value={number} placeholder="Phone" />
                                 <TextArea handleChange={this.handleChange} name="address" value={address} placeholder="Address" />
                                 <Checkbox checkboxChange={this.checkboxChange} name="phoneHide" label="Phone Hide" />

                                 <hr />
                                 <LocationPicker subcategoryName={subcategoryName} />

                                 <div className="form-group">
                                    <button className="btn btn-primary btn-block">Create</button>
                                 </div>
                              </>
                           }
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