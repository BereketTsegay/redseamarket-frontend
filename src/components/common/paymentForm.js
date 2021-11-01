import React, { Component } from 'react'
import {CardElement, ElementsConsumer} from '@stripe/react-stripe-js';
import Stripe from 'stripe';
import axios from 'axios';
import { BASE_URL, userToken } from '../../projectString';
import Swal from 'sweetalert2';
import LoaderSpinner from "react-loader-spinner";

export class PaymentForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            address: '',
            zipcode: '',
            countries: [],
            states: [],
            cities: [],
            country_id: localStorage.getItem('country_id') ? localStorage.getItem('country_id') : '',
            state_id: '',
            country: '',
            state: '',
            city: '',

            error_name: '',
            error_email: '',
            error_phone: '',
            error_address: '',
            error_zipcode: '',
            error_country: '',
            error_state: '',
            error_city: '',
            currency: localStorage.getItem('currency') ? localStorage.getItem('currency').toLowerCase() : 'aed',
            amount: localStorage.getItem('newAmount') ? localStorage.getItem('newAmount') : 0,
            loaderStatus: false,
            token: userToken,
            showPayment: true,
        }
    }

    handleSubmit = async (event) => {

        let state = this.state;

        if(state.name !== '' && state.email !== '' && state.phone !== '' && state.address !== '' && state.zipcode !== '' && state.country !== '' && state.state !== '' && state.city !== ''){
            // console.log(state);
            // Block native form submission.
            // event.preventDefault();
        
            const {stripe, elements} = this.props;
        
            if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
            }
            // console.log(elements);
            // Get a reference to a mounted CardElement. Elements knows how
            // to find your CardElement because there can only ever be one of
            // each type of element.

            const cardElement = elements.getElement(CardElement);
        
            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    name: this.state.name,
                    email: this.state.email,
                    phone: this.state.phone,
                    address: {
                        line1: this.state.address,
                        postal_code: this.state.zipcode,
                        city: this.state.city,
                        state: this.state.state,
                        country: this.state.country,
                    }
                }
            });
        
            if (error) {

            // console.log('[error]', error);

            }
            else {

                // console.log('[PaymentMethod]', paymentMethod);

                // const secret_key = 'sk_test_51HqJ58APs1IO5yfE3dtoHFXSEfscNwttjD3MFe4Qcu3ir2NhLbrr7HhMhUcYs1NhkVb91LZI9ecYsurUfcslXBDp00NYFzKvjF';
                this.setState({
                    loaderStatus: true,
                });

                axios({
                    url: `${BASE_URL}/stripe/payment`,
                    method: 'POST',
                    data: {
                        amount: Math.round(this.state.amount),
                        currency: this.state.currency,
                        name: this.state.name,
                        email: this.state.email,
                        phone: this.state.phone,
                        address: this.state.address,
                        country: this.state.country,
                        state: this.state.state,
                        city: this.state.city,
                        zipcode: this.state.zipcode,
                    },
                }).then(response => {
                    
                    stripe.confirmCardPayment(response.data, {
                        payment_method: {
                            card: cardElement,
                            billing_details: {
                                name: this.state.name,
                                email: this.state.email,
                                phone: this.state.phone,
                                address: {
                                    line1: this.state.address,
                                    city: this.state.city,
                                    state: this.state.state,
                                    country: this.state.country,
                                    postal_code: this.state.zipcode,
                                }
                            },
                        },
                    })
                    .then(result => {
                        
                        if(result.paymentIntent){
                            
                            if(result.paymentIntent.status === 'succeeded'){
                                

                                axios({
                                    url: `${BASE_URL}/payment/status/update`,
                                    method: 'POST',
                                    data: {
                                        payment_id: result.paymentIntent.id,
                                    }
                                }).then(response => {

                                }).catch((error) => {

                                });

                                localStorage.removeItem('new_payment_id');
                                localStorage.setItem('new_payment_id', result.paymentIntent.id);
                                this.props.newPaymentIdGet(result.paymentIntent.id);
                                this.setState({
                                    loaderStatus: false,
                                    showPayment: false,
                                });

                                Swal.fire({
                                    title: 'Success!',
                                    text: 'Payment Success',
                                    icon: 'success',
                                    confirmButtonText: 'OK'
                                });
                            }
                        }
                        else{

                            localStorage.removeItem('new_payment_id');
                            localStorage.setItem('new_payment_id', result.error.payment_intent.id);
                            this.props.newPaymentIdGet(result.paymentIntent.id);
                            this.setState({
                                loaderStatus: false,
                            });

                            Swal.fire({
                                title: 'Failed!',
                                text: 'Payment Failed',
                                icon: 'error',
                                confirmButtonText: 'OK'
                            });
                        }
                    });
                }).catch((error) => {

                    this.setState({
                        loaderStatus: false,
                    });

                    Swal.fire({
                        title: 'Failed!',
                        text: 'Payment Failed',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                });
            }

        }
        else{

            if(state.name === ''){
                this.setState({
                    error_name: 'Name cannot be blank',
                });
            }

            if(state.phone === ''){
                this.setState({
                    error_phone: 'Phone cannot be blank',
                });
            }

            if(state.email === ''){
                this.setState({
                    error_email: 'Email cannot be blank',
                });
            }

            if(state.address === ''){
                this.setState({
                    error_address: 'Address cannot be blank',
                });
            }

            if(state.country === ''){
                this.setState({
                    error_country: 'Country cannot be blank',
                });
            }

            if(state.state === ''){
                this.setState({
                    error_state: 'State cannot be blank',
                });
            }

            if(state.city === ''){
                this.setState({
                    city: state.state,
                });
            }

            if(state.zipcode === ''){
                this.setState({
                    error_zipcode: 'Zipcode cannot be blank',
                });
            }
        }
    }

    handleChange = (e) => {
        
        this.setState({
            [e.target.name]: e.target.value,
        });
        let name = e.target.name;
        let value = e.target.value;

        // if(name === 'name' && value === ''){

        //     this.setState({
        //         error_name: 'Name Cannot be blank',
        //     });
        // }
        // else{
        //     this.setState({
        //         error_name: '',
        //     });
        // }

        // if(name === 'email' && value === ''){
            
        //     this.setState({
        //         error_email: 'Email cannot be blank',
        //     });
        // }
        // else{
            
        //     if(value.match( /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
        //         this.setState({
        //             error_email: '',
        //         });
        //     }
        //     else{
        //         this.setState({
        //             error_email: 'Must be an email',
        //         });
        //     }
        // }

        // if(name === 'phone' && value !== ''){
        //     this.setState({
        //         error_phone: '',
        //     });
        // }
        // else{
        //     this.setState({
        //         error_phone: 'Phone cannot be blank',
        //     });
        // }
        
        // if(name === 'address' && value !== ''){
        //     this.setState({
        //         error_address: '',
        //     });
        // }
        // else{
        //     this.setState({
        //         error_address: 'Address cannot be blank',
        //     });
        // }
        // if(name === 'zipcode' && value !== ''){
        //     this.setState({
        //         error_zipcode: '',
        //     });
        // }
        // else{
        //     this.setState({
        //         error_zipcode: 'Zipcode cannot be blank',
        //     });
        // }
    }

    componentWillMount = () => {

        localStorage.removeItem('new_payment_id');

        axios({
            method: 'POST',
            url: `${BASE_URL}/customer/get/country`,
         }).then(response => {
   
            if(response.data.status == 'success'){
               this.setState({
                  countries: response.data.country,
               });

               response.data.country.forEach(element => {
                   
                   if(element.id == localStorage.getItem('country_id')){
                       this.setState({
                            country: element.code,
                       });
                   }
               });
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
                  name: response.data.data.user.name,
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
                  states: response.data.state,
               });
            }
   
         }).catch((error) => {
            this.setState({
               loaderStatus: false,
            });
         });
    }

    countryChange = (e) => {

        let index = e.nativeEvent.target.selectedIndex;

        let optionElement = e.target.childNodes[index]

        let option =  optionElement.getAttribute('data-code');

        let id = e.target.value;
        let country = option;

        axios({
            url: `${BASE_URL}/get/currency`,
            method: 'POST',
            data: {
                country: id,
            }
        }).then(response => {
            
            if(response.data.status === 'success'){
                
                this.setState({
                    currency: response.data ? response.data.currency.currency_code : localStorage.getItem('currency') ? localStorage.getItem('currency').toLowerCase() : 'aed',
                });

            }
        })

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
                  country: country,
                  states: response.data.state,
               });
            }
   
         }).catch((error) => {
           
         });
    }

    stateChange = (e) => {
        
        let index = e.nativeEvent.target.selectedIndex;

        let id = e.target.value;
        let state = e.nativeEvent.target[index].text;
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
                  cities: response.data.city,
                  state: state,
               });
            }
   
        }).catch((error) => {
            this.setState({
               loaderStatus: false,
            });
        });
    }
    
    cityChange = (e) => {

        let index = e.nativeEvent.target.selectedIndex;

        this.setState({
            city: e.nativeEvent.target[index].text,
        });
    }
    
    render() {
        const {stripe} = this.props;

        let {name, email, phone, address, zipcode, countries, states, cities} = this.state;

        let ErrorStyle = {
            color: 'red',
        };

        let error_name      =  this.state.error_name;
        let error_email     = this.state.error_email;
        let error_phone     = this.state.error_phone;
        let error_address   = this.state.error_address;
        let error_zipcode   = this.state.error_zipcode;
        let error_country   = this.state.error_country;
        let error_state     = this.state.error_state;
        let error_city      = this.state.error_city;

        return (
            <form onSubmit={this.handleSubmit}>

                <h4>Payment details</h4>
                <hr />
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name='name' value={name} onChange={(e) => this.handleChange(e)} className="form-control" placeholder="Name" />
                    {error_name ? <p className="help-block help-block-error"  style={ErrorStyle}>{error_name}</p> : '' }
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name='email' value={email} onChange={(e) => this.handleChange(e)} className="form-control" placeholder="Email" />
                    {error_email ? <p className="help-block help-block-error"  style={ErrorStyle}>{error_email}</p> : '' }
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="number" name='phone' value={phone} onChange={(e) => this.handleChange(e)} className="form-control" placeholder="Phone" />
                    {error_phone ? <p className="help-block help-block-error"  style={ErrorStyle}>{error_phone}</p> : '' }
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <textarea name='address' onChange={(e) => this.handleChange(e)} className="form-control" placeholder="Address">{address}</textarea>
                    {error_address ? <p className="help-block help-block-error"  style={ErrorStyle}>{error_address}</p> : '' }
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Country</label>
                            <select name='country' onChange={(e) => this.countryChange(e)} className="form-control">
                                <option value="" data-code="">Select Country</option>
                                {countries && countries.map((countries, index) => {
                                    if(this.state.country_id == countries.id){
                                        return <option selected key={index} data-code={countries.code} value={countries.id}>{countries.name}</option>
                                    }
                                    else{
                                        return <option key={index} data-code={countries.code} value={countries.id}>{countries.name}</option>
                                    }
                                })}
                            </select>
                            {error_country ? <p className="help-block help-block-error"  style={ErrorStyle}>{error_country}</p> : '' }
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>State</label>
                            <select name='state' onChange={(e) => this.stateChange(e)} className="form-control">
                                <option value=''>Seletc State</option>
                                {states && states.map((states, index) => {
                                    return <option key={index} value={states.id}>{states.name}</option>
                                })}
                            </select>
                            {error_state ? <p className="help-block help-block-error"  style={ErrorStyle}>{error_state}</p> : '' }
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>City</label>
                            <select name='city' onChange={(e) => this.cityChange(e)} className="form-control">
                                <option value=''>Seletc City</option>
                                {cities && cities.map((cities, index) => {
                                    return <option key={index} value={cities.name}>{cities.name}</option>
                                })}
                            </select>
                            {error_city ? <p className="help-block help-block-error"  style={ErrorStyle}>{error_city}</p> : '' }
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Zipcode</label>
                            <input type="number" name='zipcode' value={zipcode} onChange={(e) => this.handleChange(e)} className="form-control" placeholder="Zipcode" />
                            {error_zipcode ? <p className="help-block help-block-error"  style={ErrorStyle}>{error_zipcode}</p> : '' }
                        </div>
                    </div>
                </div>
                
                {this.state.showPayment == true ?
                <>
                    <CardElement
                        style={{borderColor:'1px solid black'}}
                        // onChange={this.handleSubmit}
                        options={{
                            style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                            },
                            hidePostalCode: true,
                        }}
                    />
                    
                    <div className="form-group mt-3 text-center">
                        <button type="button" onClick={this.handleSubmit} className="btn btn-success btn-block">Proceed to Pay</button>
                    </div>
                </>
                : '' }

                {this.state.loaderStatus == true ?

                <LoaderSpinner
                    className="d-flex p-2 bd-highlight justify-content-center"
                    type="Oval"
                    color="#00BFFF"
                    height={50}
                    width={50}
                    // timeout={3000} //3 secs
                /> : ''}
            </form>
        );
    }
    
}



class InjectedCheckoutForm extends React.Component {

    constructor(props){
        super(props);
    }
    
    newPaymentIdGet = (id) => {

        this.props.paymentIdGet(id);
    }

    render(){

        return (
            <ElementsConsumer>
              {({elements, stripe}) => (
                  <PaymentForm newPaymentIdGet={this.newPaymentIdGet} elements={elements} stripe={stripe} />
              )}
            </ElementsConsumer>
        );
    }
};

export default InjectedCheckoutForm;
