import axios from 'axios'
import React, { Component } from 'react'
import { BASE_URL } from '../../projectString'
import AppDownload from '../home/app-download'
import defaultImage from '../../../src/web-assets/img/icon-256x256.png';
import Footer from '../layouts/footer'
import Header from '../layouts/header'
import CategoryList from './category-list';
import Loader from '../Loader';



export default class AllCategoryList extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            category_id: '',
            subcategory: [],
            loaderStatus: false,
          
        }
    }

    componentWillMount(){
       // console.log('gvgd');
        this.setState({
            loaderStatus: true,
        }, () => {

            axios({
                url: `${BASE_URL}/category/list`,
                method: 'get',
              
            }).then(response => {

                if(response.data.status == 'success'){
                  //  console.log(response.data.data);
                    this.setState({
                        category: response.data.data,
                    })
                }

                this.setState({
                    loaderStatus: false,
                });

            }).catch((error) => {
                this.setState({
                    loaderStatus: false,
                });
            });
        })
    }

   

    render() {

        let {category} = this.state;
        let loaderStatus = this.state.loaderStatus;
        
        return (
            <div id="page" className="site-page">
            {loaderStatus == true ? <Loader /> : ''}
            <>
                <Header />
                <section class="section-hero-banner" style={{position: 'relative', background: '#0783FF', padding: '55px 0 10px 0'}}>
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h2 class="section-title text-white text-center">The {localStorage.getItem('country_name')?localStorage.getItem('country_name'):'UAE'}’s leading marketplace to buy and sell Products</h2>
                            {/* <h2 class="section-title text-white text-center">All Category</h2> */}
                        </div>

                    </div>
                </div>
                </section>
                {/* <!-- =====[SECTION PLACE LIST]===== --> */}
                <section className="section-place-list">
                    <div className="container">
                    
                     <div className="row">
                    
                        {category && category.map((category, index) => {
                           
                                return <CategoryList key={index} category={category} />
                           
                        })} 

                   
                     </div>

                    </div>
                </section>

                <AppDownload />
                <Footer />
            </>
         </div>
        )
    }
}
