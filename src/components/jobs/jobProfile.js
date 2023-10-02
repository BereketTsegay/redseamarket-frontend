import axios from 'axios'
import React, { Component } from 'react'
import { BASE_URL,userToken } from '../../projectString'
import PaginationLink from '../account/paginationLink'
import AppDownload from '../home/app-download'
import Footer from '../layouts/footer'
import Header from '../layouts/header'
import HeadFilter from './headFilter'
import ListAdItem from './listAdItem'
import ListProfile from './profileList'
import Loader from '../Loader';
import ResultTitleArea from './resultTitleArea';
import Nodata from '../../web-assets/img/5406715.jpg';

export default class jobProfile extends Component {

    constructor(props){
        super(props);

        this.state = {
            token: userToken,
            paginataionArray: [],
            previousPage: '',
            nexPage: '',
            last: '',
            adList: [],
            resultKey: '',
            latitude: sessionStorage.getItem('latitude') ? parseFloat(sessionStorage.getItem('latitude')) : 0,
            longitude: sessionStorage.getItem('longitude') ? parseFloat(sessionStorage.getItem('longitude')) : 0,
            loaderStatus: false,
            profileList:[]
        }
    }
    
    componentWillMount = () => {
        
        this.setState({
            loaderStatus: true,
        });

      
         //  console.log(key);

            axios({
                url: `${BASE_URL}/get/jobprofile/list`,
                method: 'POST',
                headers:{ Authorization: "Bearer " + this.state.token },
            }).then(response => {
              //    console.log(response);
                if(response.data.status == 'success'){
                    this.setState({
                        resultKey: 'Showing result',
                        profileList: response.data.profiles.data,
                        paginataionArray: response.data.profiles.links,
                        previousPage: response.data.profiles.prev_page_url,
                        nexPage: response.data.profiles.next_page_url,
                        last:response.data.profiles.last_page,
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


    paginationCall = (url) => {

        this.setState({
            loaderStatus: true,
        });

        axios({
            url: url,
            method: 'POST',
            headers:{ Authorization: "Bearer " + this.state.token },
        }).then(response => {
              console.log(response);
            if(response.data.status == 'success'){
                this.setState({
                    resultKey: 'Showing result',
                    profileList: response.data.profiles.data,
                    paginataionArray: response.data.profiles.links,
                    previousPage: response.data.profiles.prev_page_url,
                    nexPage: response.data.profiles.next_page_url,
                    last:response.data.profiles.last_page,
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

    render() {

        let {paginataionArray, previousPage, nexPage, last, profileList, resultKey} = this.state;
        let loaderStatus = this.state.loaderStatus;

        return (
            <div id="page" class="site-page">
                {loaderStatus == true ? <Loader /> : ''}
                <>
                <Header />
                {/* <!-- =====[SECTION MOTOR HERO] **===== --> */}
                <section class="section-hero-banner"style={{backgroundColor:"#007aFF"}}>
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h2 class="section-title text-white text-center">Hire People made easy with Red Sea Market</h2>
                        </div>
                    </div>
                </div>
                </section>


                {/* <!-- =====[SECTION MOTOR LISTING] **===== --> */}
                {profileList.length == 0 ? <img style={{width: '50%', height: '50%', marginLeft: '25%'}} src={Nodata} /> :
                <section class="section-motor-sort-listing">
                    <div class="container">
                        
                        {/* <ResultTitleArea resultKey={resultKey} lengthValue={profileList.length} /> */}

                        <div class="row">
                            <div class="col-12">
                                <div class="section-title-panel text-center">
                                <h2 class="section-title mb-2"><span className="notranslate">{resultKey}</span> <small class="text-muted"> <span className="notranslate">{profileList.length}</span> Profile</small></h2>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-xl-9 col-lg-11 mx-auto">
                                <ul class="motor-sort-list">
                                    
                                    {profileList.length == 0 ? '':
                                        profileList.length != 0 && profileList.map((profileList, index) => {
                                        return (
                                            <ListProfile key={index} profile={profileList} />
                                        )
                                    }) }
                                    
                                </ul>
                            </div>
                        </div>

                        {last == 1 || last == '' ? '' :
                            <PaginationLink paginataionArray={paginataionArray} last={last} previousPage={previousPage} nexPage={nexPage} paginationChange={this.paginationCall} />
                        }
                        

                    </div>
                </section>}

                
                <AppDownload />
                <Footer />
                </>
            </div>
        )
    }
}
