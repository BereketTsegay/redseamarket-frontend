import axios from 'axios'
import React, { Component } from 'react'
import { BASE_URL, GOOGLEMAPS_API, IMAGE_URL, userToken } from '../../projectString'
import AppDownload from '../home/app-download'
import { Button, Modal } from 'react-bootstrap';
import defaultImage from '../../../src/web-assets/img/icon-256x256.png';
import Footer from '../layouts/footer'
import Header from '../layouts/header'
import Loader from '../Loader';
import Swal from 'sweetalert2';
import CurrencyFormat from 'react-currency-format';
import Iframe from 'react-iframe'

let user = localStorage.getItem('user') != '' ? localStorage.getItem('user') : '';
let currency = localStorage.getItem('currency') ? localStorage.getItem('currency') : 'USD';
let currency_value=localStorage.getItem('currency_value') ;
 currency_value = currency_value&&(currency_value!='null')? localStorage.getItem('currency_value') : 0;
export default class profileDetails extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            id:this.props.match.params.id,
            mainImage: null,
            modalShow: false,
            phone: '',
            Name: '',
            loaderStatus: false,
            token: userToken,
            profile:'', 
            user:'' ,
            cvShow:false,
            userLogin:false           
        }
    }

    componentWillMount(){

        this.setState({
            loaderStatus: true,
        });

        if(localStorage.getItem('loginStatus') === 'false' || localStorage.getItem('loginStatus') === false)
         {
            this.setState({
                userLogin: false,
            });
          
         }else{
            this.setState({
                userLogin: true,
            });  
         }

      // console.log(this.state.id);


      axios({
        url: `${BASE_URL}/get/jobprofile/detail`,
        method: 'POST',
        headers: {
            Authorization: "Bearer " + userToken,
        },
        data:{
            profile_id: this.state.id,
        }
    }).then(response => {

        if(response.data.status == 'success'){
            this.setState({
                profile:response.data.data,
                user:response.data.data.user
            })
        }
       

        this.setState({
            loaderStatus: false,
        });
       // console.log(this.state.profile);

    }).catch((error) => {
        this.setState({
            loaderStatus: false,
        });
    });

       
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);
    }


    mainImageChange = (image) => {
        this.setState({
            mainImage:image,
        });
    }

    showPhone = (phone, name) => {
        this.setState({ 
            modalShow: !this.state.modalShow,
            phone: phone,
            Name: name,
         });
    }

    showCv = () => {
        this.setState({ 
            cvShow: !this.state.cvShow,
            cvDoc: this.state.profile.cv_file
         });
    }

  

   

    scrollToRef = () => this.myRef.current.scrollIntoView()


    render() {
        
        let {user,phone,Name, profile, loaderStatus,cvDoc,userLogin} = this.state;
        
            let modalLogin ={
                position:  'fixed',
                width: '100%',
                top: '40px',
                bottom: '40px',
            }

            let modalCv ={
                position:  'fixed',
                width: '100%',
                height:'100%',
                top: '40px',
                bottom: '40px',
            }

            let ErrorStyle = {
                color: 'red',
            };
           
        return (
            <div id="page" className="site-page">
                {loaderStatus == true ? <Loader /> : ''}
                <>
                <Header />
                <section className="section-breadcrumb">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-7">
                                <ol className="breadcrumb breadcrumb-alt bg-white m-0 p-0">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Profile</li>
                                </ol>
                            </div>
                           
                        </div>
                    </div>
                </section>
                {window.scrollTo(0, 0)}
                
                        <div >
                            <section className="section-single-main pt-3">
                                <div className="container">
                                    <div className="row row-product-main">
                                        <div className="col-xl-7 col-product-gallery">
                                            <div className="product-gallery-main">
                                            <div className="row flex-row-reverse">
                                                <div className="col-md-10">
                                                    <div className="product-gallery-xl">
                                                        <img src={user.image ? IMAGE_URL+'/'+user.image : defaultImage} alt="media" />
                                                    </div>
                                                </div>
                                               
                                            </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-5 col-product-info">
                                            <div className="product-info d-flex align-items-center h-100">
                                            <div className="w-100">
                                                <h3 className="product-title">{user.name ? user.name :  ''}</h3>
                                                <p className="product-title">{profile.title ? profile.title :  ''}</p>
                                                <p className="product-desc">Overview : {profile.overview ? profile.overview : ''}</p>
                                                <p>Email : {user.email}</p>
                                                <p>Work Experiance : {profile.work_experience}</p>
                                                <p>Skils : {profile.skils}</p>
                                                <p>Certificates : {profile.certificate}</p>
                                                <p>Languages : {profile.language}</p>

                                                                                      
                                                <div className="product-location">
                                                    <img src="assets/img/pdt-location.svg" alt="media" />
                                                    {profile.country_name}, {profile.state_name}, {profile.city_name}
                                                </div>
                                                
                                                <div className="product-btn-group d-flex justify-content-between">
                                                  
                                                     <a href="javascript:void(0);" onClick={() => this.showPhone(user ? user.phone : '', user ? user.name : '')} className="btn btn-primary has-icon d-block">
                                                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                                         Show Phone Number
                                                     </a>
                                                     {userLogin==true ? 
                                                     <a href='javascript:void(0);' onClick={() => this.showCv()}  className="btn btn-danger has-icon d-block">
                                                         View Resume
                                                     </a>
                                                       :'' }
                                                </div>

                                               
                                               
                                                   
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            
                           
                        </div>
                   
                

                <AppDownload />
                <Footer/>

                <div className="container">
                    <Modal className="modal fade log-sign-modal" show={this.state.modalShow}  style={modalLogin} id="mobileModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                        
                        <Modal.Body>
                       
                                <button  onClick={() => this.showPhone('') }  type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                                <h5 className="modal-title text-center text-brand">Phone Number</h5>
                                <div className="modal-form text-center">
                                    
                                    <label>Name : {Name}</label>
                                    <br />
                                    <a href={`tel:${phone}`}>{phone}</a>

                                </div>
                        </Modal.Body>
                        
                    </Modal>


                    <Modal className="modal fade log-sign-modal cv-show" show={this.state.cvShow}  style={modalCv} id="mobileModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                        
                        <Modal.Body style={{width:'800px;'} }>
                       
                                <button  onClick={() => this.showCv()}  type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                                {/* <h5 className="modal-title text-center text-brand">Resume</h5> */}
                                <div className="modal-form text-center">
                                    
                                {profile.cv_file != null? <Iframe url={IMAGE_URL+'/'+ profile.cv_file}
                                                        width="700px"
                                                        height="600px"
                                                        display="block"
                                                        position="relative"/> : ''}

                                </div>
                        </Modal.Body>
                        
                    </Modal>

                   

                    
                  
                  </div>
                </>
            </div>
        )
    }
}
