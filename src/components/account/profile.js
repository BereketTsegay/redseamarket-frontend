import axios from 'axios';
import React, { Component } from 'react'
import { BASE_URL } from '../../projectString';
import Header from '../layouts/header'
import Breadcrumb from './breadcrumb'
import NavLinks from './NavLinks'

export default class profile extends Component {

    constructor(props){
        super(props);

        this.state = {
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYjU4YmRmYmMyMGJiNjkzYTRkYjk4NWJmZmU4MDVmMDc5MDhhZjRiNDIzNDE0NDZlNjFkMjA5ZmZhNWI5MWQ5ZWUwZDI2NTRiNmFiMzNjNTgiLCJpYXQiOjE2Mjc5NzQ4MzEsIm5iZiI6MTYyNzk3NDgzMSwiZXhwIjoxNjU5NTEwODMxLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.kpYGxzQQ9BHHM2Mu-YAEkX2dm-Ouag2XHNlk2km-Cwag4LGgPrdfN3OowFuzTrmPzsUri2AmPVXyjeQDpKb_J0MWFXXgRJcmw5gu-ZoFFGwDbR1XXgIgNGTHEm_uiphalhRoSvGKRrBnY8xUI8I9TRqaFXBlKlbebCTAh8el8f75lzI9b5NBIB8L_G_asDgRk65_PRKOyICxRH0DdbCs2vSbxxUTCSUQPqJK3a2Z4xB204Lx8_OeENKydcHBYaftiCdTywZWWMdxqOHtEstZSTE8AN-K256McS49qZjl5H7aYNyP5Uv9iW6_64vOw57T9-epxdP8Gwa3ZF5_nEz6G2H1NtbHpAad2leXOQul1FTXJ08QeMobTfceor0QiSnxWb9rb3AC3JS4AKsQ-EWDMJ6YKE1NJEuKVkImYPZ4j9y8_dAD0B7hMybULg0k4rQIluhDXBMp9WMw4OYcXUO0WFg93sV5IkMp9P_PPUDZ2AS6O3hHL2pS9ViOMAbg8YqfODlD6ExPDsV8rTmhdNtg3DuV7DNjWYnnpcND--Yv5q30QEXDBpv39D6BU2FSVp14EzytTGnQxGceIMHKAvW-pBFiKQWTiBxdJNtZeolT8ZIUWJIo-8u34RHUrF131B-VSc3y5fTMRM8WbG1J--YTn6fSblsQPZA3AnECQ3dVsCo',
            myAds: '',
            myFavourite: '',
            user: '',
            loginStatus: true,
            name: '',
        }
    }

