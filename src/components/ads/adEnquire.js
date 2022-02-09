import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../projectString';
import Loader from '../Loader';

export default class adEnquire extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: this.props.adsId,
            name: null,
            email: null,
            message: null,
            phone:null,
            loaderStatus: false,
            errorName: '',
            errorEmail: '',
            errorMessage: '',
            errorPhone: '',
        }

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
                url: `${BASE_URL}/customer/ads/enquiry`,
                method: 'POST',
                data:{
                    id: this.state.id,
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

        let {id, name, email, message, phone, loaderStatus} = this.state;

        return (
            <>
                {loaderStatus == true ? <Loader /> : ''}
                <section className="section-enquire" id="ad_enquire" ref={this.props.refprop}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-8 mx-auto">
                                <div className="enquire-form-panel">
                                <h4 className="title text-center text-brand">Enquire About the Ad</h4>
                                <div className="form-group">
                                    <textarea className="form-control" rows="3" name="message" value={message} onChange={(e) => this.handleChange(e)} placeholder="Your message"></textarea>
                                    {this.state.errorMessage ? <span style={{color: 'red'}}>{this.state.errorMessage}</span> : ''}
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="name" value={name} onChange={(e) => this.handleChange(e)} placeholder="Your name" />
                                    {this.state.errorName ? <span style={{color: 'red'}}>{this.state.errorName}</span> : ''}
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control" name="email" value={email} onChange={(e) => this.handleChange(e)} placeholder="Your email" />
                                    {this.state.errorEmail ? <span style={{color: 'red'}}>{this.state.errorEmail}</span> : ''}
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="phone" value={phone} onChange={(e) => this.handleChange(e)} placeholder="Your phone" />
                                    {this.state.errorPhone ? <span style={{color: 'red'}}>{this.state.errorPhone}</span> : ''}
                                </div>
                                {/* <div className="form-group">
                                    <input type="text" className="form-control" onChange={(e) => this.handleChange(e)} placeholder="Inquire Now" />
                                </div> */}
                                <div className="form-group">
                                    <button onClick={(e) => this.handleSubmit(e)} className="btn btn-primary d-block w-100">Enquire Now</button>
                                </div>
                                <div className="form-note text-center">
                                    By clicking on ‘Enquire Now’, I agree to the Red Sea Market <Link to="/terms/conditions"> Terms &amp; Conditions</Link> and <Link to="/privacy/policy"> Privacy Policy</Link>
                                </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="row">
                            <div className="col-12">
                                <div className="report-ad-panel text-center mt-4 mt-md-5">
                                Is there an issue? <br /><a href="#">Report this Ad Now</a>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </section>
            </>
        )
    }
}
