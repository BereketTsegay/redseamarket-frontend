import axios from 'axios'
import React, { Component } from 'react'
import { BASE_URL, GOOGLEMAPS_API, IMAGE_URL } from '../../projectString'
import AppDownload from '../home/app-download'
import { Button, Modal } from 'react-bootstrap';
import defaultImage from '../../../src/web-assets/img/icon-256x256.png';
import Footer from '../layouts/footer'
import Header from '../layouts/header'
import AdEnquire from './adEnquire'
import MotorProperty from './motorProperty';

export default class adsDetails extends Component {

    constructor(props){
        super(props);

        this.state = {
            id:this.props.match.params.id,
            ads: [],
            mainImage: null,
            modalShow: false,
            phone: '',
        }
    }

    componentWillMount(){
        axios({
            url: `${BASE_URL}/customer/ad/view`,
            method: 'POST',
            data:{
                ads_id: this.state.id,
            }
        }).then(response => {

            if(response.data.status == 'success'){
                this.setState({
                    ads: response.data.ads,
                })
            }

        }).catch((error) => {

        });
    }

    mainImageChange = (image) => {
        this.setState({
            mainImage:image,
        });
    }

    showPhone = (phone) => {
        this.setState({ 
            modalShow: !this.state.modalShow,
            phone: phone,
         });
    }

