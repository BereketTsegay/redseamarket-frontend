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
import {BASE_URL, userToken, GOOGLEMAPS_API} from '../../projectString';
import MotorCreate from './motorCreate.js';
import PropertyCreate from './propertyCreate.js';
import LocationPicker from './locationPicker.js';
import CustomField from './customField.js';
import Swal from 'sweetalert2';
import Loader from '../Loader';
import FeaturedPayment from './featuredPayment.js';
import InjectedCheckoutForm from '../common/paymentForm';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import MotorProperty from './motorProperty';
import PropertyForRendProperty from './propertyForRendProperty';
import Multiselect from 'multiselect-react-dropdown';

class CreateForm extends React.Component{

   constructor(props) {
      super(props)
      const contryId=localStorage.getItem('country_id') ? localStorage.getItem('country_id') : 0;
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
         price: 0,
         userName: '',
         email: '',
         description: '',
         descriptioninArabic: '',
         titleinArabic: '',
         latitude: sessionStorage.getItem('latitude') ? parseFloat(sessionStorage.getItem('latitude')) : 23.4241,
         longitude: sessionStorage.getItem('longitude') ? parseFloat(sessionStorage.getItem('longitude')) : 53.8478,
         phone: '',
         address: '',
         country_id: contryId,
         state_id: '',
         city_id: '',
         area: '',
         sub_area: '',
         sub_area2: '',
         negotiable: false,
         featured: false,
         phoneHide: false,
         featutred_set:'',
         make_id: '',
         model_id: '',
         variant_id: '',
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
         imageArr: [],
         token: userToken,

         
         errors_title: '',
         errors_image: '',
         errors_price: '',
         errors_description: '',
         errors_country_id: '',
         errors_state_id: '',
         errors_city_id: '',
         errors_area: '',

         errors_make_id: '',
         errors_model_id: '',
         errors_variant_id: '',
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

         loaderStatus: false,
         paymentMethod: '',
         paymentId: '',

         amountType: '',
         amountPercentage: '',
         motor: {},
         paymentDocument: '',
         termsCondition: false,
         errors_terms: '',
         perviewModal: false,
         mainImage: '',
         currency: localStorage.getItem('currency') ? localStorage.getItem('currency') : 'AED',
         phoneModalShow: false,
         countryText: '',
         stateText: '',
         cityText: '',
         makeText: '',
         modelText: '',
         variantText: '',
         submitStatus: false,
         countryOptions: [],
         multiSelectVal: [],
         usdVal:localStorage.getItem('usd_value') ? localStorage.getItem('usd_value') : 0,
         currency_value:localStorage.getItem('currency_value') ,

      }
   }
   checkEmpty(input){
      if(input)
      {
         if((input==='')||(input===null))
         {
            return true;
         }
         else if(String(input).trim()==='')
         {
            return true;
         }else{
            return false;
         }

      }else{
         return true;
      }
   }
   componentWillMount(){
      this.setState({

         category: this.props.match.params.category_id,
         subcategory: this.props.match.params.subcategory_id === '&nvlp' ? '' : this.props.match.params.subcategory_id,
         categoryName: this.props.match.params.category,
         subcategoryName: this.props.match.params.subcategory === '&!$*' ? '' : this.props.match.params.subcategory,
         loaderStatus: true
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

            this.setState({
               loaderStatus: false,
           })

         }).catch((error) => {
            this.setState({
               loaderStatus: false,
            });
         });
      });

      this.setState({
         loaderStatus: true,
      });

      axios({
         method: 'GET',
         url: `${BASE_URL}/featured`
        
      }).then(response => {
         
         if(response.data.status == 'success'){
            // console.log(response.data);
            this.setState({
               featutred_set:response.data.data
            });

            if(response.data.data==0){
               this.setState({
                  featured: false
               });
            }
            else if(response.data.data==1){
               this.setState({
                  featured: true
               });
            }
            else{
               this.setState({
                  featured: false
               });
            }

            
         }

         this.setState({
            loaderStatus: false,
        })

      }).catch((error) => {
         this.setState({
            loaderStatus: false,
         });
      });

      axios({
         method: 'POST',
         url: `${BASE_URL}/customer/get/country`,
      }).then(response => {

         if(response.data.status == 'success'){
           // console.log(response.data.country)
            this.setState({
               country: response.data.country,
               countryOptions: response.data.country,
            });
          const country= response.data.country.find((country)=>country.id==this.state.country_id);
          if(country)
          {
            this.setState({
               multiSelectVal: [country],
             });
          }
         }

      }).catch((error) => {
         this.setState({
            loaderStatus: false,
         });
      });

      axios({
         url: `${BASE_URL}/subcategory/featured/amount`,
         method: 'POST',
         data: {
            category: this.props.match.params.category,
            subcategory: this.props.match.params.subcategory_id,
         }
      }).then(response => {

         if(response.data.status === 'success'){

          // console.log(response);

            if(response.data.subcategory.type == 0){

               this.setState({
                  amountType: 'flat',
                  amountPercentage: response.data.subcategory.percentage
               });
            }
            else{

               this.setState({
                  amountType: 'percentage',
                  amountPercentage: response.data.subcategory.percentage
               });
            }
         }

      }).catch((error) => {

      });

      axios({
         url: `${BASE_URL}/customer/view/profile`,
         method: 'POST',
         headers: {
            Authorization: "Bearer " + this.state.token,
         },
      }).then(response => {
         if(response.data.status === 'success'){
           
            this.setState({
               userName: response.data.data.user.name,
               email: response.data.data.user.email,
               phone: response.data.data.user.phone,
            });
         }
      }).catch((error) => {

      });

      axios({
         method: 'POST',
         url: `${BASE_URL}/customer/get/state`,
         data:{
            country: localStorage.getItem('country_id') ? localStorage.getItem('country_id') : 0,
         }
      }).then(response => {

         if(response.data.status == 'success'){
            this.setState({
               country_id: localStorage.getItem('country_id') ? localStorage.getItem('country_id') : 0,
               state: response.data.state,
            });
         }

      }).catch((error) => {
         this.setState({
            loaderStatus: false,
         });
      });

   }

   perviewModal = () => {
      axios({
         url: `${BASE_URL}/customer/get/country`,
         method: 'POST',
      }).then(response => {

         if(response.data.status === 'success'){

            response.data.country.forEach(country => {

               if(country.id == this.state.country_id){
                  this.setState({
                     countryText: country.name,
                  });
               }
            });
         }

      }).catch((error) => {

      });

      axios({
         url: `${BASE_URL}/customer/get/state`,
         method: 'POST',
         data: {
            country: this.state.country_id,
         }
      }).then(response => {

         if(response.data.status === 'success'){
            response.data.state.forEach(state => {
               if(state.id == this.state.state_id){

                  this.setState({
                     stateText: state.name,
                  });
               }
            });
         }

      }).catch((error) => {

      });

      axios({
         url: `${BASE_URL}/customer/get/city`,
         method: 'POST',
         data: {
            state: this.state.state_id,
         }
      }).then(response => {
         if( response.data.status === 'success'){
            if( response.data.city ){

               response.data.city.forEach(city => {
                  
                  if(city.id == this.state.city_id){
                     this.setState({
                        cityText: city.name,
                     });
                  }

               });
            }
         }
      });

      if(this.state.category == 1){

         axios({
            url: `${BASE_URL}/customer/get/make`,
            method: 'POST',
            headers:{ Authorization: "Bearer " + this.state.token },

        }).then(response => {

            if(response.data.status == 'success'){
               response.data.make.forEach(make => {
                  if(make.id == this.state.make_id){
                     this.setState({
                        makeText: make.name,
                    });
                  }
               });
                
            }

        }).catch((error) => {

        });

         axios({
            url: `${BASE_URL}/customer/get/model`,
            method: 'POST',
            headers: { Authorization: 'Bearer ' + this.state.token },
            data: {
               make_id: this.state.make_id,
            }
         }).then(response => {

               if(response.data.status === 'success'){
                  response.data.model.forEach(model => {
                     if(model.id == this.state.model_id){
                        this.setState({
                           modelText: model.name,
                        });
                     }
                  });
               }

         }).catch((error) => {
               
         });

         axios({
            url: `${BASE_URL}/customer/get/variant`,
            method: 'POST',
            headers: { Authorization: 'Bearer ' + this.state.token },
            data: {
                model_id: this.state.model_id,
            }
         }).then(response => {
            if(response.data.status === 'success'){

               response.data.variant.forEach(variant => {
                  if(variant.id == this.state.variant_id){
                     this.setState({
                        variantText: variant.name,
                     });
                  }
               });
               
             }

         }).catch((error) => {

         });

      }

      this.setState({
         perviewModal: !this.state.perviewModal,
      });
   }


   countryChange = (id) => {
      
      axios({
          method:'POST',
          url:`${BASE_URL}/get/currency`,
          data:{
              country: id,
          }
      }).then(response => {

         if(response.data.status == 'success'){
          //  console.log(response.data);
            this.setState({
               currency: response.data.currency.currency_code,
               usdVal:  response.data.usdval,
            });
         }

      }).catch((error) => {
         this.setState({
            loaderStatus: false,
         });
      });
      axios({
         method: 'POST',
         url: `${BASE_URL}/customer/get/state`,
         data:{
            country: id,
         }
      }).then(response => {

         if(response.data.status == 'success'){
            this.setState({
               country_id: id,
               state: response.data.state,
            });
         }

      }).catch((error) => {
         this.setState({
            loaderStatus: false,
         });
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
         this.setState({
            loaderStatus: false,
         });
      });
   }

   cityChange = (id) => {

      this.setState({
         city_id: id,
      });
   }


   handleChange = (name, value) => {

      if(name === 'title' ){

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

      // if(name === 'title' && value === ''){
         
      //    this.setState({
      //       errors_title: 'Title cannot be blank',
      //    });
      // }
      // else{
      //    this.setState({
      //       errors_title: '',
      //    })
      // }
      if(name === 'price' && value === ''){
         this.setState({
            errors_price: 'Price cannot be blank',
         });
      }
      else if(name === 'price'){
         if(value.match(/^\d+(?:[.,]\d+)*$/)){
            this.setState({
               errors_price: '',
            });
         }
         else{
            this.setState({
               errors_price: 'Must be numbers',
            });
         }
      }
      // if(name === 'description' && value === ''){
         
      //    this.setState({
      //       errors_description: 'Description cannot be blank',
      //    });
      // }
      // else{
      //    this.setState({
      //       errors_description: '',
      //    });
      // }
      if((name === 'email' && value === '')){
         this.setState({
            errors_email: 'Email cannot be blank',
         });
      }
      else if(name === 'email'){

         if(!value.match( /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){

            this.setState({
               errors_email: 'Must be an email',
            });
         }
         else{
            this.setState({
               errors_email: '',
            });
         }
      }
      if(name === 'userName' && value === ''){
         this.setState({
            errors_userName: 'Name cannot be blank',
         });
      }
      else{
         this.setState({
            errors_userName: '',
         });
      }
      if(name === 'phone' && value === ''){
         this.setState({
            errors_phone: 'Phone cannot be blank',
         });
      }
      else{
         this.setState({
            errors_phone: '',
         });
      }
      if(name === 'address' && value === ''){
         this.setState({
            errors_address: 'Address cannot be blank',
         });
      }
      else{
         this.setState({
            errors_address: '',
         });
      }
   }

   onSelectItem=(selectedList, selectedItem)=> {
      // console.log(this.state.multiSelectVal,this.selectedList);
      this.setState({
         multiSelectVal: selectedList
      });
      // console.log(selectedList);

  }

  onRemove=(selectedList, removedItem) => {
   this.setState({
      multiSelectVal: selectedList
   });
//   console.log(selectedList);

}

   checkboxChange = (name, value) => {
      this.setState({
         [name]: value,
      });
   }

   motorChanges = (motor) => {

         this.setState({
            motor: motor,
            make_id: motor.make_id,
            model_id: motor.model_id,
            variant_id: motor.variant_id,
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

   paymentIdGet = (paymentId) => {
      
      this.setState({
         paymentId: paymentId,
      });

      this.adSubmitHandler();
   }

   pageUpdate = () => {

      let state = this.state;

      if(state.formPage == 1){

         if((state.title || state.titleinArabic) && state.image && state.price && (state.description || state.descriptioninArabic) && state.country_id && state.state_id){
            window.scrollTo(0, 0);

            this.setState({
               formPage: this.state.formPage + 1,
            });

            if(state.featured == true){

               if(state.amountType === 'flat'){
                  localStorage.removeItem('newAmount');
                  localStorage.setItem('newAmount', (state.multiSelectVal.length *(state.currency_value * state.amountPercentage)));
               }
               else{
                  let amount = state.multiSelectVal.length * ((state.price * this.state.currency_value).toFixed(0)) * (state.amountPercentage / 100);

                  localStorage.removeItem('newAmount');
                  localStorage.setItem('newAmount', amount.toFixed(2));
               }
            }
         }
         else{
            
            if((state.title === '' || state.title.trim() === '') && (state.titleinArabic === '' || state.titleinArabic.trim() === '')){
               
               this.setState({
                  errors_title: 'Enter title any one of the language',
               });
            }
            else{
               this.setState({
                  errors_title: '',
               });
            }
            if(state.image === '' || state.image.length == 0){

               let image = 'Image cannot be blank';

               this.setState({
                  errors_image: image,
               });
            }
            else{
               this.setState({
                  errors_image: '',
               });
            }
            if(state.price === '' || state.price.trim() === ''){

               let price = 'Price cannot be blank';
               this.setState({
                  errors_price: price,
               });
               
            }
            else{
               if(state.price.match(/^\d+(?:[.,]\d+)*$/)){
                  this.setState({
                     errors_price: '',
                  });
               }
               else{
                  let price = 'Must be numbers';
                  this.setState({
                     errors_price: price,
                  });
               }
            }
            if(((state.description === '' || state.description.trim() === '')) && ((state.descriptioninArabic === '' || state.descriptioninArabic.trim() === ''))){

               let description = 'Enter description in any one of the language';
               this.setState({
                  errors_description: description,
               });
            }
            else{
               this.setState({
                  errors_description: '',
               });
            }
            if(this.checkEmpty(state.country_id)){

               let country_id = 'Country cannot be blank';
               this.setState({
                  errors_country_id: country_id,
               });
            }
            else{
               this.setState({
                  errors_country_id: '',
               });
            }
            if(this.checkEmpty(state.state_id)){

               let state_id = 'State cannot be blank';
               this.setState({
                  errors_state_id: state_id,
               });
            }
            else{
               this.setState({
                  errors_state_id: '',
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
               if(this.checkEmpty(state.make_id)){
                  let make_id = 'Make cannot be blank';
                  this.setState({
                     errors_make_id: make_id,
                  });
               }
               if(this.checkEmpty(state.model_id)){
                  let model_id = 'Model cannot be blank';
                  this.setState({
                     errors_model_id: model_id,
                  });
               }
               // if(this.checkEmpty(state.variant_id)){
               //    let variant_id = 'Variant cannot be blank';
               //    this.setState({
               //       errors_variant_id: variant_id,
               //    });
               // }
               if(this.checkEmpty(state.registration_year)){
                  let registation = 'Registered year cannot be blank';
                  this.setState({
                     errors_registration_year: registation,
                  });
               }
               if(this.checkEmpty(state.fuel)){
                  let fuel = 'Fuel type cannot be blank';
                  this.setState({
                     errors_fuel: fuel,
                  });
               }
               if(this.checkEmpty(state.transmission)){
                  let transmission = 'Transmission cannot be blank';
                  this.setState({
                     errors_transmission: transmission,
                  });
               }
               if(this.checkEmpty(state.condition)){
                  let condition = 'Condition cannot be blank';
                  this.setState({
                     errors_condition: condition,
                  });
               }
               if(this.checkEmpty(state.mileage)){
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
               if(this.checkEmpty(state.size)){
                  let size = 'Size cannot be blank';
                  this.setState({
                     errors_size: size,
                  });
               }
               if(this.checkEmpty(state.room)){
                  let room = 'Room cannot be blank';
                  this.setState({
                     errors_room: room,
                  });
               }
               if(this.checkEmpty(state.furnished)){
                  let furnished = 'Furnished cannot be blank';
                  this.setState({
                     errors_furnished: furnished,
                  });
               }
               if(this.checkEmpty(state.building)){
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

         errors_title: '',
         errors_image: '',
         errors_price: '',
         errors_description: '',
         errors_country_id: '',
         errors_state_id: '',
         errors_city_id: '',

         errors_make_id: '',
         errors_model_id: '',
         errors_variant_id: '',
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

      });
   }

   fieldValues = (values) => {
      
      this.setState({
         fieldValue: values,
      });
   }

   eventChange = (e) => {

      this.setState({
         termsCondition: e.target.checked,
      });
   }

   fileUpload = (file) => {
      
      if(file.length === 0){
         this.setState({
            errors_image: 'Image cannot be blank',
         });
      }
      else{
         
         if(this.state.image.length < 5){

            const imagefile = {
               id: Math.random(),
               file: file,
            };

            this.setState({
               image: [...this.state.image, imagefile],
            });
         }
      }
   }

   adSubmitHandler = () => {
      
      let state = this.state;

     // console.log(this.state.aircondition, this.state.gps, this.state.security, this.state.tire,)
      
      if(this.state.userName !== '' && this.state.email !== '' && this.state.latitude !== '' && this.state.longitude !== '' && this.state.phone !== '' && this.state.address !== '' && this.state.termsCondition == true){
         
         this.setState({
            loaderStatus: true,
            submitStatus: true,
         });

         if(state.featured){

            if(state.paymentMethod !== ''){

               if(state.paymentMethod === 'stripe'){

                  if(localStorage.getItem('new_payment_id') !== ''){

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
                           titleinArabic: this.state.titleinArabic,
                           canonical_name: this.state.canonicalName,
                           description: this.state.description,
                           descriptioninArabic: this.state.descriptioninArabic,
                           price: (this.state.price * this.state.usdVal).toFixed(2),
                           featured: this.state.featured,
                           negotiable: this.state.negotiable,
                           country: this.state.country_id,
                           state: this.state.state_id,
                           city: this.state.city_id,
                           area: this.state.area,
                           sub_area: this.state.sub_area,
                           sub_area2: this.state.sub_area2,
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
                           variant_id: this.state.variant_id,
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
                           paymentMethod: this.state.paymentMethod,
                           paymentId: this.state.paymentId,
                           adsCountry: this.state.multiSelectVal,
                        }
            
                     }).then(response => {
                        
                        if(response.data.status == 'success'){
                           
                           Swal.fire({
                              title: 'success!',
                              text: response.data.message,
                              icon: 'success',
                              confirmButtonText: 'OK'
                           }).then((result) => {
                              this.props.history.push(`/adsdetails/${response.data.ad_id}`);
                           });
            
                        }
            
                        this.setState({
                           loaderStatus: false,
                           submitStatus: false,
                        });
            
                     }).catch((error) => {
                        this.setState({
                           loaderStatus: false,
                           submitStatus: false,
                        });
            
                     });
                  }
                  else{

                     Swal.fire({
                        title: 'Warning!',
                        icon: 'warning',
                        text: 'Please ensure yor payment is done',
                        confirmButtonText: 'OK'
                     });

                     this.setState({
                        loaderStatus: false,
                        submitStatus: false,
                     });
                  }
               }
               else{

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
                        titleinArabic: this.state.titleinArabic,
                        canonical_name: this.state.canonicalName,
                        description: this.state.description,
                        descriptioninArabic: this.state.descriptioninArabic,
                        price: (this.state.price * this.state.usdVal).toFixed(2),
                        featured: this.state.featured,
                        negotiable: this.state.negotiable,
                        country: this.state.country_id,
                        state: this.state.state_id,
                        city: this.state.city_id,
                        area: this.state.area,
                        sub_area: this.state.sub_area,
                        sub_area2: this.state.sub_area2,
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
                        variant_id: this.state.variant_id,
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
                        paymentMethod: this.state.paymentMethod,
                        paymentId: this.state.paymentId,
                        adsCountry: this.state.multiSelectVal,
                     }
         
                  }).then(response => {
                     
                     if(response.data.status == 'success'){
                        
                        Swal.fire({
                           title: 'success!',
                           text: response.data.message,
                           icon: 'success',
                           confirmButtonText: 'OK'
                        }).then((result) => {
                           this.props.history.push(`/adsdetails/${response.data.ad_id}`);
                        });
         
                     }
         
                     this.setState({
                        loaderStatus: false,
                        submitStatus: false,
                     });
         
                  }).catch((error) => {
         
                     this.setState({
                        loaderStatus: false,
                        submitStatus: false,
                     });
         
                  });
               }
            }
            else{

               Swal.fire({
                  title: 'Warning!',
                  icon: 'warning',
                  text: 'Please select a payment method',
                  confirmButtonText: 'OK'
               });

               this.setState({
                  loaderStatus: false,
                  submitStatus: false,
               });
            }
         }
         else{
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
                  titleinArabic: this.state.titleinArabic,
                  canonical_name: this.state.canonicalName,
                  description: this.state.description,
                  descriptioninArabic: this.state.descriptioninArabic,
                  price: (this.state.price * this.state.usdVal).toFixed(2),
                  featured: this.state.featured,
                  negotiable: this.state.negotiable,
                  country: this.state.country_id,
                  state: this.state.state_id,
                  city: this.state.city_id,
                  area: this.state.area,
                  sub_area: this.state.sub_area,
                  sub_area2: this.state.sub_area2,
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
                  variant_id: this.state.variant_id,
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
                  paymentMethod: this.state.paymentMethod,
                  paymentId: this.state.paymentId,
                  adsCountry: this.state.multiSelectVal,
                  amount:localStorage.getItem('newAmount'),

               }

            }).then(response => {
               
               if(response.data.status == 'success'){
                  
                  Swal.fire({
                     title: 'success!',
                     text: response.data.message,
                     icon: 'success',
                     confirmButtonText: 'OK'
                  }).then((result) => {
                     this.props.history.push(`/adsdetails/${response.data.ad_id}`);
                  });

               }

               localStorage.removeItem('new_payment_id');

               this.setState({
                  loaderStatus: false,
                  submitStatus: false,
               });

            }).catch((error) => {

               localStorage.removeItem('new_payment_id');

               this.setState({
                  loaderStatus: false,
                  submitStatus: false,
               });

            });
         }
      }
      else{
         
         if(this.checkEmpty(state.userName)){
            let userName = 'Name cannot be blank';
            this.setState({
               errors_userName: userName,
            });
         }
         if(this.checkEmpty(state.email)){
            let email = 'Email cannot be blank';
            window.scrollTo(0, 500);
            this.setState({
               errors_email: email,
            });
         }
         else{
            if(!state.email.match( /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
               let email = 'Must be an email';
               window.scrollTo(0, 500);
               this.setState({
                  errors_email: email,
               });
            }
         }
         if(this.checkEmpty(state.latitude)|| this.checkEmpty(state.longitude)){
            let latitude = 'Please mark a point in maps';
            this.setState({
               errors_latitude: latitude,
            });
         }
         if(this.checkEmpty(state.phone)){
            let phone = 'Phone cannot be blank';
            window.scrollTo(0, 500);
            this.setState({
               errors_phone: phone,
            });
         }
         if(this.checkEmpty(state.address)){
            let address = 'Address cannot be blank';
            window.scrollTo(0, 500);
            this.setState({
               errors_address: address,
            });
         }
         if(state.termsCondition == false){
            let termsCondition = 'This field required';
            this.setState({
               errors_terms: termsCondition,
            });
         }
      }
   }

   showPhone = () => {

      this.setState({
         phoneHide: !this.state.phoneHide,
      });
   }

   latLngChange = (latitude, longitude) => {
      
      this.setState({
         latitude: latitude,
         longitude: longitude,
      });
   }

   paymentMethod = (method) => {

      this.setState({
         paymentMethod: method,
      });
   }

   removeImage = key => {
      
      const images = [...this.state.image];

      const updateImage = images.filter(item => item.id !== key );

      this.setState({
         image: updateImage,
      });
   }

    render() {
      
      let {category, subcategory, categoryField, master, master_id, option, country, state,
         city, categoryName, subcategoryName, title, canonicalName, price, userName, email,
         description, phone, address,area,fieldValue,subArea,subArea2} = this.state;
      
      let loaderStatus = this.state.loaderStatus;
         
      let image = this.state.image;

      let ErrorStyle = {
         color: 'red',
      };

      let modalLogin ={
         position:  'fixed',
         width: '90vw',
         margin: 'auto',
         top: '40px',
         // left: 'calc(50% - 300px)',
         bottom: '40px',
         background:'#FFF',
      }

      let motor = this.state.motor;

         return (
            <div className="site-frame">
               {loaderStatus == true ? <Loader /> : ''}
               <>
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
                              {subcategoryName ? <li className="breadcrumb-item"><a>{subcategoryName}</a></li> : ''}
                           </ol>
                        </div>
                     </div>
                     <div className="row">
                        <div className="col-xl-5 col-lg-7 col-md-9 mx-auto">
                           <div className="create-ad-form">
                           {this.state.formPage == 1 ?
                              <>
                                 <TextField handleChange={this.handleChange} name="title" label="Title In English" value={title} placeholder="Title" readonly={false} error={this.state.errors_title} />
                                 <TextField handleChange={this.handleChange} name="titleinArabic" label="Title Arabic" value={this.state.titleinArabic} placeholder="Title Arabic" readonly={false} error={this.state.errors_title} />
                                 <TextField handleChange={this.handleChange} name="canonicalName" label="Canonical Name" value={canonicalName} placeholder="Canonical Name" readonly={true} />
                                 <FileField fileUpload={this.fileUpload} placeholder="Add Pictures" multiple={true} error={this.state.errors_image} />
                                 <span style={{color: 'red'}}><strong>Warning: </strong>Maximum of 5 images are allowed!</span>
                                 <div className="row">
                                 {image ? image && image.map((image, index) => {
                                    return (
                                       <div className="col-md-4" style={{position:'relative'}}>
                                          <img src={image.file} key={index} alt='image' style={{maxWidth:'150px', minWidth:'150px', maxHeight:'150px', minHeight:'150px', margin:'10px'}} />
                                          <span className="img-dlt"><button className="btn btn-danger" onClick={() => this.removeImage(image.id)}><i className="fa fa-trash"></i></button></span>
                                       </div>
                                    )
                                 }) : ''}
                                 </div>
                                 <SelectField placeholder="Country" option={country} selected={this.state.country_id} label="Country" optionChange={this.countryChange} type="common" error={this.state.errors_country_id} />
                                 <TextField handleChange={this.handleChange} name="price" label={ categoryName == 'Jobs'?(`Salary (${this.state.currency})`) : (`Price (${this.state.currency})`) } value={price} placeholder={categoryName == 'Jobs'?(`Salary (${this.state.currency})`) : (`Price (${this.state.currency})`)} readonly={false} error={this.state.errors_price} />
                                 <p>{(price * this.state.usdVal).toFixed(2)} USD </p>
                                 <TextArea handleChange={this.handleChange} name="description" label="Description" value={description} placeholder={`Describe your ${subcategoryName}`} error={this.state.errors_description} />
                                 <TextArea handleChange={this.handleChange} name="descriptioninArabic" label="Description Arabic" value={this.state.descriptioninArabic} placeholder={`Describe your ${subcategoryName} in Arabic`} error={this.state.errors_description} />
                                
                                 <SelectField placeholder="State" option={state} selected={this.state.state_id} label="State" optionChange={this.statesChange} type="common" error={this.state.errors_state_id} />
                                 <SelectField placeholder="City" option={city} selected={this.state.city_id} label="City" optionChange={this.cityChange} type="common" />
                                 
                                 <TextField  handleChange={this.handleChange} name="area" label="Area" value={area} placeholder="Area" readonly={false} error={this.state.errors_area} />
                                 <TextField  handleChange={this.handleChange} name="sub_area" label="Sub area" value={subArea} placeholder="sub area" readonly={false} />
                                 <TextField  handleChange={this.handleChange} name="sub_area2" label="Sub area2" value={subArea2} placeholder="sub area2" readonly={false} />

                                 <label>Add View Countries</label>
                                 <Multiselect
                                    options={this.state.countryOptions} // Options to display in the dropdown
                                    selectedValues={this.state.multiSelectVal} // Preselected value to persist in dropdown
                                    onSelect={this.onSelectItem} // Function will trigger on select event
                                    onRemove={this.onRemove } // Function will trigger on remove event
                                    displayValue="name" // Property name to display in the dropdown options
                                    placeholder="Select Countries"
                                    name="show_countries"
                                    />
                                    
                                    { categoryName == 'Jobs'? '' : 
                                 <Checkbox checkboxChange={this.checkboxChange} checkStatus={this.state.negotiable} name="negotiable" label="Price Negotiable" />}
                                 {this.state.featutred_set==2 ? 
                                  <Checkbox checkboxChange={this.checkboxChange} checkStatus={this.state.featured} name="featured" label="Featured" />
                                 :''}
                                 
                                 <div className="form-group">
                                    <button onClick={this.pageUpdate} className="btn btn-primary btn-block">Next</button>
                                 </div>
                              </>
                              : 
                              this.state.formPage == 2 && category == 1 ?  
                              <>
                                 
                                 <MotorCreate motorList={motor} motorEvents={this.motorChanges} errors={this.state} /> 
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
                                 
                                 <PropertyCreate  parentState={this.state} propertyEvent={this.propertyChange} errors={this.state} />
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
                                 
                                 <PropertyCreate  parentState={this.state} propertyEvent={this.propertyChange} errors={this.state} />
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
                                    
                                    <CustomField customValue={fieldValue} fieldValues={this.fieldValues} categoryField={categoryField} />
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
                                    
                                    <CustomField customValue={fieldValue} fieldValues={this.fieldValues} categoryField={categoryField} />
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

                                 <TextField handleChange={this.handleChange} name="userName" label="Name" value={userName} placeholder="Name" readonly={false} error={this.state.errors_userName} />
                                 <TextField handleChange={this.handleChange} name="email" label="Email" value={email} placeholder="Email" readonly={false} error={this.state.errors_email} />
                                 <Number handleChange={this.handleChange} name="phone" label="Phone" value={phone} placeholder="Phone" error={this.state.errors_phone} />
                                 <TextArea handleChange={this.handleChange} name="address" label="Address" value={address} placeholder="Address" error={this.state.errors_address} />
                                 <Checkbox checkboxChange={this.checkboxChange} checkStatus={this.state.phoneHide} name="phoneHide" label="Phone Hide" />

                                 <hr />
                                 <LocationPicker changeLatLng={this.latLngChange} subcategoryName={subcategoryName} error={this.state.errors_latitude} />

                                 <div class="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" name="termsCondition" onChange={(e) => this.eventChange(e)} className="custom-control-input" id="termsCondition" />
                                    <label class="custom-control-label font-weight-normal" for="termsCondition" >Accept <Link to="/terms/conditions" target="_blank">Terms &amp; Condition</Link> </label>
                                    {this.state.errors_terms !== '' ? <p className="help-block help-block-error"  style={ErrorStyle}>{this.state.errors_terms}</p> : '' }
                                 </div>

                                 {this.state.featured ? <FeaturedPayment paymentMethod={this.paymentMethod} /> : ''}

                                 {this.state.paymentMethod === 'stripe' ? <InjectedCheckoutForm paymentIdGet={this.paymentIdGet} /> : '' }

                                 <h5 style={{cursor:'pointer'}} onClick={() => this.perviewModal()}><span class="badge badge-secondary">View Preview</span></h5>

                                 <div className="row mt-4">
                                    <div className="form-group col-md-6">
                                       <button onClick={this.pageUpdateDown} className="btn btn-primary btn-block">Back</button>
                                    </div>
                                    {this.state.submitStatus == true ? 
                                          <div className="form-group col-md-6">
                                             <button className="btn btn-primary btn-block" disabled>
                                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Loading...
                                             </button>
                                          </div> :
                                       this.state.featured ? this.state.paymentMethod === 'stripe' ?

                                          this.state.paymentId !== '' ?

                                          <div className="form-group col-md-6">
                                             <button onClick={this.adSubmitHandler} className="btn btn-primary btn-block">Create</button>
                                          </div>

                                       :
                                          <div className="form-group col-md-6">
                                             <button className="btn btn-primary btn-block" disabled>
                                                {/* <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Loading... */}
                                                Create
                                             </button>
                                          </div>
                                       :
                                       <div className="form-group col-md-6">
                                          <button onClick={this.adSubmitHandler} className="btn btn-primary btn-block">Create</button>
                                       </div> : 
                                       <div className="form-group col-md-6">
                                          <button onClick={this.adSubmitHandler} className="btn btn-primary btn-block">Create</button>
                                       </div>
                                       } 
                                 </div>
                              </>
                              : this.state.formPage == 3 && (category == 1 || category == 2 || category == 3 ) && categoryField.length != 0 ? 
                                 <>
                                    
                                    <CustomField customValue={fieldValue} fieldValues={this.fieldValues} categoryField={categoryField} />
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

                                 <TextField handleChange={this.handleChange} name="userName" label="Name" value={userName} placeholder="Name" readonly={false} error={this.state.errors_userName} />
                                 <TextField handleChange={this.handleChange} name="email" label="Email" value={email} placeholder="Email" readonly={false} error={this.state.errors_email} />
                                 <Number handleChange={this.handleChange} name="phone" label="Phone" value={phone} placeholder="Phone" error={this.state.errors_phone} />
                                 <TextArea handleChange={this.handleChange} name="address" label="Address" value={address} placeholder="Address" error={this.state.errors_address} />
                                 <Checkbox checkboxChange={this.checkboxChange} checkStatus={this.state.phoneHide} name="phoneHide" label="Phone Hide" />
                                 
                                 <hr />
                                 <LocationPicker changeLatLng={this.latLngChange} subcategoryName={subcategoryName} error={this.state.errors_latitude} />
                                 
                                 <div class="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" name="termsCondition" onChange={(e) => this.eventChange(e)} className="custom-control-input" id="termsCondition" />
                                    <label class="custom-control-label font-weight-normal" for="termsCondition" >Accept <Link to="/terms/conditions" target="_blank">Terms &amp; Condition</Link> </label>
                                    {this.state.errors_terms !== '' ? <p className="help-block help-block-error"  style={ErrorStyle}>{this.state.errors_terms}</p> : '' }
                                 </div>

                                 {this.state.featured ? <FeaturedPayment paymentMethod={this.paymentMethod} /> : ''}

                                 {this.state.paymentMethod === 'stripe' ? <InjectedCheckoutForm paymentIdGet={this.paymentIdGet} /> : '' }

                                 <h5 style={{cursor:'pointer'}} onClick={() => this.perviewModal()}><span class="badge badge-secondary">View Preview</span></h5>

                                 <div className="row mt-4">
                                    <div className="form-group col-md-6">
                                       <button type="button" onClick={this.pageUpdateDown} className="btn btn-primary btn-block">Back</button>
                                    </div>
                                    {this.state.submitStatus == true ? 
                                    <div className="form-group col-md-6">
                                    <button className="btn btn-primary btn-block" disabled>
                                       {/* <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                       Loading... */}
                                       Create
                                    </button>
                                 </div>:
                                    this.state.featured ? this.state.paymentMethod === 'stripe' ?

                                       this.state.paymentId !== '' ?

                                       <div className="form-group col-md-6">
                                          <button onClick={this.adSubmitHandler} className="btn btn-primary btn-block">Create</button>
                                       </div>

                                    :
                                    <div className="form-group col-md-6">
                                       <button className="btn btn-primary btn-block" disabled>
                                          {/* <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                          Loading... */}
                                          Create
                                       </button>
                                    </div>
                                    :
                                    <div className="form-group col-md-6">
                                       <button onClick={this.adSubmitHandler} className="btn btn-primary btn-block">Create</button>
                                    </div> : 
                                    <div className="form-group col-md-6">
                                       <button onClick={this.adSubmitHandler} className="btn btn-primary btn-block">Create</button>
                                    </div>
                                    }
                                 </div>
                              </> :
                              // : this.state.formPage == 3 && categoryField.length != 0 ?
                              //    <>
                                    
                              //       <CustomField customValue={fieldValue} fieldValues={this.fieldValues} categoryField={categoryField} />
                              //       <div className="row">
                              //          <div className="form-group col-md-6">
                              //             <button onClick={this.pageUpdateDown} className="btn btn-primary btn-block">Back</button>
                              //          </div>
                              //          <div className="form-group col-md-6">
                              //             <button onClick={this.pageUpdate} className="btn btn-primary btn-block">Next</button>
                              //          </div>
                              //       </div>
                              //    </>
                              // : this.state.formPage == 3 && categoryField.length == 0 ? 
                              <>
                                 
                                 <h4>Seller Information</h4>
                                 <hr />

                                 <TextField handleChange={this.handleChange} name="userName" label="Name" value={userName} placeholder="Name" readonly={false} error={this.state.errors_userName} />
                                 <TextField handleChange={this.handleChange} name="email" label="Email" value={email} placeholder="Email" readonly={false} error={this.state.errors_email} />
                                 <Number handleChange={this.handleChange} name="phone" label="Phone" value={phone} placeholder="Phone" error={this.state.errors_phone} />
                                 <TextArea handleChange={this.handleChange} name="address" label="Address" value={address} placeholder="Address" error={this.state.errors_address} />
                                 <Checkbox checkboxChange={this.checkboxChange} checkStatus={this.state.phoneHide} name="phoneHide" label="Phone Hide" />
                                 
                                 <hr />
                                 <LocationPicker changeLatLng={this.latLngChange} subcategoryName={subcategoryName} error={this.state.errors_latitude} />

                                 <div class="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" name="termsCondition" onChange={(e) => this.eventChange(e)} className="custom-control-input" id="termsCondition" />
                                    <label class="custom-control-label font-weight-normal" for="termsCondition" >Accept <Link to="/terms/conditions" target="_blank">Terms &amp; Condition</Link> </label>
                                    {this.state.errors_terms !== '' ? <p className="help-block help-block-error"  style={ErrorStyle}>{this.state.errors_terms}</p> : '' }
                                 </div>

                                 {this.state.featured ? <FeaturedPayment paymentMethod={this.paymentMethod} /> : ''}

                                 {this.state.paymentMethod === 'stripe' ? <InjectedCheckoutForm paymentIdGet={this.paymentIdGet} /> : '' }

                                 <h5 style={{cursor:'pointer'}} onClick={() => this.perviewModal()}><span class="badge badge-secondary">View Preview</span></h5>

                                 <div className="row mt-4">
                                    <div className="form-group col-md-6">
                                       <button onClick={this.pageUpdateDown} className="btn btn-primary btn-block">Back</button>
                                    </div>
                                    {this.state.submitStatus == true ?
                                    <div className="form-group col-md-6">
                                       <button className="btn btn-primary btn-block" disabled>
                                          {/* <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                          Loading... */}
                                          Create
                                       </button>
                                    </div>
                                    :
                                    this.state.featured ? this.state.paymentMethod === 'stripe' ?

                                       this.state.paymentId !== '' ?

                                       <div className="form-group col-md-6">
                                          <button onClick={this.adSubmitHandler} className="btn btn-primary btn-block">Create</button>
                                       </div>

                                    :
                                    <div className="form-group col-md-6">
                                       <button className="btn btn-primary btn-block" disabled>
                                          {/* <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                          Loading... */}
                                          Create
                                       </button>
                                    </div>
                                    :
                                    <div className="form-group col-md-6">
                                       <button onClick={this.adSubmitHandler} className="btn btn-primary btn-block">Create</button>
                                    </div> : 
                                    <div className="form-group col-md-6">
                                       <button onClick={this.adSubmitHandler} className="btn btn-primary btn-block">Create</button>
                                    </div>
                                    }
                                 </div>
                              </>
                              // : <>
                              //       <h4>Seller Information</h4>
                              //       <hr />

                              //       <TextField handleChange={this.handleChange} name="userName" label="Name" value={userName} placeholder="Name" readonly={false} error={this.state.errors_userName} />
                              //       <TextField handleChange={this.handleChange} name="email" label="Email" value={email} placeholder="Email" readonly={false} error={this.state.errors_email} />
                              //       <Number handleChange={this.handleChange} name="phone" label="Phone" value={phone} placeholder="Phone" error={this.state.errors_phone} />
                              //       <TextArea handleChange={this.handleChange} name="address" label="Address" value={address} placeholder="Address" error={this.state.errors_address} />
                              //       <Checkbox checkboxChange={this.checkboxChange} name="phoneHide" label="Phone Hide" />
                                    
                              //       <hr />
                              //       <LocationPicker changeLatLng={this.latLngChange} subcategoryName={subcategoryName} error={this.state.errors_latitude} />

                              //       {this.state.featured ? <FeaturedPayment paymentMethod={this.paymentMethod} /> : ''}

                              //       {this.state.paymentMethod === 'stripe' ? <InjectedCheckoutForm /> : '' }

                              //       <div className="row mt-4">
                              //          <div className="form-group col-md-6">
                              //             <button onClick={this.pageUpdateDown} className="btn btn-primary btn-block">Back</button>
                              //          </div>
                              //          <div className="form-group col-md-6">
                              //             <button onClick={this.adSubmitHandler} className="btn btn-primary btn-block">Create</button>
                              //          </div>
                              //       </div>
                              //    </>
                              }
                           </div>
                        </div>
                     </div>
                  </div>
               </section>
               </div>

                  <AppDownload/>
                  <Footer/>
               </>

               <Modal className="modal fade log-sign-modal preview-modal" show={this.state.perviewModal}  style={modalLogin} id="perviewModal" tabindex="-1" aria-labelledby="perviewModalLabel" aria-hidden="true">
                                
                  <Modal.Body>
                      <button  onClick={ this.perviewModal } style={{}} type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </button>

                      <div>
                            <section className="section-single-main pt-3">
                                <div className="container">
                                    <div className="row row-product-main">
                                        <div className="col-xl-7 col-product-gallery">
                                            <div className="product-gallery-main">
                                            <div className="row flex-row-reverse">
                                                <div className="col-md-10">
                                                    <div className="product-gallery-xl">
                                                        <img src={this.state.mainImage ? this.state.mainImage : this.state.image.length !== 0 ? this.state.image[0].file: ''} alt="media" />
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                    <ul className="product-gallery-sm">
                                                        {this.state.image ? this.state.image.map((image, index) => {
                                                            return <li key={index} onClick={() => this.setState({mainImage: image.file})}><img src={image.file} alt="media" /></li>
                                                        }) : <li><img src={this.state.defaultImage} alt="media" /></li>}
                                                        
                                                        
                                                    </ul>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-5 col-product-info">
                                            <div className="product-info d-flex align-items-center h-100">
                                            <div className="w-100">
                                                <h3 className="product-title">{this.state.title}</h3>
                                                <p className="product-desc">{this.state.description.substring(0, 250)}</p>
                                                <div className="product-price font-weight-bold text-brand">{this.state.currency} {this.state.price}</div>
                                                <ul className="product-meta">

                                                    {this.state.category == 1 ? <MotorProperty make={this.state.makeText} year={this.state.registration_year} fuel={this.state.fuel} />
                                                    : this.state.category == 2 ? <PropertyForRendProperty room={this.state.room} property_type={this.state.building} size={this.state.size} furnished={this.state.furnished} />
                                                    : this.state.category == 3 ? <PropertyForRendProperty room={this.state.room} property_type={this.state.building} size={this.state.size} furnished={this.state.furnished} />
                                                    : ''}
                                                    
                                                </ul>
                                                <div className="product-location">
                                                    <img src="assets/img/pdt-location.svg" alt="media" />
                                                    {this.state.countryText}, {this.state.stateText}, {this.state.cityText}
                                                </div>
                                                <div className="product-btn-group d-flex justify-content-between">
                                                    {this.state.phoneHide == false ? 
                                                    <a href="javascript:void(0);" onClick={this.showPhone} className="btn btn-primary has-icon d-block">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                                        Show Phone Number
                                                    </a>
                                                    :
                                                    <a href="javascript:void(0);" className="btn btn-primary has-icon d-block">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                                        Show Phone Number
                                                    </a>
                                                     }
                                                    
                                                    <a href="javascript:void(0);" className="btn btn-dark has-icon d-block">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                                        Enquire Now
                                                    </a>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                              </section>

                              {this.state.featured && this.state.paymentMethod === 'account' ?
                                 <div className="mb-4 row text-danger container"><b className="col-md-1">Warning: </b> <span className="col-md-11">The Ad is approve only after submitting the proper payment documents</span></div>
                              : '' }
                              <section className="section-product-details">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12">
                                            <ul className="nav nav-pills product-tab-nav mb-3" id="pills-tab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <a className="nav-link active" id="pdttab1-tab" data-toggle="pill" href="#pdttab1" role="tab" aria-controls="pdttab1" aria-selected="true">Description</a>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <a className="nav-link" id="pdttab2-tab" data-toggle="pill" href="#pdttab2" role="tab" aria-controls="pdttab2" aria-selected="false">{this.state.category == 2 ? 'Amenities' : this.state.category == 3 ? 'Amenities' : 'More Details'}</a>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <a className="nav-link" id="pdttab3-tab" data-toggle="pill" href="#pdttab3" role="tab" aria-controls="pdttab3" aria-selected="false">{this.state.category == 1 ? 'Motor Info' : this.state.category == 2 ? 'Property Info' : this.state.category == 3 ? 'Property Info' : 'Info' }</a>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <a className="nav-link" id="pdttab4-tab" data-toggle="pill" href="#pdttab4" role="tab" aria-controls="pdttab4" aria-selected="false">Location</a>
                                            </li>
                                            </ul>
                                            <div className="tab-content product-tab-content" id="pills-tabContent">
                                            <div className="tab-pane fade show active" id="pdttab1" role="tabpanel" aria-labelledby="pdttab1-tab">
                                                <div className="pdt-tab-desc">
                                                    <p>{this.state.description}</p>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="pdttab2" role="tabpanel" aria-labelledby="pdttab2-tab">
                                                <div className="pdt-tab-list">
                                                   
                                                   { this.state.category == 1 ? 
                                                   
                                                   <>
                                                      <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong> Air Conditioner</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                         <div className="col-7">{this.state.aircondition ? 'Yes' : 'No' }</div>
                                                      </div>

                                                      <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong> GPS</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                         <div className="col-7">{this.state.gps ? 'Yes' : 'No' }</div>
                                                      </div>

                                                      <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong> Security System</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                         <div className="col-7">{this.state.security ? 'Yes' : 'No' }</div>
                                                      </div>

                                                      <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong> Spare Tire</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                         <div className="col-7">{this.state.tire ? 'Yes' : 'No' }</div>
                                                      </div>
                                                   </>

                                                   : ''}
                                                   <ul>

                                                      {/* {this.state.fieldValue.length > 0 ? this.state.fieldValue && this.state.fieldValue.map((customValue, index) => {
                                                         if(customValue.position != 'top'){
                                                               return <li key={index}>{customValue.value}</li>
                                                         }
                                                      }) : this.state.category == 1 ? '' : 'No data found!'} */}
                                                        
                                                   </ul>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="pdttab3" role="tabpanel" aria-labelledby="pdttab3-tab">
                                                <div className="pdt-tab-list">
                                                    <div className="row">
                                                        <div className="col-lg-8">

                                                        {this.state.category == 2 ? <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong>Furnished</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                            <div className="col-7">{this.state.furnished}</div>
                                                        </div> : ''}

                                                        {this.state.category == 3 ? <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong>Furnished</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                            <div className="col-7">{this.state.furnished}</div>
                                                        </div> : ''}

                                                        {this.state.category == 2 ? <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong> Apartment For</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                            <div className="col-7">Rent</div>
                                                        </div> : '' }

                                                        {this.state.category == 3 ? <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong> Apartment For</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                            <div className="col-7">Sale</div>
                                                        </div> : '' }

                                                        {this.state.category == 2 ? <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong> Rooms</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                            <div className="col-7">{this.state.room}</div>
                                                        </div> : '' }

                                                        {this.state.category == 3 ? <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong> Rooms</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                            <div className="col-7">{this.state.furnished}</div>
                                                        </div> : '' }

                                                        {this.state.category == 2 ? <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong> Size</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                            <div className="col-7">{this.state.size}</div>
                                                        </div> : '' }

                                                        {this.state.category == 3 ? <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong> Size</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                            <div className="col-7">{this.state.size}</div>
                                                        </div> : '' }

                                                        {this.state.category == 2 ? <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong> Building Type</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                            <div className="col-7">{this.state.building}</div>
                                                        </div> : '' }

                                                        {this.state.category == 3 ? <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong> Building Type</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                            <div className="col-7">{this.state.building}</div>
                                                        </div> : '' }

                                                        {this.state.category == 2 ? <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong> Parking</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                            <div className="col-7">{this.state.parking == 1 ? 'Yes' : 'NO'}</div>
                                                        </div> : '' }

                                                        {this.state.category == 3 ? <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong> Parking</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                            <div className="col-7">{this.state.parking == 1 ? 'Yes' : 'NO'}</div>
                                                        </div> : '' }

                                                        {this.state.category == 1 ?
                                                        <>
                                                            <div className="row mb-3 mb-md-4">
                                                                <div className="col-4"><strong> Make</strong></div>
                                                                <div className="col-1 text-center">:</div>
                                                                <div className="col-7">{this.state.makeText}</div>
                                                            </div>
                                                            <div className="row mb-3 mb-md-4">
                                                                <div className="col-4"><strong> Model</strong></div>
                                                                <div className="col-1 text-center">:</div>
                                                                <div className="col-7">{this.state.modelText}</div>
                                                            </div>
                                                            <div className="row mb-3 mb-md-4">
                                                                <div className="col-4"><strong> Variant</strong></div>
                                                                <div className="col-1 text-center">:</div>
                                                                <div className="col-7">{this.state.variantText}</div>
                                                            </div>
                                                            <div className="row mb-3 mb-md-4">
                                                                <div className="col-4"><strong> Registration Year</strong></div>
                                                                <div className="col-1 text-center">:</div>
                                                                <div className="col-7">{this.state.registration_year}</div>
                                                            </div>
                                                            <div className="row mb-3 mb-md-4">
                                                                <div className="col-4"><strong> Fuel</strong></div>
                                                                <div className="col-1 text-center">:</div>
                                                                <div className="col-7">{this.state.fuel}</div>
                                                            </div>
                                                            <div className="row mb-3 mb-md-4">
                                                                <div className="col-4"><strong> Transmission</strong></div>
                                                                <div className="col-1 text-center">:</div>
                                                                <div className="col-7">{this.state.transmission}</div>
                                                            </div>
                                                            <div className="row mb-3 mb-md-4">
                                                                <div className="col-4"><strong> Condition</strong></div>
                                                                <div className="col-1 text-center">:</div>
                                                                <div className="col-7">{this.state.condition}</div>
                                                            </div>
                                                            <div className="row mb-3 mb-md-4">
                                                                <div className="col-4"><strong> Milage</strong></div>
                                                                <div className="col-1 text-center">:</div>
                                                                <div className="col-7">{this.state.mileage}</div>
                                                            </div>
                                                        </>
                                                        
                                                        : '' }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="pdttab4" role="tabpanel" aria-labelledby="pdttab4-tab">
                                                <div className="pdt-tab-map">
                                                    <div className="map-location mb-3">{this.state.countryText}, {this.state.stateText}, {this.state.cityText}</div>
                                                    <div className="map-panel rounded-lg overflow-hidden">
                                                        <iframe src={`https://www.google.com/maps/embed/v1/place?q=${this.state.latitude},${this.state.longitude}&key=${GOOGLEMAPS_API}`} style={{border:0,}} allowfullscreen="" loading="lazy"></iframe>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                  </Modal.Body>
                                
               </Modal>

               <Modal className="modal fade log-sign-modal" show={this.state.phoneModalShow}  style={modalLogin} id="mobileModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                        
                        <Modal.Body>
                       
                                <button  onClick={() => this.showPhone('') }  type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                                <h5 className="modal-title text-center text-brand">Phone Number</h5>
                                <div className="modal-form text-center">
                                    
                                    <label>Name : {this.state.name}</label>
                                    <br />
                                    <a href={`tel:${this.state.phone}`}>{this.state.phone}</a>

                                </div>
                        </Modal.Body>
                        
                    </Modal>
                            
            </div>
            )
        }
    }
    export default CreateForm