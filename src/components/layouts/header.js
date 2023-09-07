import React, { Component } from 'react';
import CitySelect from '../common/citySelect';
import Menu from '../layouts/menu';
import Signup from '../login/signup';
import axios from 'axios';
import Logo from '../../../src/web-assets/img/brand.svg';
import { Button, Modal } from 'react-bootstrap';
import { BASE_URL, userToken, GOOGLEMAPS_API } from '../../projectString'; 
import { withRouter } from 'react-router';
import Swal from 'sweetalert2'
import Select from 'react-select';  
import makeAnimated from 'react-select/animated';  
import {
   BrowserRouter as Router,
   Link,
   Route // for later
 } from 'react-router-dom';

import Loader from '../Loader';
import GoogleTranslate from '../common/googleTranslate';
import MobileMenu from './MobileMenu';
const animatedComponents = makeAnimated(); 

class Header extends React.Component{

   constructor(props){
      super(props);

      this.state = {
        user: localStorage.getItem('user') != '' ? localStorage.getItem('user') : '',
        loginStatus: (localStorage.getItem('loginStatus'))?localStorage.getItem('loginStatus'):false,
        // loginStatus: false,
        // dataArray:JSON.parse(localStorage.getItem('dataArray')),
        dataArray: [],
        showHistory: false,
        registerModal:false,
        email: localStorage.getItem('email') != '' ? localStorage.getItem('email') : '' ,
        password: '',
        errors: {
           username: '',
           password: '',
        },
        errors2:{
           namererror:'',
           emailrerror:'',
           passwordrerror:''
        },
        emailError: '',
        globalLoginError:'',
        globalRegError:'',
        registername:'',
        registeremail:localStorage.getItem('email') != '' ? localStorage.getItem('email') : '',
        registerpassword:'',
        loaderStatus: false,
        forgotPasswordModal: false,
        emailVerifydModal: false,
        otp: '',
        otpError: '',
        countryListModal: false,
        countryList: [],
        otpFlag: false,
        changePasswordModal: false,
        newPassword: '',
        confirmPassword: '',
        newPasswordError: '',
        confirmPasswordError: '',
        mobileMenu: false,
        mobileMenushow: false,
        countryName: '',
        emailVerify:localStorage.getItem('emailverify') != '' ? localStorage.getItem('emailverify'):'',
        resentOtpStatus:'',
        otpUser:'',
        otpMail:'',
      }

   }

