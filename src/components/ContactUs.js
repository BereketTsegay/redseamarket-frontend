import React, { Component } from 'react';
import Header from './layouts/header';
import Footer from './layouts/footer';
import AppDownload from './home/app-download';
import axios from 'axios';
import { BASE_URL } from '../projectString';
import Loader from './Loader';
import Swal from 'sweetalert2';

export default class ContactUs extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            message: '',
            errorName: '',
            errorEmail: '',
            errorPhone: '',
            errorMessage: '',
            loaderStatus: false,
        }
        
    }

    componentWillUnmount = () => {
        window.scrollTo(0, 0);
    }

    handleChange = (e) => {

        let value = e.target.value;
        let name = e.target.name;
        if(name === 'name'){
            if(value !== ''){
                this.setState({
                    errorName: ''
                });
            }
            else{
                this.setState({
                    errorName: 'Name cannot be blank',
                });
            }
            
        }
        
        if(name === 'email'){
            if(value !== ''){
                if(!value.match( /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
                    this.setState({
                        errorEmail: 'Must be an email'
                    });
                }
                else{

                    this.setState({
                        errorEmail: '',
                    });
                }
            }
            else{
                this.setState({
                    errorEmail: 'Email cannot be blank',
                });
            }
        }
        if(name === 'message'){
            if(value !== ''){

                this.setState({
                    errorMessage: '',
                });
            }
            else{
                this.setState({
                    errorMessage: 'Message cannot be blank',
                });
            }
        }
        if(name === 'phone'){
            if(value !== ''){
                this.setState({
                    errorPhone: '',
                });
            }
            else{
                this.setState({
                    errorPhone: 'Phone cannot be blank',
                });
            }
        }

        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit = (e) => {

        if(this.state.message && this.state.name, this.state.email, this.state.phone){

            this.setState({
                loaderStatus: true,
            });

            e.preventDefault();

            axios({
                url: `${BASE_URL}/contactus/enquiry`,
                method: 'POST',
                data:{
                    message: this.state.message,
                    name: this.state.name,
                    email: this.state.email,
                    phone: this.state.phone,
                }
            }).then(response => {

                if(response.data.status === 'success'){
                    this.setState({
                        message: '',
                        name: '',
                        email: '',
                        phone: '',
                    });

                    Swal.fire({
                        'icon': 'success',
                        'title': 'Success!',
                        'text': response.data.message,
                    });
                }
                else{
                    Swal.fire({
                        'icon': 'error',
                        'title': 'Error!',
                        'text': response.data.message,
                    });
                }

                this.setState({
                    loaderStatus: false,
                });

            }).catch((error) => {
                this.setState({
                    loaderStatus: false,
                });
            });
        }
        else{

            if(this.state.message === null || this.state.message === ''){
                this.setState({
                    errorMessage: 'Message cannot be blank',
                });
            }
            if(this.state.name === null || this.state.name === ''){
                this.setState({
                    errorName: 'Name cannot be blank',
                });
            }
            if(this.state.email === null || this.state.email === ''){
                this.setState({
                    errorEmail: 'Email cannot be blank',
                });
            }
            if(this.state.phone === null || this.state.phone === ''){
                this.setState({
                    errorPhone: 'Phone cannot be blank',
                });
            }
        }

    }

    render() {

        let loaderStatus = this.state.loaderStatus;

        return (
            <div className="site-frame">

                <Header />
                
                {/* <!-- =====[PAGE]===== --> */}
                <div id="page" className="site-page">

                {loaderStatus == true ? <Loader /> : ''}
                <section className="section-create-ad-1">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="section-title-panel text-center">
                                        <h2 className="section-title mb-2">Contact Us</h2>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="row">
                                <div className="col-xl-5 col-lg-7 col-md-9 mx-auto">
                                    <ol className="breadcrumb p-0 bg-white justify-content-center">
                                        <li className="breadcrumb-item"><a>test</a></li>
                                        <li className="breadcrumb-item"><a>test</a></li>
                                    </ol>
                                </div>
                            </div> */}
                            <div className="row">
                                <div className="col-xl-5 col-lg-7 col-md-9 mx-auto">
                                    <div className="create-ad-form">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input type="text" name='name' value={this.state.name} onChange={(e) => this.handleChange(e)} className="form-control" placeholder="" />
                                            {this.state.errorName ? <p className="help-block help-block-error"  style={{color:'red'}}>{this.state.errorName}</p>: ''}
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="text" name='email' value={this.state.email} onChange={(e) => this.handleChange(e)} className="form-control" placeholder="" />
                                            {this.state.errorEmail ? <p className="help-block help-block-error"  style={{color:'red'}}>{this.state.errorEmail}</p>: ''}
                                        </div>
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input type="text" name='phone' value={this.state.phone} onChange={(e) => this.handleChange(e)} className="form-control" placeholder="" />
                                            {this.state.errorPhone ? <p className="help-block help-block-error"  style={{color:'red'}}>{this.state.errorPhone}</p>: ''}
                                        </div>
                                        <div className="form-group">
                                            <label>Message</label>
                                            <textarea name='message' onChange={(e) => this.handleChange(e)} className="form-control" placeholder="">{this.state.message}</textarea>
                                            {this.state.errorMessage ? <p className="help-block help-block-error"  style={{color:'red'}}>{this.state.errorMessage}</p>: ''}
                                        </div>
                                        <button onClick={this.handleSubmit} className="btn btn-primary btn-block">Send</button>
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
