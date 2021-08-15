import axios from 'axios';
import React, { Component } from 'react'
import { BASE_URL, userToken } from '../../projectString';
import Header from '../layouts/header'
import Breadcrumb from './breadcrumb'
import Loader from '../Loader';
import NavLinks from './NavLinks'
import SweetAlert from 'sweetalert2-react';
import Swal from 'sweetalert2'

export default class profile extends Component {

    constructor(props){
        super(props);

        this.state = {
            token: userToken,
            myAds: '',
            myFavourite: '',
            user: '',
            loginStatus: true,
            country: [],
            name: '',
            email: '',
            phone: '',
            nationality: '',
            loaderState: false,
            
        }
    }

    componentWillMount(){

        this.setState({
            loaderState: true,
        });

        axios({
            url: `${BASE_URL}/customer/view/profile`,
            method: 'POST',
            headers:{ Authorization: "Bearer " + this.state.token },
        }).then(response => {

            if(response.data.status == 'success'){
                this.setState({
                    myAds:response.data.data.myads,
                    myFavourite:response.data.data.myfavourite,
                    user:response.data.data.user,
                    loaderState: false,
                }, () => {
                    this.setState({
                        name: this.state.user.name,
                        email: this.state.user.email,
                        phone: this.state.user.phone,
                        nationality: this.state.user.nationality_id,
                    });
                });
            }

        }).catch((error) => {
            this.setState({
                loaderState: false,
            })
        })

        this.setState({
            loaderState: true,
        })

        axios({
            url: `${BASE_URL}/customer/get/country`,
            method: 'POST',
        }).then(response => {

            if(response.data.status == 'success'){
                this.setState({
                    country: response.data.country,
                    loaderState: false,
                });
            }

        }).catch((error) => {
            this.setState({
                loaderState: false,
            })
        })
    }

    logout = (e) => {

        this.setState({
            loaderState: true,
        })

        e.preventDefault();
        
        localStorage.removeItem('userToken');
        sessionStorage.removeItem('loginStatus');
   
        sessionStorage.setItem('loginStatus',false);
      
        // localStorage.setItem('loginStatus', false);
        this.setState({loginStatus:false});
        axios({
            url: `${BASE_URL}/customer/logout`,
            method: 'POST',
            headers:{ Authorization: "Bearer " + this.state.token },

        }).then(response => {

            if(response.data.status === 'success'){
                this.props.history.push('/');
                this.setState({
                    loaderState: false,
                })
            }

        }).catch((error) => {
            this.props.history.push('/');
        });

    }

    valueChange = (e) => {
        
        this.setState({
            [e.target.name]:e.target.value,
        });
    }

    handleSubmit = () => {

        this.setState({
            loaderState: true,
        });

        axios({
            url: `${BASE_URL}/customer/update/profile`,
            method: 'POST',
            headers:{ Authorization: "Bearer " + this.state.token },
            data: {
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                nationality: this.state.nationality,
            },
        }).then(response => {

            if(response.data.status === 'success'){

                Swal.fire({
                    title: 'success!',
                    text: response.data.message,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                this.setState({
                    loaderState: false,
                });

            }

        }).catch((error) => {
            this.setState({
                loaderState: false,
            });
        });
    }

    render() {

        let {token, myAds, myFavourite, user, loginStatus, country, name, email, phone, nationality, loaderState} = this.state;
        
        return (
            <div id="page" className="site-page">
                {loaderState == true ? <Loader /> :
                <>
                    <Header loginStatus={loginStatus} user={user.name}/>
                    <Breadcrumb section="My Profile" />

                    {/* <!-- =====[SECTION MY PROFIL]===== --> */}
                    <section className="section-my-profile pt-4 pb-5">
                        <div className="container">

                            <NavLinks linkState="myprofile" />

                            <div className="my-profile-title-panel">
                                <div className="row">
                                    <div className="col-lg-8 text-center"><h5 className="title py-1 mb-0">{user.name} <small className="d-block d-sm-inline"> (not {user.name} ? <a onClick={(e) => this.logout(e)}>Logout</a>)</small></h5></div>
                                    <div className="col-lg-4 text-center"><a href="#" className="btn btn-link px-0 py-1 font-weight-bold text-uppercase">Change Password</a></div>
                                </div>
                                <div className="row mt-4 mt-lg-5">
                                    <div className="col-12 d-flex justify-content-center">
                                    <div className="my-profile-count-box w-100 shadow py-3 px-3 rounded-lg text-center">
                                        <small className="font-weight-bold text-muted d-inline-block w-100">My Ads</small>
                                        <h4 className="m-0 pt-2 pb-1">{myAds}</h4>
                                        <small className="font-weight-bold text-muted d-inline-block w-100">ads viewed 0 times</small>
                                    </div>
                                    <div className="my-profile-count-box w-100 shadow py-3 px-3 rounded-lg text-center">
                                        <small className="font-weight-bold text-muted d-inline-block w-100">My Favorites</small>
                                        <h4 className="m-0 pt-2 pb-1">{myFavourite}</h4>
                                        <small className="font-weight-bold text-muted d-inline-block w-100">ads saved</small>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="my-profile-form">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-7 col-md-8 mx-auto">
                                    <div className="row form-group align-items-center">
                                        <label className="col-lg-4 col-form-label">Name :</label>
                                        <div className="col-lg-8">
                                            <input type="text" name="name" onChange={(e) => this.valueChange(e)} className="form-control" value={name} placeholder="Name" />
                                        </div>
                                    </div>
                                    <div className="row form-group align-items-center">
                                        <label className="col-lg-4 col-form-label">Email :</label>
                                        <div className="col-lg-8">
                                            <input type="email" name="email" onChange={(e) => this.valueChange(e)} className="form-control" value={email} placeholder="Email" />
                                        </div>
                                    </div>
                                    <div className="row form-group align-items-center">
                                        <label className="col-lg-4 col-form-label">Phone :</label>
                                        <div className="col-lg-8">
                                            <input type="number" name="phone" onChange={(e) => this.valueChange(e)} className="form-control" value={phone} placeholder="phone" />
                                        </div>
                                    </div>
                                    <div className="row form-group align-items-center">
                                        <label className="col-lg-4 col-form-label">Nationality :</label>
                                        <div className="col-lg-8">
                                            <select className="form-control" onChange={(e) => this.valueChange(e)} name="nationality">
                                                
                                                {country && country.map((country, index) => {
                                                    if(country.id === nationality){
                                                        return <option selected key={index} value={country.id}>{country.name}</option>
                                                    }
                                                    else{
                                                        return <option key={index} value={country.id}>{country.name}</option>
                                                    }
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row form-group align-items-center">
                                        <label className="col-lg-4 col-form-label">Username :</label>
                                        <div className="col-lg-8">
                                            <input type="email" className="form-control" value={user.email} placeholder="Username" />
                                        </div>
                                    </div>
                                    <div className="row form-group align-items-start">
                                        <div className="col-lg-8 ml-auto">
                                            <button type="button" onClick={this.handleSubmit} className="btn btn-primary w-100">Update</button>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>}
            </div>
        )
    }
}
