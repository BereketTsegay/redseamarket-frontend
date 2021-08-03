import axios from 'axios';
import React, { Component } from 'react'
import { BASE_URL } from '../../projectString';

export default class adEnquire extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: this.props.adsId,
            name: null,
            email: null,
            message: null,
            phone:null,

        }

    }

    handleChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value,
        });

        
    }

    handleSubmit = (e) => {

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
            }

        }).catch((error) => {

        });

    }

    render() {

        let {id, name, email, message, phone} = this.state;

        return (
            <section className="section-enquire" id="ad_enquire">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-8 mx-auto">
                                <div className="enquire-form-panel">
                                <h4 className="title text-center text-brand">Enquire About the Ad</h4>
                                <div className="form-group">
                                    <textarea className="form-control" rows="3" name="message" value={message} onChange={(e) => this.handleChange(e)} placeholder="Your message"></textarea>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="name" value={name} onChange={(e) => this.handleChange(e)} placeholder="Your name" />
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control" name="email" value={email} onChange={(e) => this.handleChange(e)} placeholder="Your email" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="phone" value={phone} onChange={(e) => this.handleChange(e)} placeholder="Your phone" />
                                </div>
                                {/* <div className="form-group">
                                    <input type="text" className="form-control" onChange={(e) => this.handleChange(e)} placeholder="Inquire Now" />
                                </div> */}
                                <div className="form-group">
                                    <button onClick={(e) => this.handleSubmit(e)} className="btn btn-primary d-block w-100">Enquire Now</button>
                                </div>
                                <div className="form-note text-center">
                                    By clicking on ‘Enquire Now’, I agree to the Jamal al bahr <a href="#"> Terms & Conditions</a> and <a href="#"> Privacy Policy</a>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="report-ad-panel text-center mt-4 mt-md-5">
                                Is there an issue? <br /><a href="#">Report this Ad Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        )
    }
}