    componentWillMount(){

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
                });
            }

        }).catch((error) => {

        })
    }

    logout = (e) => {

        e.preventDefault();
        
        axios({
            url: `${BASE_URL}/customer/logout`,
            method: 'POST',
            headers:{ Authorization: "Bearer " + this.state.token },

        }).then(response => {

            if(response.data.status === 'success'){
                this.props.history.push('/');
            }

        }).catch((error) => {

        });

    }

    render() {

        let {myAds, myFavourite, user, loginStatus, name} = this.state;

        return (
            <div id="page" className="site-page">

                <Header loginStatus={loginStatus} user={user.name}/>
                <Breadcrumb section="My Profile" />

            {/* <!-- =====[SECTION MY PROFIL]===== --> */}
            <section className="section-my-profile pt-4 pb-5">
                <div className="container">

                    <NavLinks linkState="myprofile" />

                    <div className="my-profile-title-panel">
                        <div className="row">
                            <div className="col-lg-8 text-center"><h5 className="title py-1 mb-0">{user.name} <small className="d-block d-sm-inline"> (not {user.name} ? <a onClick={(e) => this.logout(e)}>Logout</a>)</small></h5></div>
                            <div className="col-lg-4 text-center"><a href="#" className="btn btn-link px-0 py-1 font-weight-bold text-uppercase">Account Settings</a></div>
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
                                    <input type="text" className="form-control" value={name} placeholder="Name" />
                                </div>
                            </div>
                            <div className="row form-group align-items-center">
                                <label className="col-lg-4 col-form-label">Gender :</label>
                                <div className="col-lg-8">
                                    <select className="form-control">
                                        <option selected>Select Gender</option>
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row form-group align-items-center">
                                <label className="col-lg-4 col-form-label">Nationality :</label>
                                <div className="col-lg-8">
                                    <select className="form-control">
                                        <option selected>Select Nationality</option>
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row form-group align-items-center">
                                <label className="col-lg-4 col-form-label">Date of Birth :</label>
                                <div className="col-lg-8">
                                    <input type="date" className="form-control" />
                                </div>
                            </div>
                            <div className="row form-group align-items-center">
                                <label className="col-lg-4 col-form-label">Career Level :</label>
                                <div className="col-lg-8">
                                    <select className="form-control">
                                        <option selected>Select</option>
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row form-group align-items-center">
                                <label className="col-lg-4 col-form-label">Current Location :</label>
                                <div className="col-lg-8">
                                    <select className="form-control">
                                        <option selected>Select Location</option>
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row form-group align-items-center">
                                <label className="col-lg-4 col-form-label">Current Position :</label>
                                <div className="col-lg-8">
                                    <select className="form-control">
                                        <option selected>Select Position</option>
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row form-group align-items-center">
                                <label className="col-lg-4 col-form-label">Current Company :</label>
                                <div className="col-lg-8">
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="row form-group align-items-center">
                                <label className="col-lg-4 col-form-label">Salary Expectations :</label>
                                <div className="col-lg-8">
                                    <select className="form-control">
                                        <option selected>Select Salary Expectations</option>
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row form-group align-items-center">
                                <label className="col-lg-4 col-form-label">Commitment:</label>
                                <div className="col-lg-8">
                                    <select className="form-control">
                                        <option selected>Select</option>
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row form-group align-items-center">
                                <label className="col-lg-4 col-form-label">Notice Period:</label>
                                <div className="col-lg-8">
                                    <select className="form-control">
                                        <option selected>Select</option>
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row form-group align-items-center">
                                <label className="col-lg-4 col-form-label">Visa Status:</label>
                                <div className="col-lg-8">
                                    <select className="form-control">
                                        <option selected>Select Status</option>
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row form-group align-items-center">
                                <label className="col-lg-4 col-form-label">Highest Education: </label>
                                <div className="col-lg-8">
                                    <select className="form-control">
                                        <option selected>My highest academic achievement is</option>
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row form-group align-items-start">
                                <label className="col-lg-4 col-form-label">Your CV</label>
                                <div className="col-lg-8">
                                    <div className="form-group">
                                        <p>Your latest CV was uploaded some time ago.Your possible future employer would like to know all about the hard work you’ve done up until today. To stay current, please update and upload your latest CV. Good luck!</p>
                                    </div>
                                    <div className="form-group custom-file">
                                        <input type="file" className="custom-file-input" id="customFile" />
                                        <label className="custom-file-label" for="customFile">No file chosen</label>
                                    </div>
                                    <div className="form-group">
                                        <textarea className="form-control" rows="3" placeholder="Your CV Summary"></textarea>
                                    </div>
                                    <div className="fg-table-frame">
                                        <div className="row fg-table">
                                        <div className="col-5">
                                            <label for="">I’ve got</label>
                                            <select className="form-control">
                                                <option selected>—-</option>
                                                <option>Option 1</option>
                                                <option>Option 2</option>
                                            </select>
                                        </div>
                                        <div className="col-7">
                                            <label for="">experience in</label>
                                            <select className="form-control">
                                                <option selected>—-</option>
                                                <option>Option 1</option>
                                                <option>Option 2</option>
                                            </select>
                                        </div>
                                        </div>
                                        <div className="row fg-table">
                                        <div className="col-5">
                                            <label for="">I’ve got</label>
                                            <select className="form-control">
                                                <option selected>—-</option>
                                                <option>Option 1</option>
                                                <option>Option 2</option>
                                            </select>
                                        </div>
                                        <div className="col-7">
                                            <label for="">experience in</label>
                                            <select className="form-control">
                                                <option selected>—-</option>
                                                <option>Option 1</option>
                                                <option>Option 2</option>
                                            </select>
                                        </div>
                                        </div>
                                        <div className="row fg-table">
                                        <div className="col-5">
                                            <label for="">I’ve got</label>
                                            <select className="form-control">
                                                <option selected>—-</option>
                                                <option>Option 1</option>
                                                <option>Option 2</option>
                                            </select>
                                        </div>
                                        <div className="col-7">
                                            <label for="">experience in</label>
                                            <select className="form-control">
                                                <option selected>—-</option>
                                                <option>Option 1</option>
                                                <option>Option 2</option>
                                            </select>
                                        </div>
                                        </div>
                                        <div className="row">
                                        <div className="col-12 text-right">
                                            <button className="btn btn-link">+ Add Industry</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row form-group align-items-start">
                                <label className="col-lg-4 col-form-label">Please send me: </label>
                                <div className="col-lg-8">
                                    <div className="custom-control custom-checkbox mb-3">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                        <label className="custom-control-label font-weight-normal" for="customCheck1">The weekly dubizzle newsletter of the most popular steals across the dubizzle site. </label>
                                    </div>
                                    <div className="custom-control custom-checkbox mb-3">
                                        <input type="checkbox" className="custom-control-input" id="customCheck2" />
                                        <label className="custom-control-label font-weight-normal" for="customCheck2">Amazing offers and bargains from our advertising partners.</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row form-group align-items-start">
                                <div className="col-lg-8 ml-auto">
                                    <button className="btn btn-primary w-100">Update</button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
         </div>
        )
    }
}