    render() {
        
        let {id, ads, mainImage, modalShow, phone} = this.state;
        
            let modalLogin ={
                position:  'fixed',
                width: '600px',
                top: '40px',
                left: 'calc(50% - 300px)',
                bottom: '40px',
            }
        
        return (
            <div id="page" className="site-page">

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
                                                    <ul className="product-gallery-sm">
                                                        {ads.image ? ads.image.map((image, index) => {
                                                            return <li key={index} onClick={() => this.mainImageChange(image.image)}><img src={IMAGE_URL+'/'+image.image} alt="media" /></li>
                                                        }) : <li key={index} onClick={() => this.mainImageChange(defaultImage)}><img src={defaultImage} alt="media" /></li>}
                                                        
                                                        
                                                    </ul>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-5 col-product-info">
                                            <div className="product-info d-flex align-items-center h-100">
                                            <div className="w-100">
                                                <h3 className="product-title">{ads.title}</h3>
                                                <p className="product-desc">{ads.description.substring(0, 250)}</p>
                                                <div className="product-price font-weight-bold text-brand">AED {ads.price}</div>
                                                <ul className="product-meta">
                                                    {ads.category_id == 1 ? <MotorProperty make={ads.make} year={ads.motore_value.registration_year} fuel={ads.motore_value.fuel_type} />
                                                    : ads.category_id == 2 ? 'rend' 
                                                    : ads.category_id == 3 ? 'sale' 
                                                    : ads.custom_value.map((customValue, index) => {
                                                        if(customValue.position === 'top'){
                                                            return <li key={index}>{customValue.value} : {customValue.name} </li>
                                                        }
                                                    })}
                                                    {/* <li><img src="assets/img/pdt-bed.svg" alt="media" />1 Bed </li>
                                                    <li><img src="assets/img/pdt-bathtub.svg" alt="media" />2 Baths </li>
                                                    <li><img src="assets/img/pdt-space.svg" alt="media" />650 SqFt </li>
                                                    <li><img src="assets/img/pdt-sofa.svg" alt="media" />Unfurnished</li> */}
                                                </ul>
                                                <div className="product-location">
                                                    <img src="assets/img/pdt-location.svg" alt="media" />
                                                    {ads.country_name}, {ads.state_name}, {ads.city_name}
                                                </div>
                                                <div className="product-btn-group d-flex justify-content-between">
                                                    <a href="javascript:void(0);" onClick={() => this.showPhone(ads.seller_information ? ads.seller_information.phone : '')} className="btn btn-primary has-icon d-block">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                                        Show Phone Number
                                                    </a>
                                                    <a href="#" className="btn btn-dark has-icon d-block">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                                        Enquire Now
                                                    </a>
                                                </div>
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
                                                <a className="nav-link" id="pdttab2-tab" data-toggle="pill" href="#pdttab2" role="tab" aria-controls="pdttab2" aria-selected="false">Amenities</a>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <a className="nav-link" id="pdttab3-tab" data-toggle="pill" href="#pdttab3" role="tab" aria-controls="pdttab3" aria-selected="false">{ads.category_id == 1 ? 'Motor Info' : ads.category_id == 2 ? 'Property Info' : ads.category_id == 3 ? 'Property Info' : 'Info' }</a>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <a className="nav-link" id="pdttab4-tab" data-toggle="pill" href="#pdttab4" role="tab" aria-controls="pdttab4" aria-selected="false">Location</a>
                                            </li>
                                            </ul>
                                            <div className="tab-content product-tab-content" id="pills-tabContent">
                                            <div className="tab-pane fade show active" id="pdttab1" role="tabpanel" aria-labelledby="pdttab1-tab">
                                                <div className="pdt-tab-desc">
                                                    <p>{ads.description}</p>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="pdttab2" role="tabpanel" aria-labelledby="pdttab2-tab">
                                                <div className="pdt-tab-list">
                                                    <ul>
                                                    {ads.custom_value.map((customValue, index) => {
                                                        if(customValue.position != 'top'){
                                                            return <li key={index}>{customValue.value}</li>
                                                        }
                                                    })}
                                                        
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="pdttab3" role="tabpanel" aria-labelledby="pdttab3-tab">
                                                <div className="pdt-tab-list">
                                                    <div className="row">
                                                        <div className="col-lg-8">

                                                        {ads.category_id == 2 ? <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong>Furnished</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                            <div className="col-7">{ads.property_rend.furnished}</div>
                                                        </div> : ''}

                                                        {ads.category_id == 3 ? <div className="row mb-3 mb-md-4">
                                                            <div className="col-4"><strong>Furnished</strong></div>
                                                            <div className="col-1 text-center">:</div>
                                                            <div className="col-7">{ads.property_sale.furnished}</div>
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
                                                                <div className="col-4"><strong> Registration Year</strong></div>
                                                                <div className="col-1 text-center">:</div>
                                                                <div className="col-7">{ads.motore_value.registration_year}</div>
                                                            </div>
                                                            <div className="row mb-3 mb-md-4">
                                                                <div className="col-4"><strong> Fuel</strong></div>
                                                                <div className="col-1 text-center">:</div>
                                                                <div className="col-7">{ads.motore_value.fuel_type}</div>
                                                            </div>
                                                            <div className="row mb-3 mb-md-4">
                                                                <div className="col-4"><strong> Transmission</strong></div>
                                                                <div className="col-1 text-center">:</div>
                                                                <div className="col-7">{ads.motore_value.transmission}</div>
                                                            </div>
                                                            <div className="row mb-3 mb-md-4">
                                                                <div className="col-4"><strong> Condition</strong></div>
                                                                <div className="col-1 text-center">:</div>
                                                                <div className="col-7">{ads.motore_value.condition}</div>
                                                            </div>
                                                            <div className="row mb-3 mb-md-4">
                                                                <div className="col-4"><strong> Milage</strong></div>
                                                                <div className="col-1 text-center">:</div>
                                                                <div className="col-7">{ads.motore_value.milage}</div>
                                                            </div>
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
                                            <div className="tab-pane fade" id="pdttab4" role="tabpanel" aria-labelledby="pdttab4-tab">
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
                

                <AdEnquire adsId={id}/>
                <AppDownload />
                <Footer/>

                <div className="container">
                     <Modal className="modal fade log-sign-modal" show={this.state.modalShow}  style={modalLogin} id="mobileModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                        
                        <Modal.Body>
                       
                                <button  onClick={() => this.showPhone('') }  type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                                <h5 className="modal-title text-center text-brand">Phone Number</h5>
                                <div className="modal-form">
                                    <label>{phone}</label>
                                </div>
                        </Modal.Body>
                        
                    </Modal>
                  </div>
            </div>
        )
    }
}