    componentWillMount = () => {

        if(window.innerWidth <= 991){
            this.setState({
                mobileMenu: true,
            });
        }

        if(!localStorage.getItem('country_name')){
            this.setState({
                countryListModal: !this.state.countryListModal,
            })
        }
        
        if(!sessionStorage.getItem('latitude') && !sessionStorage.getItem('longitude')){
            navigator.geolocation.getCurrentPosition((position) => {
                
                sessionStorage.removeItem('latitude');
                sessionStorage.removeItem('longitude');

                sessionStorage.setItem('latitude', position.coords.latitude);
                sessionStorage.setItem('longitude', position.coords.longitude);

                axios({
                    url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${sessionStorage.getItem('latitude')},${sessionStorage.getItem('longitude')}&key=${GOOGLEMAPS_API}`,
                    method: 'GET',
                }).then(response => {
                    response.data.results.forEach(gmap => {
                        
                        if(gmap.address_components.length == 1){
                            // localStorage.setItem('country_name', gmap.formatted_address);
                        }
                    });
        
                }).catch((error) => {
        
                });

            });
        }

        axios({
            url: `${BASE_URL}/menu/list`,
            method: 'POST',
            data:{
                latitude: localStorage.getItem('city_id') || localStorage.getItem('country_id') ?  0 : sessionStorage.getItem('latitude'),
                longitude: localStorage.getItem('city_id') || localStorage.getItem('country_id') ?  0 : sessionStorage.getItem('longitude'),
                city: localStorage.getItem('city_id'),
                country: localStorage.getItem('country_id'),
            }
        }).then(response => {

            if(response.data.status === 'success'){
               // console.log(response)
                this.setState({
                    dataArray: response.data.category,
                });
            }
            
        }).catch((error) => {

        });

        axios({
            url: `${BASE_URL}/customer/get/country`,
            method: 'POST',
        }).then(response => {

            if(response.data.status === 'success'){
                this.setState({
                    countryList: response.data.country,
                });

                response.data.country.forEach(country => {
                    if(country.name === localStorage.getItem('country_name')){
                        localStorage.removeItem('country_id');
                        localStorage.setItem('country_id', country.id);
                    }
                });
            }

        }).catch((error) => {

        });

    }

    Country = () => {  
        return (this.state.countryList.map(data => ({ label: data.name, value: data.id })));
    }
   
   viewLoginModal = () => {
      this.setState({ showHistory: !this.state.showHistory });
      this.setState({ registerModal: false });

  }


  viewRegisterModal = () => {
   this.setState({ registerModal: !this.state.registerModal });
   this.setState({ showHistory: false });
  }

  viewOtpModal=()=>{
   // this.setState({ emailVerifydModal:!this.state.emailVerifydModal });
        this.setState({
            emailVerifydModal: !this.state.emailVerifydModal,
            showHistory: !this.state.showHistory,
            error: '',
        });
  }


  handleRegisterSubmit = (e) => {
   
   e.preventDefault(); 
   const { name, value } = e.target;
   let errors2 = this.state.errors2;

    this.setState({
        globalRegError: '',
    });
    
    if(this.state.registername && this.state.registeremail && this.state.registerpassword){

        this.setState({
            loaderStatus: true,
        });

         e.preventDefault();

        axios({
            url:`${BASE_URL}/user/register`,
            method: 'POST',
            data:{
                name: this.state.registername,
                email: this.state.registeremail,
                password: this.state.registerpassword,
            }
        }).then(response => {

            if(response.data.code === '200'){
               

            //     localStorage.removeItem('userToken');
            //     localStorage.removeItem('loginStatus');

            //     localStorage.setItem('userToken', response.data.token);
            //     // localStorage.setItem('loginStatus', true);
            //     this.setState({
            //        loginStatus:true,
            //        user: localStorage.getItem('user'),
            //     });
                
            //     localStorage.setItem('loginStatus',true);

            //     this.setState({loginStatus:true});
            //     Swal.fire({
            //        title: 'success!',
            //        text: response.data.message,
            //        icon: 'success',
            //        confirmButtonText: 'OK'
            //    });
               this.setState({
                   registerModal: false,
                   emailVerifydModal: !this.state.emailVerifydModal,
                });

            }
            else if(response.data.code === '400'){
               this.setState({
                   globalRegError: response.data.errors ? response.data.errors.email[0] ? response.data.errors.email[0] : response.data.message ? response.data.message : '' :  response.data.message ? response.data.message : '',
                });
            }
            else{
               this.setState({globalRegError:'Sorry something went wrong try again...'});
            }

            this.setState({
                loaderStatus: false,
            });

           

        }).catch((error) => {
            this.setState({
                loaderStatus:false,
            });
           //console.log(error,'error')
         // this.setState({globalRegError:error.response.data.message});
        });





    }
    else{
         
        if(this.state.registername === '' || this.state.registername.trim() === ''){

            errors2.namererror ='Name cannot be blank'
        }

        if(this.state.registeremail === ''  || this.state.registeremail.trim() === '')
        {
           
            errors2.emailrerror = 'Email cannot be blank';
        }
        else if(!this.state.registeremail.match( /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){

           errors2.emailrerror ='Must be an email';
        }
        if(this.state.registerpassword === ''  || this.state.registerpassword.trim() === ''){
           
            errors2.passwordrerror = 'Password cannot be blank';
        }

        this.setState({errors2, [name]: value});
    }

      // console.log(errors2)

  }




   handleSubmit = (e) => {
        e.preventDefault();
        // console.log(e, 'targetvals')
        const { name, value } = e.target;
        let errors = this.state.errors;
        if(this.state.email && this.state.password)
        {

            this.setState({
                loaderStatus: true,
            });
      
            axios({
                url: `${BASE_URL}/user/login`,
                method: 'POST',
                data:{
                    email:this.state.email,
                    password:this.state.password,
                }
            }).then(response => {
                
                if(response.data.status == 'success'){

                    localStorage.removeItem('userToken');
                    localStorage.removeItem('loginStatus');
                    localStorage.removeItem('wallet');
                    localStorage.removeItem('emailverify');
                    localStorage.removeItem('email');

                    // localStorage.setItem('loginStatus', true);

                    localStorage.removeItem('user');
                    localStorage.setItem('user', response.data.user);
                    localStorage.setItem('wallet', response.data.wallet);
                    localStorage.setItem('userToken', response.data.token);
                    localStorage.setItem('emailverify', response.data.email_verify);
                    localStorage.setItem('email', response.data.email);

                    this.setState({
                        loginStatus:true,
                        user: response.data.user,
                        registeremail:response.data.email,
                    });
                    localStorage.setItem('loginStatus',true);
                    Swal.fire({
                        title: 'success!',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if(result.isConfirmed){
                            window.location.reload();
                        }
                    });
                    this.setState({ showHistory: false});
                //   console.log(localStorage,"local storage")
                    // this.props.handleSuccessfullAuth(response.data.message)
                }
                else{
                    
                    this.setState({globalLoginError:response.data.message, loaderStatus:false,});
                }

                    this.setState({
                        loaderStatus: false,
                    });

            }).catch((error) => {
                // console.log(error,'error');
                this.setState({globalLoginError:error.response.data.message, loaderStatus:false,});
                //   console.log(error.response.data.message);
            })
        }
        else{
            if(this.state.email === '' || this.state.email.trim() === '')
            {
                errors.username ='Email cannot be blank'
                this.setState({isUsernameError:true});
            }
            if(this.state.password === ''  || this.state.password.trim() === '')
            {
                this.setState({isPasswordError:true});
                errors.password = 'Password cannot be blank';
            }
            this.setState({errors, [name]: value});
        }   

  }


    onChange2 =(e)=>{
        this.setState({[e.target.name]: e.target.value});
        this.setState({globalRegisterError:''});
        e.preventDefault();
        const { name, value } = e.target;
        let errors2 = this.state.errors2;
        switch (name) {
            case 'registername': 
                errors2.namererror = (value.length === 0 || (value.trim()).length === 0 )? 'Name cannot be blank': '';
                if (value.length === 0 || (value.trim()).length === 0)
                {
                    this.setState({isUsernameError:true});
                }else{
                    this.setState({isUsernameError:false});
                }
            break;
            case 'registeremail':

                errors2.emailrerror = (value.length === 0 || (value.trim()).length === 0)? 'Email cannot be blank' : '';
                if (value.length === 0 || (value.trim()).length === 0)
                {
                    this.setState({isPasswordError:true});
                }else{
                    this.setState({isPasswordError:false});
                }

                    if(!value.match( /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
                        errors2.emailrerror ='Must be an email';
                        this.setState({isPasswordError:true});
                    }
            break;
            case 'registerpassword': 
            errors2.passwordrerror = (value.length === 0 || (value.trim()).length === 0)? 'Password cannot be blank' : '';
                if (value.length === 0 || (value.trim()).length === 0)
                {
                    this.setState({isPasswordError:true});
                }else{
                    this.setState({isPasswordError:false});
                }
            break;
            default:
                break;
        }
        this.setState({errors2, [name]: value});
    }

    onChange =(e)=>{
        this.setState({[e.target.name]: e.target.value});
        this.setState({globalLoginError:''});
        e.preventDefault();
        const { name, value } = e.target;
        let errors = this.state.errors;
        switch (name) {
            case 'email': 
                errors.username = (value.length === 0 || (value.trim()).length === 0 )? 'Email cannot be blank': '';
                if (value.length === 0 || (value.trim()).length === 0)
                {
                    this.setState({isUsernameError:true});
                }else{
                    this.setState({isUsernameError:false});
                }
                break;
            case 'password': 
                errors.password = (value.length === 0 || (value.trim()).length === 0)? 'Password cannot be blank' : '';
                if (value.length === 0 || (value.trim()).length === 0)
                {
                    this.setState({isPasswordError:true});
                }else{
                    this.setState({isPasswordError:false});
                }
                break;
            case 'otp':
                this.state.otpError = (value.length === 0 || (value.trim()).length === 0 ) ? 'OTP cannot be blank': '';
                break;
            case 'newPassword':
                this.state.newPassword = (value.length === 0 || (value.trim()).length === 0 ) ? 'Password cannot be blank': '';
                break;
            case 'confirmPassword':
                this.state.confirmPassword = (value.length === 0 || (value.trim()).length === 0 ) ? 'Confirm Password cannot be blank': '';
                break;
            default:
                break;
        }
        this.setState({errors, [name]: value});
    }


    viewForgotpasswordModal = () => {

        this.setState({
            forgotPasswordModal: !this.state.forgotPasswordModal,
            showHistory: !this.state.showHistory,
            error: '',
        });
    }

    forgotSubmit = (e) => {

        const { name, value } = e.target;
        let errors = this.state.errors;

        if(this.state.email){

            this.setState({
                loaderStatus: true,
            });
      
            axios({

                url: `${BASE_URL}/user/forgot/send/password/toMail`,
                method: 'POST',
                data:{
                    email:this.state.email,
                },

            }).then(response => {
                if(response.data.status == 'success'){
                    
                    // Swal.fire({
                    //     title: 'success!',
                    //     text: response.data.message,
                    //     icon: 'success',
                    //     confirmButtonText: 'OK'
                    // });

                    this.setState({
                        otpFlag: true,
                        // forgotPasswordModal: false,
                    });
                
                }

                if(response.data.status == 'error'){

                    Swal.fire({
                        title: 'Error!',
                        text: response.data.message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });

                }

                this.setState({
                    loaderStatus: false,
                });

            }).catch((error) => {
                this.setState({
                    loaderStatus: false,
                });
            })
        }
        else{
            let emailError = '';
            if(this.state.email === '' || this.state.email.trim() === ''){

                emailError ='Email cannot be blank';

                this.setState({isUsernameError:true});
            }
            this.setState({
                emailError: emailError,
            });
        }

    }


    logout = (e) => {
        this.setState({loginStatus:false, loaderStatus: true,});
        localStorage.removeItem('loginStatus');
        
        localStorage.setItem('loginStatus',false);
        
        e.preventDefault();
        
        localStorage.removeItem('userToken');
        
        
        // localStorage.setItem('loginStatus', false);
        // this.setState({loginStatus:false});
        axios({
            url: `${BASE_URL}/customer/logout`,
            method: 'POST',
            headers:{ Authorization: "Bearer " + userToken },

        }).then(response => {

                if(response.data.status === 'success'){
                    this.props.history.push('/');
                }

                this.setState({
                    loaderStatus: false,
                });

                window.location.reload();

        }).catch((error) => {
                this.props.history.push('/');
                this.setState({
                    loaderStatus: false,
                });
                window.location.reload();
        });

    }


    viewVerifyEmaildModal = () => {

        this.setState({
            emailVerifydModal: !this.state.emailVerifydModal,
            showHistory: !this.state.showHistory,
            error: '',
        });
    }

    resentOtp = () => {

        if(this.state.loginStatus === 'true' || this.state.loginStatus === true ){
            this.setState({
                otpMail: this.state.email,
                otpUser:this.state.user
            });
        }
        else{
            this.setState({
                otpMail: this.state.registeremail,
                otpUser:this.state.registername
            }); 
        }
        
                axios({
                    url: `${BASE_URL}/verify/resent/otp`,
                    method: 'POST',
                    data: {
                        email: this.state.otpMail,
                        name: this.state.otpUser,
                    }
                }).then(response => {

                    if(response.data.status === 'success'){

                       
                        this.setState({
                            resentOtpStatus: response.data.message,
                        });
                        
                       

                        // Swal.fire({
                        //     title: 'success!',
                        //     text: response.data.message,
                        //     icon: 'success',
                        //     confirmButtonText: 'OK'
                        // });

                    }

                }).catch((error) => {

                });
            
    }

    otpSubmit = () => {
        
        this.setState({
            otpError: this.state.otp === '' ? 'OTP cannot be blank': '',
        }, () => {

            if(this.state.otp !== ''){

                axios({
                    url: `${BASE_URL}/verify/email`,
                    method: 'POST',
                    data: {
                        email: this.state.registeremail,
                        otp: this.state.otp,
                    }
                }).then(response => {

                    if(response.data.status === 'success'){

                        localStorage.removeItem('userToken');
                        localStorage.removeItem('loginStatus');
                        localStorage.removeItem('user');
                        localStorage.removeItem('emailverify');

                        localStorage.setItem('userToken', response.data.token);
                        localStorage.setItem('user', response.data.user);
                        // localStorage.setItem('loginStatus', true);
                        this.setState({
                            loginStatus:true,
                            user: localStorage.getItem('user'),
                        });
                        
                        localStorage.setItem('loginStatus',true);
                        localStorage.setItem('emailverify', 1);

                        this.setState({
                            loginStatus:true,
                            emailVerifydModal: !this.state.emailVerifydModal,
                        });

                        Swal.fire({
                            title: 'success!',
                            text: response.data.message,
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then((result) => {
                            if(result.isConfirmed){
                                window.location.reload();
                            }
                        });

                    }

                    if(response.data.status === 'error'){

                        this.setState({
                            otpError: response.data.message,
                        });
                    }

                }).catch((error) => {

                });
            }
        });
    }

    forgotVerifyOtp = () => {

        this.setState({
            otpError: this.state.otp === '' ? 'OTP cannot be blank': '',
        }, () => {

            if(this.state.otp !== ''){

                axios({
                    url: `${BASE_URL}/vefify/opt`,
                    method: 'POST',
                    data: {
                        email: this.state.email,
                        otp: this.state.otp,
                    }
                }).then(response => {

                    if(response.data.status === 'success' && response.data.token === '#4t5o9ke0n6_#'){
                        
                        this.setState({
                            otp: '',
                            otpFlag: false,
                            changePasswordModal: true,
                        });
                    }

                    if(response.data.status === 'error'){
                        this.setState({
                            otpError: response.data.message,
                        });
                    }

                }).catch((error) => {

                });
            }
        });

    }

    countryModal = () => {

        this.setState({
            countryListModal: !this.state.countryListModal,
        })
    }

    onCountryChange = (e) => {

        // let countryIndex = e.nativeEvent.target.selectedIndex;
        // let countryName = e.nativeEvent.target[countryIndex].text

        localStorage.removeItem('country_id');
        localStorage.removeItem('country_name');
        localStorage.removeItem('city_id');

        // localStorage.setItem('country_id', e.target.value);
        // localStorage.setItem('country_name', countryName);

        localStorage.setItem('country_id', e.value);
        localStorage.setItem('country_name', e.label);

        this.setState({
            countryListModal: !this.state.countryListModal,
        });

        axios({
            url: `${BASE_URL}/get/currency`,
            method: 'POST',
            data: {
                country: e.value,
            }
        }).then(response => {
            // console.log(response.data.currency.currency_code);
            if(response.data.status === 'success'){
                
                localStorage.removeItem('currency');
                localStorage.removeItem('currency_value');
                localStorage.setItem('currency', response.data ? response.data.currency ? response.data.currency.currency_code : '' : '');
                localStorage.setItem('currency_value', response.data ? response.data.currency ? response.data.currency.value : '' : ''); 
                localStorage.setItem('usd_value', response.data ? response.data.usdval ? response.data.usdval : 0 : ''); 

                window.location.reload();
            }
            else{
                window.location.reload();
            }
            
        }).catch((error) => {

        });

        

    }

    changePasswordSubmit = () => {

        if(this.state.newPassword && this.state.confirmPassword){

            if(this.state.newPassword === this.state.confirmPassword){

                axios({
                    url: `${BASE_URL}/forgotpassword/password/reset`,
                    method: 'POST',
                    data: {
                        email: this.state.email,
                        password: this.state.newPassword,
                        password_confirmation: this.state.confirmPassword,
                    }
                }).then(response => {

                    if(response.data.status === 'success'){

                        localStorage.removeItem('userToken');
                        localStorage.removeItem('loginStatus');

                        localStorage.setItem('userToken', response.data.token);
                        // localStorage.setItem('loginStatus', true);

                        localStorage.removeItem('user');
                        localStorage.setItem('user', response.data.user);

                        this.setState({
                            loginStatus:true,
                            user: response.data.user,
                        });
                        localStorage.setItem('loginStatus',true);
                        
                        this.setState({
                            forgotPasswordModal: !this.state.forgotPasswordModal,
                        });
                        
                        Swal.fire({
                            title: 'success',
                            icon: 'success',
                            text: response.data.message,
                        }).then((result) => {
                            if (result.isConfirmed) {

                                window.location.reload();
                            }
                        });
                    }

                }).catch((error) => {});
            }
            else{
                this.setState({
                    confirmPasswordError: 'Password & Confirm password mismatch',
                });
            }
        }
        else{
            if(this.state.newPassword === ''){
                this.setState({
                    newPasswordError: 'Password cannot be blank',
                });
            }
            
            if(this.state.confirmPassword === ''){
                this.setState({
                    confirmPasswordError: 'Confirm password cannot be blank',
                });
            }
        }
    }

    changePasswordModal = () => {

        this.setState({
            changePasswordModal: !this.state.changePasswordModal,
        });
    }

    menuShow = () => {

        this.setState({
            mobileMenushow: !this.state.mobileMenushow,
        })
    }


    render() {
      
      let {user,dataArray} = this.state;

      let loginStyle = {
         marginRight: '0px',
       };
       
       let globalError ={
         color: 'red',
         fontSize: 'large',
         fontWeight: '600',
       }
      let ErrorStyle = {
         color: 'red',
       };
       let modalLogin ={
            position:  'fixed',
            width: '100%',
            top: '40px',
            // left: 'calc(50% - 300px)',
            bottom: '40px',
          
        
       }

       const {errors,errors2} = this.state;
       const {loginStatus} =this.state;

       let countryList = this.state.countryList;
       let country_id = localStorage.getItem('country_id') ? localStorage.getItem('country_id') : 0;

       let loaderStatus = this.state.loaderStatus;

       let countryName = localStorage.getItem('country_name') ? localStorage.getItem('country_name') : 'Change Country';
      
        return (
            <div>
                {loaderStatus == true ? <Loader /> : ''}
                
                <>
                <header id="header" className="site-header">
                    <div className="main-header">
                            <div className="container d-flex align-items-center flex-wrap">
                                <div className="brand">
                            
                                    <Link to="/" className="d-block"><img src={Logo} className="d-block" alt="brand"/></Link>
                                </div>
                                <div title='Select Country' className="country-select-panel d-block d-md-inline-block" onClick={() => this.setState({countryListModal: !this.countryListModal})} style={{cursor: 'pointer'}}>
                                    {this.state.countryName ? this.state.countryName : countryName}
                                </div>
                                    
                                <CitySelect />

                                <div className="header-right d-none d-lg-flex align-items-center ml-auto">
                            
                                {this.state.loginStatus === 'true' || this.state.loginStatus === true ?
                                
                                <div>
                                    <Link to="/myfavourite" className="header-link">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                    Favourites
                                    </Link>
                                    <Link to="/myprofile" className="header-link">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        {user}
                                    </Link> 
                                    <Link className="header-link" onClick={(e) => this.logout(e)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                        Logout</Link>
                                </div>
                                :
                                <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        <a href="javascript:void(0)" onClick={() => { this.viewLoginModal() }} className="header-link" style={loginStyle}>Log in</a> or <a href="javascript:void(0)" onClick={() => { this.viewRegisterModal() }} className="header-link">sign up</a>
                                        
                                </span>
                                }





                                {this.state.loginStatus === true || this.state.loginStatus === 'true' && this.state.emailVerify == 1 ? 

                                <Link to='/create-ads' className="btn btn-primary" replace>Place Your Ad</Link>
                                :
                                this.state.loginStatus === true || this.state.loginStatus === 'true' && this.state.emailVerify == 0 ?
                                <a href='javascript:void(0)'  onClick={() => { this.viewOtpModal() }}  className="btn btn-primary">Place Your Ad</a>
                                :
                                <a href='javascript:void(0)'  onClick={() => { this.viewLoginModal() }}  className="btn btn-primary">Place Your Ad</a>

                                    }
                                </div>
                                <GoogleTranslate />
                                <button className="btn btn-primary btn-toggle-menu d-inline-block d-lg-none ml-auto" onClick={this.menuShow}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                                </button>
                            </div>
                        </div>
                        <Menu category={dataArray}/>
                    </header>
                    <MobileMenu category={dataArray} action={this.state.mobileMenushow} menuRemove={this.menuShow} changeCountry={this.countryModal} loginClick={this.viewLoginModal} signUpClick={this.viewRegisterModal} />


                        <div className="container">
                            <Modal className="modal fade log-sign-modal" show={this.state.showHistory}  style={modalLogin} id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                                
                                <Modal.Body>
                            
                                    <button  onClick={() => { this.viewLoginModal() }}  type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                    <h5 className="modal-title text-center text-brand">Log in to your account</h5>
                                    <div className="modal-form">
                                        <div className="form-group">
                                        
                                        <p className="help-block help-block-error" style={globalError}>{(this.state.globalLoginError!="")? "Sorry... "+this.state.globalLoginError:''}</p>
                                        {/* globalLoginError */}
                                        <input type="email" value={this.state.email}  onChange={this.onChange} name="email" className="form-control" placeholder="Email address"/>
                                        {errors.username.length > 0 && <p className="help-block help-block-error"  style={ErrorStyle}>{errors.username}</p>}
                                        </div>
                                        <div className="form-group">
                                            <input type="password" value={this.state.password} name="password" onChange={this.onChange} className="form-control"  placeholder="Password"/>
                                        {errors.password.length > 0 && <p className="help-block help-block-error" style={ErrorStyle}>{errors.password}</p>}
                                        </div>
                                        <div className="form-group text-right">
                                            <a href="javascript:void(0)" onClick={this.viewForgotpasswordModal} className="btn btn-link p-0">Forgot your password?</a>
                                        </div>
                                        <div className="form-group">
                                        
                                            <button onClick={this.handleSubmit} className="btn btn-primary d-block w-100">Login</button>
                                        </div>
                                        <div className="form-group-line text-center">
                                            <button className="btn btn-link p-0" onClick={() => { this.viewRegisterModal() }} data-toggle="modal" data-target="#signupModal" data-dismiss="modal">Don’t have an account? Create one</button>
                                        </div>
                                    </div>
                                    <div className="modal-note text-center">By signing up I agree to the  <Link to="/terms/conditions"> Terms and Conditions</Link> and <Link to="/privacy/policy"> Privacy Policy</Link></div>
                                
                                </Modal.Body>
                                
                            </Modal>
                            <Modal className="modal fade log-sign-modal" show={this.state.registerModal}  id="signupModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                                
                                <Modal.Body>
                                <button onClick={() => { this.viewRegisterModal() }} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                            <h5 className="modal-title text-center text-brand">Create an account</h5>
                            <div className="modal-form">
                            <p className="help-block help-block-error" style={{color:'red',}}>{(this.state.globalRegError!="")? "Sorry... "+this.state.globalRegError:''}</p>
                                <div className="form-group">
                                <input type="text" value={this.state.registername}  onChange={this.onChange2} name="registername" className="form-control" placeholder="Name"/>
                                {errors2.namererror.length > 0 && <p className="help-block help-block-error"  style={ErrorStyle}>{errors2.namererror}</p>}
                                
                                </div>
                                <div className="form-group">
                                <input type="email" value={this.state.registeremail}  onChange={this.onChange2}  name="registeremail" className="form-control" placeholder="Email"/>
                                {errors2.emailrerror.length > 0 && <p className="help-block help-block-error"  style={ErrorStyle}>{errors2.emailrerror}</p>}
                                </div>
                                <div className="form-group">
                                <input type="password"  value={this.state.registerpassword}  onChange={this.onChange2}  name="registerpassword"  className="form-control" placeholder="Password"/>
                                {errors2.passwordrerror.length > 0 && <p className="help-block help-block-error"  style={ErrorStyle}>{errors2.passwordrerror}</p>}
                                </div>
                                <div className="form-group">
                                <button  onClick= { this.handleRegisterSubmit} className="btn btn-primary d-block w-100">Sign Up</button>
                                </div>
                                <div className="form-group-line text-center">
                                <button  onClick={() => { this.viewLoginModal() }} className="btn btn-link p-0" data-toggle="modal" data-target="#loginModal" data-dismiss="modal">Already have an account? Login here</button>
                                </div>
                            </div>
                            <div className="modal-note text-center">By signing up I agree to the  <Link to="/terms/conditions"> Terms and Conditions</Link> and <Link to="/privacy/policy"> Privacy Policy</Link></div>
                                
                                </Modal.Body>
                                
                            </Modal> 



                            <Modal className="modal fade log-sign-modal" show={this.state.forgotPasswordModal}  style={modalLogin} id="forgotModal" tabindex="-1" aria-labelledby="forgotModalLabel" aria-hidden="true">
                                
                                <Modal.Body>
                            
                                    <button  onClick={ this.viewForgotpasswordModal }  type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                    <h5 className="modal-title text-center text-brand">Recover your account</h5>
                                    <div className="modal-form">
                                        
                                        {this.state.otpFlag === false ?
                                        <>
                                        <div className="form-group">
                                        <input type="email" value={this.state.email}  onChange={this.onChange} name="email" className="form-control" placeholder="Email address"/>
                                            {this.state.emailError && <p className="help-block help-block-error"  style={ErrorStyle}>{this.state.emailError}</p>}
                                        </div>
                                        
                                        <div className="form-group">
                                        
                                            <button onClick={ this.forgotSubmit } className="btn btn-primary d-block w-100">Recover</button>
                                        </div>
                                        </> : 
                                        <>
                                            <div className="form-group">
                                                <input type="number" value={this.state.otp} onChange={this.onChange}  name="otp" className="form-control" placeholder="OTP"/>
                                                    {this.state.otpError && <p className="help-block help-block-error"  style={ErrorStyle}>{this.state.otpError}</p>}
                                                </div>
                                            
                                            <div className="form-group">
                                                <button onClick={ this.forgotVerifyOtp } className="btn btn-primary d-block w-100">Verify</button>
                                            </div>
                                        </>}
                                        <div className="form-group-line text-center">
                                            <p>check mail {this.state.registeremail} </p>
                                        </div>
                                        {/* <div className="form-group-line text-center">
                                            <button className="btn btn-link p-0" onClick={ this.viewForgotpasswordModal } data-toggle="modal" data-target="#signupModal" data-dismiss="modal">Back to Login</button>
                                        </div> */}
                                        <div className="form-group-line text-center">
                                       <button className="btn btn-link p-0" onClick={ this.resentOtp } >Resent Otp</button>
                                       <p className="text-center">{this.state.resentOtpStatus}</p>
                                     </div>
                                    </div>
                                    <div className="modal-note text-center">By signing up I agree to the  <Link to="/terms/conditions"> Terms and Conditions</Link> and <Link to="/privacy/policy"> Privacy Policy</Link></div>
                                
                                </Modal.Body>
                                
                            </Modal>


                            <Modal className="modal fade log-sign-modal" show={this.state.emailVerifydModal}  style={modalLogin} id="emailVerfyModal" tabindex="-1" aria-labelledby="forgotModalLabel" aria-hidden="true">
                                
                                <Modal.Body>
                            
                                    <button  onClick={ this.viewVerifyEmaildModal }  type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                    <h5 className="modal-title text-center text-brand">Verify Your Email</h5>
                                    <div className="modal-form">
                                        <div className="form-group">
                                        
                                        <input type="text" value={this.state.otp}  onChange={this.onChange} name="otp" className="form-control" placeholder="OTP"/>
                                            {this.state.otpError && <p className="help-block help-block-error"  style={ErrorStyle}>{this.state.otpError}</p>}
                                        </div>
                                        
                                        <div className="form-group">
                                        
                                            <button onClick={ this.otpSubmit } className="btn btn-primary d-block w-100">Verify</button>
                                        </div>
                                        <div className="form-group-line text-center">
                                            {/* <button className="btn btn-link p-0" onClick={ this.viewVerifyEmaildModal } data-toggle="modal" data-target="#signupModal" data-dismiss="modal">Back to Login</button> */}
                                            <p>check mail {this.state.registeremail} </p>
                                        </div>
                                       
                                    </div>
                                    <div className="modal-note text-center">By signing up I agree to the  <Link to="#"> Terms and Conditions</Link> and <Link to="/privacy/policy"> Privacy Policy</Link></div>
                                    <div className="form-group-line text-center">
                                       <button className="btn btn-link p-0" onClick={ this.resentOtp } >Resent Otp</button>
                                       <p className="text-center">{this.state.resentOtpStatus}</p>
                                     </div>
{/*                                     
                                    {this.state.loginStatus === 'true' || this.state.loginStatus === true ? 

                                     
                                    
                                    :  ''                                  
                                } */}

                                </Modal.Body>
                                
                            </Modal>


                            <Modal className="modal fade log-sign-modal" show={this.state.countryListModal}  style={modalLogin} id="emailVerfyModal" tabindex="-1" aria-labelledby="forgotModalLabel" aria-hidden="true">
                                
                                <Modal.Body>
                                    <button  onClick={ this.countryModal }  type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                    <h5 className="modal-title text-center text-brand">Select Your Country</h5>
                                    <div className="modal-form">
                                        <div className="form-group">
                                            <Select  onChange={this.onCountryChange}  options={this.Country()} components={animatedComponents}   />
                                            {/* <select type="text" onChange={this.onCountryChange} name="country" className="form-control">
                                                <option value="">Select Country</option>
                                                {countryList && countryList.map((country, index) => {
                                                    if(country_id == country.id){
                                                        return <option selected value={country.id}>{country.name}</option>
                                                    }
                                                    else{
                                                        return <option value={country.id}>{country.name}</option>
                                                    }
                                                })}
                                            </select> */}
                                        </div>
                                    </div>
                                </Modal.Body>
                                
                            </Modal>

                            <Modal className="modal fade log-sign-modal" show={this.state.changePasswordModal}  style={modalLogin} id="changeModal" tabindex="-1" aria-labelledby="changeModalLabel" aria-hidden="true">
                                
                            <Modal.Body>
                                    
                                <button  onClick={ this.changePasswordModal }  type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                                <h5 className="modal-title text-center text-brand">Change your password</h5>
                                <div className="modal-form">
                                    <div className="form-group">
                                        <input type="password" value={this.state.newPassword}  onChange={this.onChange} name="newPassword" className="form-control" placeholder="New Password"/>
                                        {this.state.newPasswordError && <p className="help-block help-block-error"  style={ErrorStyle}>{this.state.newPasswordError}</p>}
                                    </div>
                                    <div className="form-group">
                                        <input type="password" value={this.state.confirmPassword}  onChange={this.onChange} name="confirmPassword" className="form-control" placeholder="Confirm Password"/>
                                        {this.state.confirmPasswordError && <p className="help-block help-block-error"  style={ErrorStyle}>{this.state.confirmPasswordError}</p>}
                                    </div>
                                                        
                                    <div className="form-group">
                                                        
                                        <button onClick={ this.changePasswordSubmit } className="btn btn-primary d-block w-100">Change</button>
                                    </div>
                                </div>
                                
                                        
                            </Modal.Body>
                                        
                        </Modal>

                        </div>
                </>
            </div>

             
        )
    }
}
export default withRouter(Header)