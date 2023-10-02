import axios from 'axios';
import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { BASE_URL,IMAGE_URL, userToken } from '../../projectString';
import Header from '../layouts/header'
import Breadcrumb from './breadcrumb'
import AppDownload from '../home/app-download'
import Footer from '../layouts/footer'
import Loader from '../Loader';
import NavLinks from './NavLinks'
import SweetAlert from 'sweetalert2-react';
import Swal from 'sweetalert2';
import Iframe from 'react-iframe'

// let wallet = localStorage.getItem('wallet') ? localStorage.getItem('wallet') : '0';

export default class profile extends Component {

    constructor(props){
        super(props);

        this.state = {
            token: userToken,
            user: '',
            loginStatus: true,
            country: [],
            loaderState: false,
            country_id: '',
            city: [],
            state_id: '',
            city_id:'',
            states: [],
            jobProfileId:0,
            jobProfile:'',
            jobTitle:'',
            experience:'',
            education:'',
            certificates:'',
            languages:'',
            skils:'',
            overView:'',
            cv:'',
            companies:[],
            campanyModal: false,
            isPresent:false,
            companyName:'',
            fromDt:'',
            toDt:''
        }
    }

    componentWillMount(){

        if(localStorage.getItem('loginStatus') === 'false' || localStorage.getItem('loginStatus') === false){

            this.props.history.push('/');
        }

        this.setState({
            loaderState: true,
        });

        axios({
            url: `${BASE_URL}/get/jobprofile`,
            method: 'POST',
            headers:{ Authorization: "Bearer " + this.state.token },
        }).then(response => {
            if(response.data.status == 'success'){
                this.setState({
                    jobProfile:response.data.data,
                    jobProfileId:response.data.data.id,
                    jobTitle:response.data.data.title,
                    experience:response.data.data.work_experience,
                    education:response.data.data.education,
                    certificates:response.data.data.certificate,
                    languages:response.data.data.language,
                    skils:response.data.data.skils,
                    overView:response.data.data.overview,
                    city_id:response.data.data.city_id,
                    companies:response.data.data.company
                });

                axios({
                    method: 'POST',
                    url: `${BASE_URL}/customer/get/state`,
                    data:{
                       country: response.data.data.country_id,
                    }
                 }).then(response => {
                 //    console.log(this.state.jobProfile);
                    if(response.data.status == 'success'){
                       this.setState({
                          country_id: this.state.jobProfile.country_id,
                          states: response.data.state,
                       });
                    }
                 //  console.log(this.state.states);
                 }).catch((error) => {
                    this.setState({
                       loaderStatus: false,
                    });
                 });


                 axios({
                    method: 'POST',
                    url: `${BASE_URL}/customer/get/city`,
                    data:{
                       state:this.state.jobProfile.state_id,
                    }
                 }).then(response => {
                   
                    if(response.data.status == 'success'){
                       this.setState({
                          state_id: this.state.jobProfile.state_id,
                          city: response.data.city,
                       });
                    }
                   // console.log(this.state.jobProfile.state_id);
                 }).catch((error) => {
                    this.setState({
                       loaderStatus: false,
                    });
                 });
               
             // console.log(this.state.jobProfile);

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
            loaderState: true,
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

    changeCampanyModal = () => {

        this.setState({
            campanyModal: !this.state.campanyModal,
        });
    }


    valueChange = (e) => {
        
        if(e.target.name === 'jobtitle' && e.target.value != ''){
            this.setState({
                jobTitle: e.target.value,
            });
        }
        if(e.target.name === 'workexp' && e.target.value != ''){
            this.setState({
                experience: e.target.value,
            });
        }
        if(e.target.name === 'workexp' && e.target.value != ''){
            this.setState({
                experience: e.target.value,
            });
        }
        if(e.target.name === 'education' && e.target.value != ''){
            this.setState({
                education: e.target.value,
            });
        }
        if(e.target.name === 'certificate' && e.target.value != ''){
            this.setState({
                certificates: e.target.value,
            });
        }
        if(e.target.name === 'languages' && e.target.value != ''){
            this.setState({
                languages: e.target.value,
            });
        }
        if(e.target.name === 'skils' && e.target.value != ''){
            this.setState({
                skils: e.target.value,
            });
        }
        if(e.target.name === 'overview' && e.target.value != ''){
            this.setState({
                overView: e.target.value,
            });
        }
        if(e.target.name === 'company' && e.target.value != ''){
            this.setState({
                companyName: e.target.value,
            });
        }
        if(e.target.name === 'fromdate' && e.target.value != ''){
            this.setState({
                fromDt: e.target.value,
            });
        }
        if(e.target.name === 'todate' && e.target.value != ''){
            this.setState({
                toDt: e.target.value,
            });
        }
        // if(e.target.name === 'cv'){
        //     this.setState({
        //         cv: e.target.files[0],
        //     });
            
        // }
       
      
    }

    onFileChange = event => {
 
        // Update the state
        this.setState({ cv: event.target.files[0] });
       // console.log(event.target.files[0]);
    };

    storeCompany = ()=>{
        axios({
            method: 'POST',
            url: `${BASE_URL}/company/store`,
            headers:{ Authorization: "Bearer " + this.state.token },
            data:{
                jobprofileid: this.state.jobProfileId,
                from_date: this.state.fromDt,
                to_date: this.state.toDt,
                company: this.state.companyName,
            }
         }).then(response => {
           //  console.log(response.data.state);
            if(response.data.status == 'success'){
                window.location.reload(true)
            }
           //console.log(this.state.states);
         }).catch((error) => {
            this.setState({
               loaderStatus: false,
            });
         });
    }

    deleteCompany = (id)=>{
        axios({
            method: 'POST',
            url: `${BASE_URL}/company/delete`,
            headers:{ Authorization: "Bearer " + this.state.token },
            data:{
                c_id: id,
            }
         }).then(response => {
           //  console.log(response.data.state);
            if(response.data.status == 'success'){
                window.location.reload(true)
            }
           //console.log(this.state.states);
         }).catch((error) => {
            this.setState({
               loaderStatus: false,
            });
         });
    }

    countryChange = (id) => {
      
      //  console.log(id);
        axios({
           method: 'POST',
           url: `${BASE_URL}/customer/get/state`,
           data:{
              country: id,
           }
        }).then(response => {
          //  console.log(response.data.state);
           if(response.data.status == 'success'){
              this.setState({
                 country_id: id,
                 states: response.data.state,
              });
           }
          //console.log(this.state.states);
        }).catch((error) => {
           this.setState({
              loaderStatus: false,
           });
        });
     }
  
     statesChange = (id) => {
       // console.log(id);
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
                 city: response.data.city,
              });
           }
  
        }).catch((error) => {
           this.setState({
              loaderStatus: false,
           });
        });
     }
  
     cityChange = (id) => {
      // console.log(id);
        this.setState({
           city_id: id,
        });
     }

     checkChange = ()=>{
        this.setState({
            isPresent:!this.state.isPresent,
            toDt:'Present',
         });
     }

    handleSubmit = () => {
       if(this.state.jobProfileId==0){
        this.setState({
            loaderState: true,
        });
        const data = new FormData() 
        data.append('title', this.state.jobTitle)
        data.append('education', this.state.education)
        data.append('work_experience', this.state.experience)
        data.append('certificate', this.state.certificates)
        data.append('language', this.state.languages)
        data.append('skils', this.state.skils)
        data.append('overview', this.state.overView)
        data.append('country_id', this.state.country_id)
        data.append('state_id', this.state.state_id)
        data.append('city_id', this.state.city_id)
        data.append('cv_file', this.state.cv)

        axios({
            url: `${BASE_URL}/save/jobprofile`,
            method: 'POST',
            headers:{ Authorization: "Bearer " + this.state.token },
            data,
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
            window.location.reload(true)

        }).catch((error) => {
            this.setState({
                loaderState: false,
            });
        });
       } else{
        this.setState({
            loaderState: true,
        });
        const data = new FormData() 
        data.append('jobprofile_id', this.state.jobProfileId)
        data.append('title', this.state.jobTitle)
        data.append('education', this.state.education)
        data.append('work_experience', this.state.experience)
        data.append('certificate', this.state.certificates)
        data.append('language', this.state.languages)
        data.append('skils', this.state.skils)
        data.append('overview', this.state.overView)
        data.append('country_id', this.state.country_id)
        data.append('state_id', this.state.state_id)
        data.append('city_id', this.state.city_id)
        data.append('cv_file', this.state.cv)

        axios({
            url: `${BASE_URL}/update/jobprofile`,
            method: 'POST',
            headers:{ Authorization: "Bearer " + this.state.token },
            data,
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
            window.location.reload(true)

        }).catch((error) => {
            this.setState({
                loaderState: false,
            });
        });
       }
      
    }

  


    render() {

        let {user,jobProfileId,companies,isPresent,loginStatus,jobProfile, country,loaderState,jobTitle,country_id,experience,certificates,skils,cv,languages,education,overView} = this.state;

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
                {loaderState == true ? <Loader /> : ''}
                <>
                    <Header loginStatus={loginStatus} user={user.name}/>
                    <Breadcrumb section="Job Profile" />

                    {/* <!-- =====[SECTION MY PROFIL]===== --> */}
                    <section className="section-my-profile pt-4 pb-5">
                        <div className="container">

                            <NavLinks linkState="jobprofile" />

                            
                            <div className="my-profile-form">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-7 col-md-8 mx-auto">
                                    <div className="row form-group align-items-center">
                                        <label className="col-lg-4 col-form-label">Job Title :</label>
                                        <div className="col-lg-8">
                                            <input type="text" name="jobtitle"  className="form-control" onChange={(e) => this.valueChange(e)} value={jobTitle} placeholder="Job Title" />
                                        </div>
                                    </div>
                                    <div className="row form-group align-items-center">
                                        <label className="col-lg-4 col-form-label">Work Experience :</label>
                                        <div className="col-lg-8">
                                            <input type="number" name="workexp" className="form-control" onChange={(e) => this.valueChange(e)} value={experience} placeholder="Work Experience" />
                                        </div>
                                    </div>
                                    <div className="row form-group align-items-center">
                                        <label className="col-lg-4 col-form-label">Education :</label>
                                        <div className="col-lg-8">
                                            <input type="text" name="education" className="form-control" onChange={(e) => this.valueChange(e)} value={education} placeholder="Education" />
                                        </div>
                                    </div>
                                    <div className="row form-group align-items-center">
                                        <label className="col-lg-4 col-form-label">Certificates :</label>
                                        <div className="col-lg-8">
                                            <input type="text" name="certificate" className="form-control" onChange={(e) => this.valueChange(e)} value={certificates} placeholder="Certificate" />
                                        </div>
                                    </div>
                                    <div className="row form-group align-items-center">
                                        <label className="col-lg-4 col-form-label">Languages :</label>
                                        <div className="col-lg-8">
                                            <input type="text" name="languages" className="form-control" onChange={(e) => this.valueChange(e)} value={languages} placeholder="Languages" />
                                        </div>
                                    </div>
                                    <div className="row form-group align-items-center">
                                        <label className="col-lg-4 col-form-label">Skils :</label>
                                        <div className="col-lg-8">
                                            <input type="text" name="skils" className="form-control" onChange={(e) => this.valueChange(e)} value={skils} placeholder="Skils" />
                                        </div>
                                    </div>
                                    <div className="row form-group align-items-center">
                                        <label className="col-lg-4 col-form-label">Overview :</label>
                                        <div className="col-lg-8">
                                            <textarea type="text" name="overview" className="form-control" onChange={(e) => this.valueChange(e)} value={overView} placeholder="job summery" />
                                        </div>
                                    </div>
                                    <div className="row form-group align-items-center">
                                        <label className="col-lg-4 col-form-label">Resume :</label>
                                        <div className="col-lg-8">
                                        <input type="file" name="cv" className="form-control" onChange={(e) => this.onFileChange(e)} placeholder="" accept='.pdf'/>

                                        {jobProfile.cv_file != null? <Iframe url={IMAGE_URL+'/'+ jobProfile.cv_file}
                                                        width="700px"
                                                        height="200px"
                                                        id=""
                                                        className=""
                                                        display="block"
                                                        position="relative"/> : ''}

                                        </div>
                                    </div>
                                    <div className="row form-group align-items-center">
                                        <label className="col-lg-4 col-form-label">Country :</label>
                                        <div className="col-lg-8">
                                            <select className="form-control" onChange={(e) => this.countryChange(e.target.value)} name="country">
                                                <option value=''>Select Country</option>
                                                {country && country.map((country, index) => {
                                                    if(country.id == jobProfile.country_id){
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
                                        <label className="col-lg-4 col-form-label">State :</label>
                                        <div className="col-lg-8">
                                            <select className="form-control" onChange={(e) => this.statesChange(e.target.value)} name="sates">
                                                <option value=''>Select State</option>
                                                {this.state.states && this.state.states.map((state, index) => {
                                                    if(state.id == jobProfile.state_id){
                                                        return <option selected key={index} value={state.id}>{state.name}</option>
                                                    }
                                                    else{
                                                        return <option key={index} value={state.id}>{state.name}</option>
                                                    }
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row form-group align-items-center">
                                        <label className="col-lg-4 col-form-label">City :</label>
                                        <div className="col-lg-8">
                                            <select className="form-control" onChange={(e) => this.cityChange(e.target.value)} name="city">
                                                <option value=''>Select City</option>
                                                {this.state.city && this.state.city.map((city, index) => {
                                                    if(city.id == jobProfile.city_id){
                                                        return <option selected key={index} value={city.id}>{city.name}</option>
                                                    }
                                                    else{
                                                        return <option key={index} value={city.id}>{city.name}</option>
                                                    }
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    {jobProfileId!=0?
                                     <>
                                     <br></br>
                                     <hr></hr>
                                    <div className="row form-group align-items-center">
                                    <label className="col-lg-8 col-form-label">Company :</label>
                                    <div className="col-lg-4">
                                    <button type="button" onClick={this.changeCampanyModal}  className="btn btn-primary w-100">Add company</button>

                                    </div>
                                    </div>
                                    {companies && companies.map((company,index)=>{
                                        return <div className="row form-group align-items-center">
                                        <div className="col-lg-3">
                                            {company.company}
                                        </div>
                                        <div className="col-lg-3">
                                        {company.from_date}
                                        </div>
                                        <div className="col-lg-3">
                                        {company.to_date}
                                        </div>
                                        <div className="col-lg-3">
                                        <button type="button" onClick={(e) => this.deleteCompany(company.id)}  className="btn btn-danger w-100">Delete</button>
                                        </div>
                                        </div>

                                    }) }
                                     <br></br>
                                     </>
                                      : ''}
                                   
                                    <div className="row form-group align-items-start">
                                        <div className="col-lg-8 ml-auto">
                                            <button type="button" onClick={this.handleSubmit} className="btn btn-primary w-100">{this.state.jobProfileId==0 ? 'Save' : 'Update'}</button>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <AppDownload />
                    <Footer />
                </>

                <Modal className="modal fade log-sign-modal" show={this.state.campanyModal}  style={modalLogin} id="changeModal" tabindex="-1" aria-labelledby="changeModalLabel" aria-hidden="true">
                                
                                <Modal.Body>
                                        
                                    <button  onClick={ this.changeCampanyModal }  type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                    <h5 className="modal-title text-center text-brand">Add Company</h5>
                                    {this.state.mainError && <p className="help-block help-block-error"  style={ErrorStyle}>{this.state.mainError}</p>}
                                    <div className="modal-form">

                                        <div className="form-group">
                                        <label>Company</label>          
                                            <input type="text" onChange={(e) => this.valueChange(e)} name="company" className="form-control" />
                                        </div>
                                        <div className="form-group"> 
                                        <label>From Date</label>          
                                            <input type="date" onChange={(e) => this.valueChange(e)} name="fromdate" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                        <label>To Date</label>
                                        {isPresent==false ? 
                                          <input type="date" onChange={(e) => this.valueChange(e)} name="todate" className="form-control" />
                                        : ''}  
                                        </div>

                                        <div className="custom-control custom-checkbox">
                                        <input type="checkbox" id='check' className="form-control custom-control-input" onChange={this.checkChange} name="present"/>
                                        <label className='custom-control-label font-weight-normal' for="check">Present</label>
                                        </div>
                                       <br></br>
                                                            
                                        <div className="form-group">
                                                            
                                            <button onClick={ this.storeCompany } className="btn btn-primary d-block w-100">Submit</button>
                                        </div>
                                    </div>
                                    
                                            
                                </Modal.Body>
                                            
                            </Modal>
            
            </div>
        )
    }
}
