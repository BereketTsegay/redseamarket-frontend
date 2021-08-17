import axios from 'axios'
import React, { Component } from 'react'
import { BASE_URL } from '../../projectString'
import PaginationLink from '../account/paginationLink'
import HeadFilter from '../automobile/headFilter'
import ListAdItem from '../automobile/listAdItem'
import AppDownload from '../home/app-download'
import Footer from '../layouts/footer'
import Header from '../layouts/header';
import Loader from '../Loader';
import queryString from 'querystring'

export default class searchList extends Component {

    constructor(props){
        super(props);

        this.state = {
            paginataionArray: [],
            previousPage: '',
            nexPage: '',
            last: '',
            adList: [],
            resultKey: '',
            category: '',
            subcategory: '',
            city: '',
            searchKey: '',
            total: 0,
            latitude: 0,
            longitude: 0,
            loaderStatus: false,
        }
    }


    UNSAFE_componentWillReceiveProps = (nextProps) => {
        
        let key = nextProps.match.params.key;
        let event = nextProps.match.params.event;
        let city = nextProps.match.params.city;
        let category = nextProps.match.params.category;
        let subcategory = nextProps.match.params.subcategory;
        
        if(key == '~' && category != '-'){

            this.setState({
                category: category,
                city: city,
                subcategory: subcategory,
                searchKey: key,
                loaderStatus: true,

            }, () => {
                axios({
                    url: `${BASE_URL}/customer/get/category/ads`,
                    method: 'POST',
                    data: {
                        category_id: this.state.category,
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                    },
                }).then(response => {

                    if(response.data.status == 'success'){
                        
                        this.setState({

                            resultKey: response.data.message,
                            adList: response.data.ads.data,
                            paginataionArray: response.data.ads.links,
                            previousPage: response.data.ads.prev_page_url,
                            nexPage: response.data.ads.next_page_url,
                            last:response.data.ads.last_page,
                            total:response.data.ads.total,
                        });
                    }

                    this.setState({
                        loaderStatus: false,
                    });

                }).catch((error) => {
                    this.setState({
                        loaderStatus:false,
                    })
                });
            });

        }
        else if(key == '~' && subcategory != '-'){

            this.setState({
                category: category,
                city: city,
                subcategory: subcategory,
                searchKey: key,
                loaderStatus:true,

            }, () => {
                axios({
                    url: `${BASE_URL}/customer/get/subcategory/ads`,
                    method: 'POST',
                    data: {
                        subcategory_id: this.state.subcategory,
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                    },
                }).then(response => {

                    if(response.data.status == 'success'){
                        
                        this.setState({

                            resultKey: response.data.message,
                            adList: response.data.ads.data,
                            paginataionArray: response.data.ads.links,
                            previousPage: response.data.ads.prev_page_url,
                            nexPage: response.data.ads.next_page_url,
                            last:response.data.ads.last_page,
                            total:response.data.ads.total,
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
            });
        }
        else{
            if(category != '-' && subcategory != '-' && city != '-'){
                
                this.setState({
                    category: category,
                    city: city,
                    subcategory: subcategory,
                    searchKey: key,
                    loaderStatus: true,

                }, () => {
                    axios({
                        url: `${BASE_URL}/customer/search/ads`,
                        method: 'POST',
                        data: {
                            search_key: key,
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            category: this.state.category,
                            city: this.state.city,
                        },
                    }).then(response => {

                        if(response.data.status == 'success'){
                            
                            this.setState({

                                resultKey: response.data.message,
                                adList: response.data.ads.data,
                                paginataionArray: response.data.ads.links,
                                previousPage: response.data.ads.prev_page_url,
                                nexPage: response.data.ads.next_page_url,
                                last:response.data.ads.last_page,
                                total:response.data.ads.total,
                            });
                        }

                        this.setState({
                            loaderStatus: false,
                        });

                    }).catch((error) => {
                        this.setState({
                            loaderStatus: false,
                        })
                    });
                });
            }
            else if(category != '-' && subcategory != '-'){

                this.setState({
                    category: category,
                    subcategory: subcategory,
                    searchKey: key,
                    loaderStatus: true,

                }, () => {
                    axios({
                        url: `${BASE_URL}/customer/search/ads`,
                        method: 'POST',
                        data: {
                            search_key: key,
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            category: this.state.category,
                        },
                    }).then(response => {

                        if(response.data.status == 'success'){
                            
                            this.setState({
                                
                                resultKey: response.data.message,
                                adList: response.data.ads.data,
                                paginataionArray: response.data.ads.links,
                                previousPage: response.data.ads.prev_page_url,
                                nexPage: response.data.ads.next_page_url,
                                last:response.data.ads.last_page,
                                total:response.data.ads.total,
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
                });
            }
            else if(category != '-' && city != '-'){

                this.setState({
                    category: category,
                    city: city,
                    searchKey: key,
                    loaderStatus: true,

                }, () => {
                    axios({
                        url: `${BASE_URL}/customer/search/ads`,
                        method: 'POST',
                        data: {
                            search_key: key,
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            category: this.state.category,
                            city: this.state.city,
                        },
                    }).then(response => {

                        if(response.data.status == 'success'){
                            
                            this.setState({
                                
                                resultKey: response.data.message,
                                adList: response.data.ads.data,
                                paginataionArray: response.data.ads.links,
                                previousPage: response.data.ads.prev_page_url,
                                nexPage: response.data.ads.next_page_url,
                                last:response.data.ads.last_page,
                                total:response.data.ads.total,
                            });
                        }

                        this.setState({
                            loaderStatus: false,
                        });

                    }).catch((error) => {
                        this.setState({
                            loaderStatus: false,
                        })
                    });
                });
            }
            else if(subcategory != '-' && city != '-'){

                this.setState({
                    category: category,
                    city: city,
                    subcategory: subcategory,
                    searchKey: key,
                    loaderStatus: true,

                }, () => {
                    axios({
                        url: `${BASE_URL}/customer/search/ads`,
                        method: 'POST',
                        data: {
                            search_key: key,
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            city: this.state.city,
                        },
                    }).then(response => {

                        if(response.data.status == 'success'){
                            
                            this.setState({
                                
                                resultKey: response.data.message,
                                adList: response.data.ads.data,
                                paginataionArray: response.data.ads.links,
                                previousPage: response.data.ads.prev_page_url,
                                nexPage: response.data.ads.next_page_url,
                                last:response.data.ads.last_page,
                                total:response.data.ads.total,
                            });
                        }

                        this.setState({
                            loaderStatus: false,
                        });

                    }).catch((error) => {
                        this.setState({
                            loaderStatus: false,
                        })
                    });
                });
            }
            else{

                this.setState({
                    searchKey: key,
                    loaderStatus: true,
                });
                
                    axios({
                        url: `${BASE_URL}/customer/search/ads`,
                        method: 'POST',
                        data: {
                            search_key: key,
                            category: this.state.category,
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            city: this.state.city,
                        },
                    }).then(response => {

                        if(response.data.status == 'success'){
                            
                            this.setState({
                                
                                resultKey: response.data.message,
                                adList: response.data.ads.data,
                                paginataionArray: response.data.ads.links,
                                previousPage: response.data.ads.prev_page_url,
                                nexPage: response.data.ads.next_page_url,
                                last:response.data.ads.last_page,
                                total:response.data.ads.total,
                            });
                        }

                        this.setState({
                            loaderStatus: false,
                        });

                    }).catch((error) => {
                        this.setState({
                            loaderStatus: false,
                        })
                    });
            }
        }
    }

    componentWillMount = () => {
        
        // let key = this.props.match.params.key;
        // let event = this.props.match.params.event;
        // let city = this.props.match.params.city;
        // let category = this.props.match.params['category'];
        // let subcategory = this.props.match.params.subcategory;
        // let queries = queryString.parse(this.props.location.search)
        // var searchParams = new URLSearchParams(window.location.hash);
        // console.log(new URLSearchParams(this.props.location.search));
        // let category = new URLSearchParams(this.props.location.search).get("category");
        // let category=this.props.match.params['category'];
        // let subcategory=this.props.match.params['subcategory'];
        // let subcategory=this.props.match.params['subcategory'];
        // let city=this.props.match.params['city'];we can take from session
    //     let category=this.props.match.params['category'];
    //     let subcategory=this.props.match.params['subcategory'];
    //    let key=this.props.match.params['key'];


    //     let apiUrl='';
        let searchStatus=0;
    //     if(subcategory!=='' &&key&&category){
    //         console.log("don result1 ")
    //         apiUrl=`${BASE_URL}/customer/get/category/ads`;
    //         searchStatus=1;
    //     }else if(key !==''&&category&&subcategory){
    //         console.log("don result2")
    //         apiUrl=`${BASE_URL}/customer/search/ads`;
    //         searchStatus=1;
    //     }


    

        let category =((new URLSearchParams(this.props.location.search).get('category'))!='')?(new URLSearchParams(this.props.location.search).get('category')):'';
        
        console.log(category,'category')
        // if(searchStatus==1){
        //     this.setState({
        //         category: category,
        //         city: sessionStorage.getItem('city_id'),
        //         subcategory: subcategory,
        //         searchKey: key,
        //         loaderStatus: true,

        //     }, () => {
        //         axios({
        //             url: apiUrl,
        //             method: 'POST',
        //             data: {
        //                 canonical_name: this.state.category,
        //                 latitude: this.state.latitude,
        //                 longitude: this.state.longitude,
        //             },
        //         }).then(response => {
                  
        //             if(response.data.status == 'success'){
                        
        //                 this.setState({

        //                     resultKey: response.data.message,
        //                     adList: response.data.ads.data,
        //                     paginataionArray: response.data.ads.links,
        //                     previousPage: response.data.ads.prev_page_url,
        //                     nexPage: response.data.ads.next_page_url,
        //                     last:response.data.ads.last_page,
        //                     total:response.data.ads.total,
        //                 });
        //             }

        //             this.setState({
        //                 loaderStatus: false,
        //             });

        //         }).catch((error) => {
        //             this.setState({
        //                 loaderStatus: false,
        //             })
        //         });
        //     });
        // }



        // if(city!='' && category!=''){

        //     this.setState({
        //                 category: category,
        //                 city: city,
        //                 subcategory: subcategory,
        //                 searchKey: key,
        //                 loaderStatus: true,
        
        //             }, () => {
        //                 axios({
        //                     url: `${BASE_URL}/customer/get/category/ads`,
        //                     method: 'POST',
        //                     data: {
        //                         canonical_name: this.state.category,
        //                         latitude: this.state.latitude,
        //                         longitude: this.state.longitude,
        //                     },
        //                 }).then(response => {
                          
        //                     if(response.data.status == 'success'){
                                
        //                         this.setState({
        
        //                             resultKey: response.data.message,
        //                             adList: response.data.ads.data,
        //                             paginataionArray: response.data.ads.links,
        //                             previousPage: response.data.ads.prev_page_url,
        //                             nexPage: response.data.ads.next_page_url,
        //                             last:response.data.ads.last_page,
        //                             total:response.data.ads.total,
        //                         });
        //                     }
        
        //                     this.setState({
        //                         loaderStatus: false,
        //                     });
        
        //                 }).catch((error) => {
        //                     this.setState({
        //                         loaderStatus: false,
        //                     })
        //                 });
        //             });



        // }

        // if(key == '~' && category != '-'){
            
        //     this.setState({
        //         category: category,
        //         city: city,
        //         subcategory: subcategory,
        //         searchKey: key,
        //         loaderStatus: true,

        //     }, () => {
        //         axios({
        //             url: `${BASE_URL}/customer/get/category/ads`,
        //             method: 'POST',
        //             data: {
        //                 category_id: this.state.category,
        //                 latitude: this.state.latitude,
        //                 longitude: this.state.longitude,
        //             },
        //         }).then(response => {

        //             if(response.data.status == 'success'){
                        
        //                 this.setState({

        //                     resultKey: response.data.message,
        //                     adList: response.data.ads.data,
        //                     paginataionArray: response.data.ads.links,
        //                     previousPage: response.data.ads.prev_page_url,
        //                     nexPage: response.data.ads.next_page_url,
        //                     last:response.data.ads.last_page,
        //                     total:response.data.ads.total,
        //                 });
        //             }

        //             this.setState({
        //                 loaderStatus: false,
        //             });

        //         }).catch((error) => {
        //             this.setState({
        //                 loaderStatus: false,
        //             })
        //         });
        //     });

        // }
        // else if(key == '~' && subcategory != '-'){

        //     this.setState({
        //         category: category,
        //         city: city,
        //         subcategory: subcategory,
        //         searchKey: key,
        //         loaderStatus: true,

        //     }, () => {
        //         axios({
        //             url: `${BASE_URL}/customer/get/subcategory/ads`,
        //             method: 'POST',
        //             data: {
        //                 subcategory_id: this.state.subcategory,
        //                 latitude: this.state.latitude,
        //                 longitude: this.state.longitude,
        //             },
        //         }).then(response => {

        //             if(response.data.status == 'success'){
                        
        //                 this.setState({

        //                     resultKey: response.data.message,
        //                     adList: response.data.ads.data,
        //                     paginataionArray: response.data.ads.links,
        //                     previousPage: response.data.ads.prev_page_url,
        //                     nexPage: response.data.ads.next_page_url,
        //                     last:response.data.ads.last_page,
        //                     total:response.data.ads.total,
        //                 });
        //             }

        //             this.setState({
        //                 loaderStatus: false,
        //             });

        //         }).catch((error) => {
        //             this.setState({
        //                 loaderStatus: false,
        //             })
        //         });
        //     });
        // }
        // else{
            
        //     if(category != '-' && subcategory != '-' && city != '-'){
                
        //         this.setState({
        //             category: category,
        //             city: city,
        //             subcategory: subcategory,
        //             searchKey: key,
        //             loaderStatus: true,

        //         }, () => {
        //             axios({
        //                 url: `${BASE_URL}/customer/search/ads`,
        //                 method: 'POST',
        //                 data: {
        //                     search_key: key,
        //                     category: this.state.category,
        //                     latitude: this.state.latitude,
        //                     longitude: this.state.longitude,
        //                     city: this.state.city,
        //                 },
        //             }).then(response => {

        //                 if(response.data.status == 'success'){
                            
        //                     this.setState({

        //                         resultKey: response.data.message,
        //                         adList: response.data.ads.data,
        //                         paginataionArray: response.data.ads.links,
        //                         previousPage: response.data.ads.prev_page_url,
        //                         nexPage: response.data.ads.next_page_url,
        //                         last:response.data.ads.last_page,
        //                         total:response.data.ads.total,
        //                     });
        //                 }

        //                 this.setState({
        //                     loaderStatus: false,
        //                 });

        //             }).catch((error) => {
        //                 this.setState({
        //                     loaderStatus: false,
        //                 })
        //             });
        //         });
        //     }
        //     else if(category != '-' && subcategory != '-'){
                
        //         this.setState({
        //             category: category,
        //             subcategory: subcategory,
        //             searchKey: key,
        //             loaderStatus: true,

        //         }, () => {
        //             axios({
        //                 url: `${BASE_URL}/customer/search/ads`,
        //                 method: 'POST',
        //                 data: {
        //                     search_key: key,
        //                     latitude: this.state.latitude,
        //                     longitude: this.state.longitude,
        //                     category: this.state.category,
        //                 },
        //             }).then(response => {

        //                 if(response.data.status == 'success'){
                            
        //                     this.setState({
                                
        //                         resultKey: response.data.message,
        //                         adList: response.data.ads.data,
        //                         paginataionArray: response.data.ads.links,
        //                         previousPage: response.data.ads.prev_page_url,
        //                         nexPage: response.data.ads.next_page_url,
        //                         last:response.data.ads.last_page,
        //                         total:response.data.ads.total,
        //                     });
        //                 }

        //                 this.setState({
        //                     loaderStatus: false,
        //                 });

        //             }).catch((error) => {
        //                 this.setState({
        //                     loaderStatus: false,
        //                 })
        //             });
        //         });
        //     }
        //     else if(category != '-' && city != '-'){
                
        //         this.setState({
        //             category: category,
        //             city: city,
        //             searchKey: key,
        //             loaderStatus: true,

        //         }, () => {
        //             axios({
        //                 url: `${BASE_URL}/customer/search/ads`,
        //                 method: 'POST',
        //                 data: {
        //                     search_key: key,
        //                     latitude: this.state.latitude,
        //                     longitude: this.state.longitude,
        //                     category: this.state.category,
        //                     city: this.state.city,
        //                 },
        //             }).then(response => {

        //                 if(response.data.status == 'success'){
                            
        //                     this.setState({
                                
        //                         resultKey: response.data.message,
        //                         adList: response.data.ads.data,
        //                         paginataionArray: response.data.ads.links,
        //                         previousPage: response.data.ads.prev_page_url,
        //                         nexPage: response.data.ads.next_page_url,
        //                         last:response.data.ads.last_page,
        //                         total:response.data.ads.total,
        //                     });
        //                 }

        //                 this.setState({
        //                     loaderStatus: false,
        //                 });

        //             }).catch((error) => {
        //                 this.setState({
        //                     loaderStatus: false,
        //                 });
        //             });
        //         });
        //     }
        //     else if(subcategory != '-' && city != '-'){

        //         this.setState({
        //             category: category,
        //             city: city,
        //             subcategory: subcategory,
        //             searchKey: key,
        //             loaderStatus: true,

        //         }, () => {
        //             axios({
        //                 url: `${BASE_URL}/customer/search/ads`,
        //                 method: 'POST',
        //                 data: {
        //                     search_key: key,
        //                     latitude: this.state.latitude,
        //                     longitude: this.state.longitude,
        //                     city: this.state.city,
        //                 },
        //             }).then(response => {

        //                 if(response.data.status == 'success'){
                            
        //                     this.setState({
                                
        //                         resultKey: response.data.message,
        //                         adList: response.data.ads.data,
        //                         paginataionArray: response.data.ads.links,
        //                         previousPage: response.data.ads.prev_page_url,
        //                         nexPage: response.data.ads.next_page_url,
        //                         last:response.data.ads.last_page,
        //                         total:response.data.ads.total,
        //                     });
        //                 }

        //                 this.setState({
        //                     loaderStatus: false,
        //                 });

        //             }).catch((error) => {
        //                 this.setState({
        //                     loaderStatus: false,
        //                 })
        //             });
        //         });
        //     }
        //     else if(category != '-' && subcategory == '-' && city == '-'){
                
        //         this.setState({
        //             category: category,
        //             searchKey: key,
        //             loaderStatus: true,

        //         }, () => {
        //             axios({
        //                 url: `${BASE_URL}/customer/search/ads`,
        //                 method: 'POST',
        //                 data: {
        //                     search_key: key,
        //                     category: this.state.category,
        //                     latitude: this.state.latitude,
        //                     longitude: this.state.longitude,
        //                     city: this.state.city,
        //                 },
        //             }).then(response => {

        //                 if(response.data.status == 'success'){
                            
        //                     this.setState({
                                
        //                         resultKey: response.data.message,
        //                         adList: response.data.ads.data,
        //                         paginataionArray: response.data.ads.links,
        //                         previousPage: response.data.ads.prev_page_url,
        //                         nexPage: response.data.ads.next_page_url,
        //                         last:response.data.ads.last_page,
        //                         total:response.data.ads.total,
        //                     });
        //                 }

        //                 this.setState({
        //                     loaderStatus: false,
        //                 });

        //             }).catch((error) => {
        //                 this.setState({
        //                     loaderStatus: false,
        //                 })
        //             });
        //         });
        //     }
        //     else{

        //         this.setState({
        //             searchKey: key,
        //             loaderStatus: true,
        //         });
                
        //             axios({
        //                 url: `${BASE_URL}/customer/search/ads`,
        //                 method: 'POST',
        //                 data: {
        //                     search_key: key,
        //                     category: this.state.category,
        //                     latitude: this.state.latitude,
        //                     longitude: this.state.longitude,
        //                     city: this.state.city,
        //                 },
        //             }).then(response => {

        //                 if(response.data.status == 'success'){
                            
        //                     this.setState({
                                
        //                         resultKey: response.data.message,
        //                         adList: response.data.ads.data,
        //                         paginataionArray: response.data.ads.links,
        //                         previousPage: response.data.ads.prev_page_url,
        //                         nexPage: response.data.ads.next_page_url,
        //                         last:response.data.ads.last_page,
        //                         total:response.data.ads.total,
        //                     });
        //                 }

        //                 this.setState({
        //                     loaderStatus: false,
        //                 });

        //             }).catch((error) => {
        //                 this.setState({
        //                     loaderStatus: false,
        //                 });
        //             });
        //     }
            
        // }
    }

    paginationCall = (url) => {
        
        this.setState({
            loaderStatus: true,
        });

        if(this.state.search_key = '~' && this.state.category != '-'){
            
            axios({
                url: url,
                method: 'POST',
                data: {
                    category_id: this.state.category,
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                },
            }).then(response => {
                
                if(response.data.status == 'success'){
                    
                    this.setState({
                        
                        resultKey: response.data.message,
                        adList: response.data.ads.data,
                        paginataionArray: response.data.ads.links,
                        previousPage: response.data.ads.prev_page_url,
                        nexPage: response.data.ads.next_page_url,
                        last:response.data.ads.last_page,
                        total:response.data.ads.total,
                    });
                    window.scrollTo(0, 0);
                }

                this.setState({
                    loaderStatus: false,
                });

            }).catch((error) => {
                this.setState({
                    loaderStatus: false,
                })
            });
        }
        else if(this.state.search_key = '~' && this.state.subcategory != '-'){

            axios({
                url: url,
                method: 'POST',
                data: {
                    subcategory_id: this.state.subcategory,
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                },
            }).then(response => {
                
                if(response.data.status == 'success'){
                    
                    this.setState({
                        
                        resultKey: response.data.message,
                        adList: response.data.ads.data,
                        paginataionArray: response.data.ads.links,
                        previousPage: response.data.ads.prev_page_url,
                        nexPage: response.data.ads.next_page_url,
                        last:response.data.ads.last_page,
                        total:response.data.ads.total,
                    });
                    window.scrollTo(0, 0);
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

            axios({
                url: url,
                method: 'POST',
                data: {
                    search_key: this.state.searchKey,
                    category: this.state.category,
                    city: this.state.city,
                },
            }).then(response => {
                
                if(response.data.status == 'success'){
                    
                    this.setState({
                        
                        resultKey: response.data.message,
                        adList: response.data.ads.data,
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        paginataionArray: response.data.ads.links,
                        previousPage: response.data.ads.prev_page_url,
                        nexPage: response.data.ads.next_page_url,
                        last:response.data.ads.last_page,
                        total:response.data.ads.total,
                    });
                    window.scrollTo(0, 0);
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
    }

    render() {

        let {paginataionArray, previousPage, nexPage, last, adList, resultKey, category, subcategory, city, searchKey, total} = this.state;
        let loaderStatus = this.state.loaderStatus;

        return (
            <div id="page" class="site-page">
            {loaderStatus == true ? <Loader /> :
            <>
                <Header />
                {/* <!-- =====[SECTION MOTOR HERO] **===== --> */}
                <section class="section-hero-banner" style={{position: 'relative', background: '#0783FF', padding: '55px 0 120px 0'}}>
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h2 class="section-title text-white text-center">The UAE’s leading marketplace to buy and sell Products</h2>
                        </div>
                    </div>
                </div>
                </section>

                {/* <!-- =====[SECTION MOTOR FILTER] **===== --> */}
                
                {/* <HeadFilter /> */}

                {/* <!-- =====[SECTION MOTOR LISTING] **===== --> */}
                <section class="section-motor-sort-listing">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <div class="section-title-panel text-center">
                                <h2 class="section-title mb-2">{resultKey} <small class="text-muted"> {total} ads</small></h2>
                                <p class="text-muted">Brand new &amp; used Motorcycles for sale in Dubai - Sell your 2nd hand Motorcycles on Jamal al bahr &amp; reach 1.6 million buyers today.</p>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-9 col-lg-11 mx-auto">
                                <ul class="motor-sort-list">
                                    {adList.length == 0 ? <h4 className="text-center">No Data Found!</h4>:
                                        adList.length != 0 && adList.map((adList, index) => {
                                        return (
                                            <ListAdItem key={index} ads={adList} />
                                        )
                                    }) }
                                    
                                </ul>
                            </div>
                        </div>

                        {last == 1 || last == '' ? '' :
                            <PaginationLink paginataionArray={paginataionArray} last={last} previousPage={previousPage} nexPage={nexPage} paginationChange={this.paginationCall} />
                        }
                        

                    </div>
                </section>

                
                <AppDownload />
                <Footer />
            </>}
         </div>
        )
    }
}
