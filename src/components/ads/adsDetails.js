import axios from 'axios'
import React, { Component } from 'react'
import { BASE_URL, GOOGLEMAPS_API, IMAGE_URL, userToken } from '../../projectString'
import AppDownload from '../home/app-download'
import { Button, Modal } from 'react-bootstrap';
import defaultImage from '../../../src/web-assets/img/icon-256x256.png';
import Footer from '../layouts/footer'
import Header from '../layouts/header'
import AdEnquire from './adEnquire'
import MotorProperty from './motorProperty';
import PropertyForRendProperty from './propertyForRendProperty';
import Loader from '../Loader';
import Swal from 'sweetalert2';
let currency = localStorage.getItem('currency') ? localStorage.getItem('currency') : 'USD';
let currency_value=localStorage.getItem('currency_value') ;
 currency_value = currency_value&&(currency_value!='null')? localStorage.getItem('currency_value') : 0;
export default class adsDetails extends Component {

    constructor(props){
        super(props);
        
        this.myRef = React.createRef();
        this.topRef = React.createRef();

        this.state = {
            id:this.props.match.params.id,
            ads: [],
            mainImage: null,
            modalShow: false,
            phone: '',
            sellerName: '',
            loaderStatus: false,
            paymentId: '',
            documentModal: false,
            uploadModal:false,
            transactionId: '',
            paymentSlip: '',
            fileName: '',
            fileUploads:[],
            cvDocument: '',
            lasypay:'',
            errors_transaction_id: '',
            errors_payment_slip: '',
            errors_cv_doc: '',
            token: userToken,
        }
    }

