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
import {BASE_URL, userToken} from '../../projectString';
import MotorCreate from './motorCreate.js';
import PropertyCreate from './propertyCreate.js';
import LocationPicker from './locationPicker.js';
import CustomField from './customField.js';
import Swal from 'sweetalert2';

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
         latitude: 0,
         longitude: 0,
         phone: '',
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

         fieldValue: [],
         image: [],
         token: userToken,

         
         errors_title: '',
         errors_image: '',
         errors_price: '',
         errors_description: '',
         errors_country_id: '',
         errors_state_id: '',
         errors_city_id: '',

         errors_make_id: '',
         errors_model_id: '',
         errors_registration_year: '',
         errors_fuel: '',
         errors_transmission: '',
         errors_condition: '',
         errors_mileage: '',

         errors_size: '',
         errors_room: '',
         errors_furnished: '',
         errors_building: '',
         errors_parking: '',

         errors_userName: '',
         errors_email: '',
         errors_latitude: '',
         errors_longitude: '',
         errors_phone: '',
         errors_address: '',
      }
   }

   componentWillMount(){

      this.setState({

         category: this.props.match.params.category_id,
         subcategory: this.props.match.params.subcategory_id,
         categoryName: this.props.match.params.category,
         subcategoryName: this.props.match.params.subcategory,

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

      let state = this.state;

      if(state.formPage == 1){

         if(state.title && state.image && state.price && state.description && state.country_id && state.state_id){
            window.scrollTo(0, 0);

            this.setState({
               formPage: this.state.formPage + 1,
            });
         }
         else{
            
            if(state.title === '' || state.title.trim() === ''){
               
               this.setState({
                  errors_title: 'Title cannot be blank',
               });
            }
            if(state.image === '' || state.image.length == 0){

               let image = 'Image cannot be blank';

               this.setState({
                  errors_image: image,
               });
            }
            if(state.price === '' || state.price.trim() === ''){

               let price = 'Price cannot be blank';
               this.setState({
                  errors_price: price,
               });
               
            }
            if(state.description === '' || state.description.trim() === ''){

               let description = 'Description cannot be blank';
               this.setState({
                  errors_description: description,
               });
            }
            if(state.country_id === '' || state.country_id.trim() === ''){

               let country_id = 'Country cannot be blank';
               this.setState({
                  errors_country_id: country_id,
               });
            }
            if(state.state_id === '' || state.state_id.trim() === ''){

               let state_id = 'State cannot be blank';
               this.setState({
                  errors_state_id: state_id,
               });
            }

         }
      }
      else if(state.formPage == 2){

         if(state.category == 1){

            if(state.make_id && state.model_id && state.registration_year && state.fuel && state.transmission && state.condition && state.mileage){
               
               window.scrollTo(0, 0);

               this.setState({
                  formPage: this.state.formPage + 1,
               });
            }
            else{
               if(state.make_id === '' || state.make_id.trim() === ''){
                  let make_id = 'Make cannot be blank';
                  this.setState({
                     errors_make_id: make_id,
                  });
               }
               if(state.model_id === '' || state.model_id.trim() === ''){
                  let model_id = 'Model cannot be blank';
                  this.setState({
                     errors_model_id: model_id,
                  });
               }
               if(state.registration_year === '' || state.registration_year.trim() === ''){
                  let registation = 'Registered year cannot be blank';
                  this.setState({
                     errors_registration_year: registation,
                  });
               }
               if(state.fuel === '' || state.fuel.trim === ''){
                  let fuel = 'Fuel type cannot be blank';
                  this.setState({
                     errors_fuel: fuel,
                  });
               }
               if(state.transmission === '' || state.transmission.trim === ''){
                  let transmission = 'Transmission cannot be blank';
                  this.setState({
                     errors_transmission: transmission,
                  });
               }
               if(state.condition === '' || state.condition.trim() === ''){
                  let condition = 'Condition cannot be blank';
                  this.setState({
                     errors_condition: condition,
                  });
               }
               if(state.mileage === '' || state.mileage.trim() === ''){
                  let mileage = 'Mileage cannot be blank';
                  this.setState({
                     errors_mileage: mileage,
                  });
               }
            }
         }
         else if(state.category == 2 || state.category == 3){
            if(state.size && state.room && state.furnished && state.building){

               window.scrollTo(0, 0);

               this.setState({
                  formPage: this.state.formPage + 1,
               });
            }
            else{
               if(state.size === '' || state.size.trim() ==  ''){
                  let size = 'Size cannot be blank';
                  this.setState({
                     errors_size: size,
                  });
               }
               if(state.room === '' || state.room.trim() === ''){
                  let room = 'Room cannot be blank';
                  this.setState({
                     errors_room: room,
                  });
               }
               if(state.furnished == '' || state.furnished.trim() === ''){
                  let furnished = 'Furnished cannot be blank';
                  this.setState({
                     errors_furnished: furnished,
                  });
               }
               if(state.building === '' || state.building.trim() === ''){
                  let building = 'Building type cannot be blank';
                  this.setState({
                     errors_building: building,
                  });
               }
            }
         }
         else{
            if(state.categoryField){

               window.scrollTo(0, 0);

               this.setState({
                  formPage: this.state.formPage + 1,
               });
            }
         } 
      }
      else if(state.formPage == 3){

         window.scrollTo(0, 0);

         this.setState({
            formPage: this.state.formPage + 1,
         });
      }
   }

   pageUpdateDown = () => {
      window.scrollTo(0, 0);

      this.setState({
         formPage: this.state.formPage - 1,
      });
   }

   fieldValues = (values) => {
      
      this.setState({
         fieldValue: values,
      });
   }

   fileUpload = (file) => {
      
      this.setState({
         image: [...this.state.image, file],
      });
   }

   adSubmitHandler = () => {
      
      let state = this.state;
      if(state.userName && state.email && state.latitude && state.longitude && state.phone && state.address){
       
         axios({
            url: `${BASE_URL}/customer/ads/store`,
            method: 'POST',
            headers: {
               Authorization: "Bearer " + this.state.token,
            },
            data: {
               category: this.state.category,
               subcategory: this.state.subcategory,
               title: this.state.title,
               canonical_name: this.state.canonicalName,
               description: this.state.description,
               price: this.state.price,
               featured: this.state.featured,
               negotiable: this.state.negotiable,
               country: this.state.country_id,
               state: this.state.state_id,
               city: this.state.city_id,
               latitude: this.state.latitude,
               longitude: this.state.longitude,
               name: this.state.userName,
               email: this.state.email,
               phone: this.state.phone,
               phone_hide: this.state.phoneHide,
               address: this.state.address,
               image: this.state.image,
               make_id: this.state.make_id,
               model_id: this.state.model_id,
               registration_year: this.state.registration_year,
               fuel: this.state.fuel,
               transmission: this.state.transmission,
               condition: this.state.condition,
               mileage: this.state.mileage,
               aircondition: this.state.aircondition,
               gps: this.state.gps,
               security: this.state.security,
               tire: this.state.tire,
               size: this.state.size,
               room: this.state.room,
               furnished: this.state.furnished,
               building: this.state.building,
               parking: this.state.parking,
               fieldValue: this.state.fieldValue,
            }

         }).then(response => {
            
            if(response.data.status == 'success'){
               
               Swal.fire({
                  title: 'success!',
                  text: response.data.message,
                  icon: 'success',
                  confirmButtonText: 'OK'
               }).then((result) => {
                  this.props.history.push('/');
               });
            }

         }).catch((error) => {

         });
      }
      else{

         if(state.userName === '' || state.userName.trim() === ''){
            let userName = 'Name cannot be blank';
            this.setState({
               errors_userName: userName,
            });
         }
         if(state.email === '' || state.email.trim() === ''){
            let email = 'Email cannot be blank';
            this.setState({
               errors_email: email,
            });
         }
         if(state.latitude === '' || state.longitude === ''){
            let latitude = 'Please mark a point in maps';
            this.setState({
               errors_latitude: latitude,
            });
         }
         if(state.phone === '' || state.phone.trim() === ''){
            let phone = 'Phone cannot be blank';
            this.setState({
               errors_phone: phone,
            });
         }
         if(state.address === '' || state.address.trim() === ''){
            let address = 'Address cannot be blank';
            this.setState({
               errors_address: address,
            });
         }
      }
   }

    render() {
      
      let {category, subcategory, categoryField, master, master_id, option, country, state,
         city, categoryName, subcategoryName, title, canonicalName, price, userName, email,
         description, phone, address} = this.state;
      
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
                              <TextField handleChange={this.handleChange} name="title" value={title} placeholder="Title" readonly={false} error={this.state.errors_title} />
                              <TextField handleChange={this.handleChange} name="canonicalName" value={canonicalName} placeholder="Canonical Name" readonly={true} />
                              <FileField fileUpload={this.fileUpload} placeholder="Add Pictures" multiple={true} error={this.state.errors_image} />
                              <TextField handleChange={this.handleChange} name="price" value={price} placeholder="Price" readonly={false} error={this.state.errors_price} />
                              <TextArea handleChange={this.handleChange} name="description" value={description} placeholder={`Describe your ${subcategoryName}`} error={this.state.errors_description} />
                              <SelectField placeholder="Country" option={country} optionChange={this.countryChange} type="common" error={this.state.errors_country_id} />
                              <SelectField placeholder="State" option={state} optionChange={this.statesChange} type="common" error={this.state.errors_state_id} />
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
                               
                              <MotorCreate motorEvents={this.motorChanges} errors={this.state} /> 
                              <div className="row">
                                 <div className="form-group col-md-6">
                                    <button onClick={this.pageUpdateDown} className="btn btn-primary btn-block">Back</button>
                                 </div>
                                 <div className="form-group col-md-6">
                                    <button onClick={this.pageUpdate} className="btn btn-primary btn-block">Next</button>
                                 </div>
                              </div>
                           </>
                           : this.state.formPage == 2 && category == 2 ? 
                           <>
                               
                              <PropertyCreate propertyEvent={this.propertyChange} errors={this.state} />
                              <div className="row">
                                 <div className="form-group col-md-6">
                                    <button onClick={this.pageUpdateDown} className="btn btn-primary btn-block">Back</button>
                                 </div>
                                 <div className="form-group col-md-6">
                                    <button onClick={this.pageUpdate} className="btn btn-primary btn-block">Next</button>
                                 </div>
                              </div>
                           </>
                           : this.state.formPage == 2 && category == 3 ? 
                           <>
                               
                              <PropertyCreate propertyEvent={this.propertyChange} errors={this.state} />
                              <div className="row">
                                 <div className="form-group col-md-6">
                                    <button onClick={this.pageUpdateDown} className="btn btn-primary btn-block">Back</button>
                                 </div>
                                 <div className="form-group col-md-6">
                                    <button onClick={this.pageUpdate} className="btn btn-primary btn-block">Next</button>
                                 </div>
                              </div>
                           </>
                           : this.state.formPage == 2 && (category != 1 || category != 2 || category != 3 ) &&  categoryField.length != 0 ? 
                              <>
                                  
                                 <CustomField fieldValues={this.fieldValues} categoryField={categoryField} />
                                 <div className="row">
                                 <div className="form-group col-md-6">
                                    <button onClick={this.pageUpdateDown} className="btn btn-primary btn-block">Back</button>
                                 </div>
                                 <div className="form-group col-md-6">
                                    <button onClick={this.pageUpdate} className="btn btn-primary btn-block">Next</button>
                                 </div>
                              </div>
                              </>
                           : this.state.formPage == 2 && (category == 1 || category == 2 || category == 3 ) &&  categoryField.length != 0 ? 
                              <>
                                  
                                 <CustomField fieldValues={this.fieldValues} categoryField={categoryField} />
                                 <div className="row">
                                 <div className="form-group col-md-6">
                                    <button onClick={this.pageUpdateDown} className="btn btn-primary btn-block">Back</button>
                                 </div>
                                 <div className="form-group col-md-6">
                                    <button onClick={this.pageUpdate} className="btn btn-primary btn-block">Next</button>
                                 </div>
                              </div>
                              </>
                           : this.state.formPage == 2 && (category != 1 || category != 2 || category != 3 ) && categoryField.length == 0 ? 
                           <>
                               
                              <h4>Seller Information</h4>
                              <hr />

                              <TextField handleChange={this.handleChange} name="userName" value={userName} placeholder="Name" readonly={false} error={this.state.errors_userName} />
                              <TextField handleChange={this.handleChange} name="email" value={email} placeholder="Email" readonly={false} error={this.state.errors_email} />
                              <Number handleChange={this.handleChange} name="phone" value={phone} placeholder="Phone" error={this.state.errors_phone} />
                              <TextArea handleChange={this.handleChange} name="address" value={address} placeholder="Address" error={this.state.errors_address} />
                              <Checkbox checkboxChange={this.checkboxChange} name="phoneHide" label="Phone Hide" />

                              <hr />
                              <LocationPicker subcategoryName={subcategoryName} error={this.state.errors_latitude} />

                              <div className="row">
                                 <div className="form-group col-md-6">
                                    <button onClick={this.pageUpdateDown} className="btn btn-primary btn-block">Back</button>
                                 </div>
                                 <div className="form-group col-md-6">
                                    <button onClick={this.adSubmitHandler} className="btn btn-primary btn-block">Create</button>
                                 </div>
                              </div>
                           </>
                           : this.state.formPage == 3 && (category == 1 || category == 2 || category == 3 ) && categoryField.length != 0 ? 
                              <>
                                  
                                 <CustomField fieldValues={this.fieldValues} categoryField={categoryField} />
                                 <div className="row">
                                 <div className="form-group col-md-6">
                                    <button onClick={this.pageUpdateDown} className="btn btn-primary btn-block">Back</button>
                                 </div>
                                 <div className="form-group col-md-6">
                                    <button onClick={this.pageUpdate} className="btn btn-primary btn-block">Next</button>
                                 </div>
                              </div>
                              </>
                           : this.state.formPage == 3 && (category == 1 || category == 2 || category == 3 ) && categoryField.length == 0 ? 
                           
                           <>
                               
                              <h4>Seller Information</h4>
                              <hr />

                              <TextField handleChange={this.handleChange} name="userName" value={userName} placeholder="Name" readonly={false} error={this.state.errors_userName} />
                              <TextField handleChange={this.handleChange} name="email" value={email} placeholder="Email" readonly={false} error={this.state.errors_email} />
                              <Number handleChange={this.handleChange} name="phone" value={phone} placeholder="Phone" error={this.state.errors_phone} />
                              <TextArea handleChange={this.handleChange} name="address" value={address} placeholder="Address" error={this.state.errors_address} />
                              <Checkbox checkboxChange={this.checkboxChange} name="phoneHide" label="Phone Hide" />

                              <hr />
                              <LocationPicker subcategoryName={subcategoryName} error={this.state.errors_latitude} />

                              <div className="row">
                                 <div className="form-group col-md-6">
                                    <button onClick={this.pageUpdateDown} className="btn btn-primary btn-block">Back</button>
                                 </div>
                                 <div className="form-group col-md-6">
                                    <button onClick={this.adSubmitHandler} className="btn btn-primary btn-block">Create</button>
                                 </div>
                              </div>
                           </>
                           : this.state.formPage == 3 && categoryField.length != 0 ?
                              <>
                                  
                                 <CustomField fieldValues={this.fieldValues} categoryField={categoryField} />
                                 <div className="row">
                                    <div className="form-group col-md-6">
                                       <button onClick={this.pageUpdateDown} className="btn btn-primary btn-block">Back</button>
                                    </div>
                                    <div className="form-group col-md-6">
                                       <button onClick={this.pageUpdate} className="btn btn-primary btn-block">Next</button>
                                    </div>
                                 </div>
                              </>
                           : this.state.formPage == 3 && categoryField.length == 0 ? 
                           <>
                               
                              <h4>Seller Information</h4>
                              <hr />

                              <TextField handleChange={this.handleChange} name="userName" value={userName} placeholder="Name" readonly={false} error={this.state.errors_userName} />
                              <TextField handleChange={this.handleChange} name="email" value={email} placeholder="Email" readonly={false} error={this.state.errors_email} />
                              <Number handleChange={this.handleChange} name="phone" value={phone} placeholder="Phone" error={this.state.errors_phone} />
                              <TextArea handleChange={this.handleChange} name="address" value={address} placeholder="Address" error={this.state.errors_address} />
                              <Checkbox checkboxChange={this.checkboxChange} name="phoneHide" label="Phone Hide" />

                              <hr />
                              <LocationPicker subcategoryName={subcategoryName} error={this.state.errors_latitude} />

                              <div className="row">
                                 <div className="form-group col-md-6">
                                    <button onClick={this.pageUpdateDown} className="btn btn-primary btn-block">Back</button>
                                 </div>
                                 <div className="form-group col-md-6">
                                    <button onClick={this.adSubmitHandler} className="btn btn-primary btn-block">Create</button>
                                 </div>
                              </div>
                           </>
                           : <>
                                  

                                 <h4>Seller Information</h4>
                                 <hr />

                                 <TextField handleChange={this.handleChange} name="userName" value={userName} placeholder="Name" readonly={false} error={this.state.errors_userName} />
                                 <TextField handleChange={this.handleChange} name="email" value={email} placeholder="Email" readonly={false} error={this.state.errors_email} />
                                 <Number handleChange={this.handleChange} name="phone" value={phone} placeholder="Phone" error={this.state.errors_phone} />
                                 <TextArea handleChange={this.handleChange} name="address" value={address} placeholder="Address" error={this.state.errors_address} />
                                 <Checkbox checkboxChange={this.checkboxChange} name="phoneHide" label="Phone Hide" />

                                 <hr />
                                 <LocationPicker subcategoryName={subcategoryName} error={this.state.errors_latitude} />

                                 <div className="row">
                                    <div className="form-group col-md-6">
                                       <button onClick={this.pageUpdateDown} className="btn btn-primary btn-block">Back</button>
                                    </div>
                                    <div className="form-group col-md-6">
                                       <button onClick={this.adSubmitHandler} className="btn btn-primary btn-block">Create</button>
                                    </div>
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