import axios from 'axios';
import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
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
            changePasswordModal: false,
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',

            passwordError: '',
            newPasswordError: '',
            confirmPasswordError: '',

            adView: 0,
            
        }
    }

    componentWillMount(){

        if(sessionStorage.getItem('loginStatus') === 'false' || sessionStorage.getItem('loginStatus') === false){

            this.props.history.push('/');
        }

        this.setState({
            loaderState: false,
        });

        axios({
            url: `${BASE_URL}/customer/view/profile`,
            method: 'POST',
            headers:{ Authorization: "Bearer " + this.state.token },
        }).then(response => {

            if(response.data.status == 'success'){
                this.setState({
                    myAds: response.data.data.myads,
                    myFavourite: response.data.data.myfavourite,
                    user: response.data.data.user,
                    adView: response.data.data.adsView,
                }, () => {
                    this.setState({
                        name: this.state.user.name,
                        email: this.state.user.email,
                        phone: this.state.user.phone,
                        nationality: this.state.user.nationality_id,
                    });
                });
            }

            this.setState({
                loaderState: false,
            })

        }).catch((error) => {
            this.setState({
                loaderState: false,
            });
        })

        this.setState({
            loaderState: false,
        });

        axios({
            url: `${BASE_URL}/customer/get/country`,
            method: 'POST',
        }).then(response => {

            if(response.data.status == 'success'){
                this.setState({
                    country: response.data.country,
                });
            }

            this.setState({
                loaderState: false,
            })

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
            }

            this.setState({
                loaderState: false,
            });

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
            }

            this.setState({
                loaderState: false,
            });

        }).catch((error) => {
            this.setState({
                loaderState: false,
            });
        });
    }

    changePasswordModal = () => {

        this.setState({
            changePasswordModal: !this.state.changePasswordModal,
        });
    }

    onChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value,
        }, () => {

            switch(e.target.name){
                case 'oldPassword':
                    this.setState({
                        passwordError: this.state.oldPassword ? '' : 'Current password cannot be blank!',
                    });
                    break;
                case 'newPassword':
                    this.setState({
                        newPasswordError: this.state.newPassword ? '' : 'New password cannot be blank!',
                    });
                    break;
                case 'confirmPassword':
                    this.setState({
                        confirmPasswordError: this.state.confirmPassword ? '' : 'Confirm password cannot be blank!',
                    });
                    break;
                default:
                    break;
            }

        });
    }

    changePasswordSubmit = (e) => {

        e.preventDefault();

        if(this.state.oldPassword && this.state.newPassword && this.state.confirmPassword){

            axios({
                url: `${BASE_URL}/customer/change/password`,
                method: 'POST',
                headers:{ Authorization: "Bearer " + this.state.token },
                data: {
                    old_password: this.state.oldPassword,
                    password: this.state.newPassword,
                    password_confirmation: this.state.confirmPassword,
                },

            }).then(response => {

                if(response.data.status === 'success'){
                    
                    Swal.fire({
                        title: 'success!',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                }

                if(response.data.status === 'error'){
                    Swal.fire({
                        title: 'Error!',
                        text: response.data.message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }

                this.setState({
                    changePasswordModal: !this.state.changePasswordModal,
                });

            }).catch((error) => {
                
                if(error.response.data.status === 'error'){
                    Swal.fire({
                        title: 'Error!',
                        text: error.response.data.message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }

                this.setState({
                    changePasswordModal: !this.state.changePasswordModal,
                });

            });
        }
        else{
            this.setState({
                passwordError: this.state.oldPassword ? '' : 'Current password cannot be blank!',
                newPasswordError: this.state.newPassword ? '' : 'New password cannot be blank!',
                confirmPasswordError: this.state.confirmPassword ? '' : 'Confirm password cannot be blank!',
            });
        }
    }

    render() {

        let {token, myAds, myFavourite, user, loginStatus, country, name, email, phone, nationality, loaderState} = this.state;

        let adView = this.state.adView;

        let ErrorStyle = {
            color: 'red',
        };

        let modalLogin ={
            position:  'fixed',
            width: '600px',
            top: '40px',
            left: 'calc(50% - 300px)',
            bottom: '40px',
        }
        
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
                                    <div className="col-lg-4 text-center"><a href="javascript:void(0);" onClick={this.changePasswordModal} className="btn btn-link px-0 py-1 font-weight-bold text-uppercase">Change Password</a></div>
                                </div>
                                <div className="row mt-4 mt-lg-5">
                                    <div className="col-12 d-flex justify-content-center">
                                    <div className="my-profile-count-box w-100 shadow py-3 px-3 rounded-lg text-center">
                                        <small className="font-weight-bold text-muted d-inline-block w-100">My Ads</small>
                                        <h4 className="m-0 pt-2 pb-1">{myAds}</h4>
                                        <small className="font-weight-bold text-muted d-inline-block w-100">ads viewed {adView} times</small>
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
                                                    if(country.id == nationality){
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

                <Modal className="modal fade log-sign-modal" show={this.state.changePasswordModal}  style={modalLogin} id="changeModal" tabindex="-1" aria-labelledby="changeModalLabel" aria-hidden="true">
                                
                    <Modal.Body>
                            
                        <button  onClick={ this.changePasswordModal }  type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                        <h5 className="modal-title text-center text-brand">Change your password</h5>
                        <div className="modal-form">
                            <div className="form-group">           
                                <input type="password" value={this.state.oldPassword}  onChange={this.onChange} name="oldPassword" className="form-control" placeholder="Current Password"/>
                                {this.state.passwordError && <p className="help-block help-block-error"  style={ErrorStyle}>{this.state.passwordError}</p>}
                            </div>
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
        )
    }
}