    componentWillMount(){

        this.setState({
            loaderStatus: true,
        });

        axios({
            url: `${BASE_URL}/customer/ad/view`,
            method: 'POST',
            data:{
                ads_id: this.state.id,
                country_id: localStorage.getItem('country_id'),
            }
        }).then(response => {

            if(response.data.status == 'success'){
                console.log(response.data);
                this.setState({
                    lasypay:response.data.lastpay,
                    ads: response.data.ads,
                    phone: response.data.ads[0] ? response.data.ads[0].SellerInformation ? response.data.ads[0].SellerInformation.phone : '' : '',
                })
            }
            else{

                Swal.fire({
                    title: 'Error!',
                    icon: 'danger',
                    text: response.data.message,
                    confirmButtonText: 'OK',
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

    componentDidMount = () => {
        window.scrollTo(0, 0);
    }

    handleChange = (e) => {

        this.setState({
            transactionId: e.target.value,
        });
    }

    fileChange = (e) => {

        e.preventDefault();

        let files = e.target.files || e.dataTransfer.files;

        if (!files.length)
                return;

        
        for(let i = 0; i < files.length; i++){
            
            this.createFile(files[i]);
        }

    }

    createFile = (file) => {

        let reader = new FileReader();

        reader.onload = (e) => {
            this.setState({
                paymentSlip: e.target.result,
                fileUploads:[...this.state.fileUploads,{
                    paymentSlip: e.target.result,
                    fileName: file.name,
                }],
            });
        };

        reader.readAsDataURL(file);
    }

    cvChange = (e) => {

        e.preventDefault();

        let doc = e.target.files || e.dataTransfer.files;

        if (!doc.length)
                return;

        
        for(let i = 0; i < doc.length; i++){
            
            this.createDoc(doc[i]);
        }

    }

    createDoc = (file) => {

        let reader = new FileReader();

        reader.onload = (e) => {
            this.setState({
                cvDocument: e.target.result,
                fileName: file.name,
            });
        };

        reader.readAsDataURL(file);
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
            sellerName: name,
         });
    }

    uploadDocument = () => {
        this.setState({
            documentModal: !this.state.documentModal,
        });
    }

    uploadCvDocument = () => {
        this.setState({
            uploadModal: !this.state.uploadModal,
        });
    }

    paymentSubmit = () => {

        if(this.state.transactionId !== '' && this.state.paymentSlip !== ''){

            axios({
                url: `${BASE_URL}/customer/uploade/payment_slip`,
                method: 'POST',
                headers: {
                    Authorization: "Bearer " + this.state.token,
                },
                data: {
                    id: this.state.id,
                    transaction_id: this.state.transactionId,
                    payment_slip: this.state.fileUploads,
                }
            }).then(response => {
                if( response.data.status === 'success'){
                    Swal.fire({
                        title: 'Success!',
                        icon: 'success',
                        text: response.data.message,
                        confirmButtonText: 'OK',
                    });

                    this.setState({
                        documentModal: !this.state.documentModal,
                        lasypay:1
                    });
                }else{
                    //console.log(response);
                    Swal.fire({
                        title: 'Error!',
                        icon: 'danger',
                        text: response.data.errors.transaction_id[0],
                        confirmButtonText: 'OK',
                    });

                    this.setState({
                        documentModal: !this.state.documentModal,
                    });
                }
                

            }).catch((error) => {

            });
        }
        else{

            if(this.state.transactionId === ''){
                this.setState({
                    errors_transaction_id: 'Transaction Id cannot be blank',
                });
            }
            if(this.state.paymentSlip === ''){
                this.setState({
                    errors_payment_slip: 'Payment Slip cannot be blank',
                });
            }
        }
    }
    cvSubmit = () => {

        if(this.state.cvDocument !== ''){

            axios({
                url: `${BASE_URL}/uploade/cv_document`,
                method: 'POST',
                data: {
                    id: this.state.id,
                    cv_doc: this.state.cvDocument,
                }
            }).then(response => {
                if( response.data.status === 'success'){
                    Swal.fire({
                        title: 'Success!',
                        icon: 'success',
                        text: response.data.message,
                        confirmButtonText: 'OK',
                    });

                    this.setState({
                        uploadModal: !this.state.uploadModal,
                    });
                }else{
                    //console.log(response);
                    Swal.fire({
                        title: 'Error!',
                        icon: 'danger',
                        text: 'error',
                        confirmButtonText: 'OK',
                    });

                    this.setState({
                        uploadModal: !this.state.uploadModal,
                    });
                }
                

            }).catch((error) => {

            });
        }
        else{
           
            if(this.state.cvDocument === ''){
                this.setState({
                    errors_cv_doc: 'Document cannot be blank',
                });
            }
        }
    }

    scrollToRef = () => this.myRef.current.scrollIntoView()


    render() {
        
        let {id, ads, mainImage, modalShow, phone, sellerName, loaderStatus} = this.state;
        
            let modalLogin ={
                position:  'fixed',
                width: '100%',
                top: '40px',
                bottom: '40px',
            }

            let ErrorStyle = {
                color: 'red',
            };
           
        return (
            <div id="page" className="site-page">
                <div ref={this.topRef}></div>
                {loaderStatus == true ? <Loader /> : ''}
                <>
                <Header />
                <section className="section-breadcrumb">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-7">
                                <ol className="breadcrumb breadcrumb-alt bg-white m-0 p-0">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Ads</li>
                                </ol>
                            </div>
                            <div className="col-md-5">
                                <p className="breadcrumb-note mb-0 mt-2 mt-md-0 text-left text-md-right">Reference ID: JAB-{id}</p>
                            </div>
                        </div>
                    </div>
                </section>
                {window.scrollTo(0, 0)}
                {ads.map((ads, index) => {

                    return (
                        <div key={index}>
                            <section className="section-single-main pt-3">
                                <div className="container">
                                    <div className="row row-product-main">
                                        <div className="col-xl-7 col-product-gallery">
                                            <div className="product-gallery-main">
                                            <div className="row flex-row-reverse">
                                                <div className="col-md-10">
                                                    <div className="product-gallery-xl">
                                                        <img src={mainImage ? IMAGE_URL+`/`+mainImage : ads.image[0] ? IMAGE_URL+'/'+ads.image[0].image : defaultImage} alt="media" />
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                    {/* {ads.image.length > 1 && window.width < 768 ? */}
                                                    <ul className="product-gallery-sm">
                                                        {ads.image ? ads.image.map((image, index) => {
                                                            return <li key={index} style={{maxWidth: "150px"}} onClick={() => this.mainImageChange(image.image)}><img src={IMAGE_URL+'/'+image.image} alt="media" /></li>
                                                        }) : <li key={index} style={{maxWidth: "150px"}} onClick={() => this.mainImageChange(defaultImage)}><img src={defaultImage} alt="media" /></li>}
                                                        
                                                    </ul> 
                                                    {/* <ul className="product-gallery-sm" style={{maxWidth: "150px"}}>
                                                        <li key={index} onClick={() => this.mainImageChange(ads.image[0].image)}><img src={IMAGE_URL+'/'+ads.image[0].image} alt="media" /></li>
                                                    </ul>} */}
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-5 col-product-info">
                                            <div className="product-info d-flex align-items-center h-100">
                                            <div className="w-100">
                                                <h3 className="product-title">{ads.title ? ads.title : ads.title_arabic ? ads.title_arabic : ''}</h3>
                                                <p className="product-desc">{ads.description ? ads.description.substring(0, 250) : ads.description_arabic ? ads.description_arabic.substring(0, 250) : ''}</p>
                                                <div className="product-price font-weight-bold text-brand">{currency} {(ads.price * currency_value).toFixed(0)}</div>
                                                <ul className="product-meta">

                                                    {ads.category_id == 1 ? <MotorProperty make={ads.make} year={ads.motore_value ? ads.motore_value.registration_year : ''} fuel={ads.motore_value ? ads.motore_value.fuel_type : ''} />
                                                    : ads.category_id == 2 ? ads.property_rend ? <PropertyForRendProperty room={ads.property_rend.room} property_type={ads.property_rend.building_type} size={ads.property_rend.size} furnished={ads.property_rend.furnished} /> : <PropertyForRendProperty room="" property_type="" size="" furnished="" />
                                                    : ads.category_id == 3 ? ads.property_sale ? <PropertyForRendProperty room={ads.property_sale.room} property_type={ads.property_sale.building_type} size={ads.property_sale.size} furnished={ads.property_sale.furnished} /> : <PropertyForRendProperty room="" property_type="" size="" furnished="" />
                                                    : ads.custom_value.map((customValue, index) => {
                                                        if(customValue.position === 'top'){
                                                            return <li key={index}>{customValue.name} : {customValue.value} </li>
                                                        }
                                                    })}
                                                    
                                                </ul>
                                                <div className="product-location">
                                                    <img src="assets/img/pdt-location.svg" alt="media" />
                                                    {ads.country_name}, {ads.state_name}, {ads.city_name},{ads.area},{ads.sub_area},{ads.sub_area2}
                                                </div>
                                                {ads.status == 1 ?
                                                <div className="product-btn-group d-flex justify-content-between">
                                                    {ads.seller_information ? ads.seller_information.phone_hide_flag == 0 ?
                                                    <a href="javascript:void(0);" onClick={() => this.showPhone(ads.seller_information ? ads.seller_information.phone : '', ads.seller_information ? ads.seller_information.name : '')} className="btn btn-primary has-icon d-block">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                                        Show Phone Number
                                                    </a>
                                                    :
                                                    <a href="javascript:void(0);" className="btn btn-primary has-icon d-block">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                                        Show Phone Number
                                                    </a>
                                                    : 
                                                    <a href="javascript:void(0);" className="btn btn-primary has-icon d-block">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                                        Show Phone Number
                                                    </a>
                                                    }

                                                    
                                                    
                                                    <a href="javascript:void(0);" onClick={this.scrollToRef} className="btn btn-dark has-icon d-block">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                                        {ads.category.name != 'Jobs' ? "Enquire Now" : "Enquire Now"} 
                                                    </a>
                                                </div>

                                                : ads.featured_flag == 1 && ads.payment && ads.payment.payment_type == 1 && this.state.lasypay == 0 ?  
                                                <a href="javascript:void(0);" onClick={() => this.uploadDocument()} className="btn btn-primary has-icon d-block">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                                    Upload Payment Document ({ads.currency} {ads.payment.amount})
                                                </a>
                                                : ''

                                                 }
                                                { ads.status == 1 ?(<>{
                                                 ads.category.name == "Jobs" ?   <a style={{backgroundColor: "red",marginTop:"10px"}} href="javascript:void(0);" onClick={() => this.uploadCvDocument()} className="btn btn-primary has-icon d-block">
                                                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                                 If You Are Interested Upload CV
                                             </a> :''}</>):''
                                                   }
                                                   
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            
                            <section className="section-product-details">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12">
                                            <ul className="nav nav-pills product-tab-nav mb-3" id="pills-tab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <a className="nav-link active" id="pdttab1-tab" data-toggle="pill" href="#pdttab1" role="tab" aria-controls="pdttab1" aria-selected="true">Description</a>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <a className="nav-link" id="pdttab2-tab" data-toggle="pill" href="#pdttab2" role="tab" aria-controls="pdttab2" aria-selected="false">{ads.category_id == 2 ? 'Amenities' : ads.category_id == 3 ? 'Amenities' : 'More Details'}</a>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <a className="nav-link" id="pdttab3-tab" data-toggle="pill" href="#pdttab3" role="tab" aria-controls="pdttab3" aria-selected="false">{ads.category_id == 1 ? 'Motor Info' : ads.category_id == 2 ? 'Property Info' : ads.category_id == 3 ? 'Property Info' : 'Info' }</a>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <a className="nav-link" id="pdttab4-tab" data-toggle="pill" href="#pdttab4" role="tab" aria-controls="pdttab4" aria-selected="false">Location</a>
                                            </li>
                                            </ul>
                                            <div className="tab-content product-tab-content" id="pills-tabContent">
                                            <div className="tab-pane fade show active" id="pdttab1" role="tabpanel" aria-labelledby="pdttab1-tab" style={{minHeight: '200px'}}>
                                                <div className="pdt-tab-desc">
                                                    <p>{ads.description ? ads.description : ads.description_arabic ? ads.description_arabic : ''}</p>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="pdttab2" role="tabpanel" aria-labelledby="pdttab2-tab" style={{minHeight: '200px'}}>
                                                <div className="pdt-tab-list">
                                                    
                                                    <ul>
                                                    {ads.custom_value.length > 0 ? ads.custom_value && ads.custom_value.map((customValue, index) => {
                                                        if(customValue.position != 'top'){
                                                            return <li key={index}><b>{customValue.name}</b> : {customValue.value}</li>
                                                        }
                                                    }) : ads.category_id == 1 ? '' : 'No data found!'}
                                                        
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="pdttab3" role="tabpanel" aria-labelledby="pdttab3-tab" style={{minHeight: '200px'}}>
                                                <div className="pdt-tab-list">
                                                    <div className="row">
                                                        <div className="col-lg-8">

                                                        {ads.category_id == 2 ? <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong>Furnished</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                            <div className="col-7">{ads.property_rend ? ads.property_rend.furnished : ''}</div>
                                                        </div> : ''}

                                                        {ads.category_id == 3 ? <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong>Furnished</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                            <div className="col-7">{ads.property_sale ? ads.property_sale.furnished : ''}</div>
                                                        </div> : ''}

                                                        {ads.category_id == 2 ? <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong> Apartment For</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                            <div className="col-7">Rent</div>
                                                        </div> : '' }

                                                        {ads.category_id == 3 ? <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong> Apartment For</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                            <div className="col-7">Sale</div>
                                                        </div> : '' }

                                                        {ads.category_id == 2 ? <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong> Rooms</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                            <div className="col-7">{ads.property_rend ? ads.property_rend.room : ''}</div>
                                                        </div> : '' }

                                                        {ads.category_id == 3 ? <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong> Rooms</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                            <div className="col-7">{ads.property_sale ? ads.property_sale.furnished : ''}</div>
                                                        </div> : '' }

                                                        {ads.category_id == 2 ? <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong> Size</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                            <div className="col-7">{ads.property_rend ? ads.property_rend.size : ''}</div>
                                                        </div> : '' }

                                                        {ads.category_id == 3 ? <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong> Size</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                            <div className="col-7">{ads.property_sale ? ads.property_sale.size : ''}</div>
                                                        </div> : '' }

                                                        {ads.category_id == 2 ? <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong> Building Type</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                            <div className="col-7">{ads.property_rend ? ads.property_rend.building_type : ''}</div>
                                                        </div> : '' }

                                                        {ads.category_id == 3 ? <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong> Building Type</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                            <div className="col-7">{ads.property_sale ? ads.property_sale.building_type : ''}</div>
                                                        </div> : '' }

                                                        {ads.category_id == 2 ? <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong> Parking</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                            <div className="col-7">{ads.property_rend ? ads.property_rend.parking == 1 ? 'Yes' : 'No' : ''}</div>
                                                        </div> : '' }

                                                        {ads.category_id == 3 ? <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong> Parking</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                            <div className="col-7">{ads.property_sale ? ads.property_sale.parking == 1 ? 'Yes' : 'No' : ''}</div>
                                                        </div> : '' }

                                                        {ads.category_id == 1 ?
                                                        <>
                                                            <div className="row mb-3 mb-md-4">
                                                                <div className="col-4"><strong> Make</strong></div>
                                                                <div className="col-1 text-center">:</div>
                                                                <div className="col-7">{ads.make}</div>
                                                            </div>
                                                            <div className="row mb-3 mb-md-4">
                                                                <div className="col-4"><strong> Model</strong></div>
                                                                <div className="col-1 text-center">:</div>
                                                                <div className="col-7">{ads.model}</div>
                                                            </div>
                                                            <div className="row mb-3 mb-md-4">
                                                                <div className="col-4"><strong> Variant</strong></div>
                                                                <div className="col-1 text-center">:</div>
                                                                <div className="col-7">{ads.variant}</div>
                                                            </div>
                                                            <div className="row mb-3 mb-md-4">
                                                                <div className="col-4"><strong> Registration Year</strong></div>
                                                                <div className="col-1 text-center">:</div>
                                                                <div className="col-7">{ads.motore_value ? ads.motore_value.registration_year : ''}</div>
                                                            </div>
                                                            <div className="row mb-3 mb-md-4">
                                                                <div className="col-4"><strong> Fuel</strong></div>
                                                                <div className="col-1 text-center">:</div>
                                                                <div className="col-7">{ads.motore_value ? ads.motore_value.fuel_type : ''}</div>
                                                            </div>
                                                            <div className="row mb-3 mb-md-4">
                                                                <div className="col-4"><strong> Transmission</strong></div>
                                                                <div className="col-1 text-center">:</div>
                                                                <div className="col-7">{ads.motore_value ? ads.motore_value.transmission : ''}</div>
                                                            </div>
                                                            <div className="row mb-3 mb-md-4">
                                                                <div className="col-4"><strong> Condition</strong></div>
                                                                <div className="col-1 text-center">:</div>
                                                                <div className="col-7">{ads.motore_value ? ads.motore_value.condition : ''}</div>
                                                            </div>
                                                            <div className="row mb-3 mb-md-4">
                                                                <div className="col-4"><strong> Milage</strong></div>
                                                                <div className="col-1 text-center">:</div>
                                                                <div className="col-7">{ads.motore_value ? ads.motore_value.milage : ''}</div>
                                                            </div>

                                                            {ads.category_id == 1 ? ads.motor_features ? ads.motor_features.map((feature, index) => {
                                                                if(feature.value != 0){
                                                                    return (
                                                                        <div className="row mb-3 mb-md-4" key={index}>
                                                                            <div className="col-4 text-capitalize"><strong> {feature.value}</strong></div>
                                                                            <div className="col-1 text-center">:</div>
                                                                            <div className="col-7">Yes</div>
                                                                        </div>
                                                                    )
                                                                }
                                                            })

                                                            : '' : ''}
                                                        </>
                                                        
                                                        : '' }

                                                        <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong>Ad Posted On </strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                            <div className="col-7">{ads.created_on} </div>
                                                        </div>
                                                        <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong>{ads.category_id == 1 ? 'Motor Reference' : ads.category_id == 2 ? 'Property Reference' : ads.category_id == 3 ? 'Property Reference' : 'Reference' } </strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                            <div className="col-7">JAB-{ads.id} </div>
                                                        </div>
                                                        {/* <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong>RERA Permit Number </strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                            <div className="col-7">71292965924</div>
                                                        </div> */}
                                                        <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong>Updated</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                            <div className="col-7">{ads.updated_on}</div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="pdttab4" role="tabpanel" aria-labelledby="pdttab4-tab" style={{minHeight: '200px'}}>
                                                <div className="pdt-tab-map">
                                                    <div className="map-location mb-3">{ads.country_name}, {ads.state_name}, {ads.city_name}</div>
                                                    <div className="map-panel rounded-lg overflow-hidden">
                                                        <iframe src={`https://www.google.com/maps/embed/v1/place?q=${ads.latitude},${ads.longitude}&key=${GOOGLEMAPS_API}`} style={{border:0,}} allowfullscreen="" loading="lazy"></iframe>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )
                })}
                

                <AdEnquire adsId={id} refprop={this.myRef}/>
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
                                    
                                    <label>Name : {sellerName}</label>
                                    <br />
                                    <a href={`tel:${phone}`}>{phone}</a>

                                </div>
                        </Modal.Body>
                        
                    </Modal>

                    <Modal className="modal fade log-sign-modal" show={this.state.documentModal}  style={modalLogin} id="mobileModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                        
                        <Modal.Body>
                       
                                <button  onClick={() => this.uploadDocument() }  type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                                <h5 className="modal-title text-center text-brand">Upload Payment Document</h5>
                                <div className="modal-form">
                                    <div className="form-group">
                                        <label>Transaction Id</label>
                                        <input type="text" className="form-control" onChange={this.handleChange} name="transaction_id" placeholder="Transaction Id" />
                                        {this.state.errors_transaction_id ? <p className="help-block help-block-error"  style={ErrorStyle}>{this.state.errors_transaction_id}</p> : '' }
                                    </div>
                                    <div className="form-group">
                                        <label>Document( image,pdf )</label>
                                        <input type="file" className="form-control" onChange={this.fileChange} name="payment_slip" accept=".png, .jpg, .jpeg, .pdf, .doc, .webp" multiple />
                                        {this.state.errors_payment_slip ? <p className="help-block help-block-error"  style={ErrorStyle}>{this.state.errors_payment_slip}</p> : '' }
                                    </div>
                                    <div className="form-group">
                                        <button class="btn btn-primary" onClick={this.paymentSubmit} type="button">Upload</button>
                                    </div>
                                </div>
                        </Modal.Body>
                        
                    </Modal>

                    
                    <Modal className="modal fade log-sign-modal" show={this.state.uploadModal}  style={modalLogin} id="mobileModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                        
                        <Modal.Body>
                       
                                <button  onClick={() => this.uploadCvDocument() }  type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                                <h5 className="modal-title text-center text-brand">Upload CV</h5>
                                <div className="modal-form">
                                   
                                    <div className="form-group">
                                        <label>Document</label>
                                        <input type="file" className="form-control" onChange={this.cvChange} name="cv_file" accept=".pdf, .doc, .webp" />
                                        {this.state.errors_cv_doc ? <p className="help-block help-block-error"  style={ErrorStyle}>{this.state.errors_cv_doc}</p> : '' }
                                    </div>
                                    <div className="form-group">
                                        <button class="btn btn-primary" onClick={this.cvSubmit} type="button">Upload</button>
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
