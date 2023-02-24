import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../layouts/header';
import Footer from '../layouts/footer';
import AppDownload from '../home/app-download';
import axios from 'axios';
import { BASE_URL } from '../../projectString';

export default class SubSubCategorySelect extends Component {

    constructor(props){
        super(props);
        this.state = {
            category: this.props.match.params.id,
            subcategory: [],
            categoryId: this.props.match.params.category_id,
            categoryName: this.props.match.params.category_name,
        }
    }

    componentDidMount = () => {

        axios({
            url: `${BASE_URL}/customer/get/subsubcategory`,
            method: 'POST',
            data: {
                category: this.state.category,
            }
        }).then(response => {

            if(response.data.status === 'success'){
              //  console.log(response.data)
                this.setState({
                    subcategory: response.data.subcategory,
                });
            }

        }).catch((error) => {

        });
    }

    render() {

        let {category, subcategory, categoryId, categoryName} = this.state;

        return (
            <>
                <Header />
                    <section className="section-category-link">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                <div className="section-title-panel text-center">
                                    <h2 className="section-title">Now choose the right category for your ad:</h2>
                                </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-5 col-lg-7 col-md-9 mx-auto">
                                    <div className="category-ad-links">
                                        {subcategory && subcategory.map((subcategory, index) => {
                                            return (
                                                <Link to={`/create-form/${categoryId}/${subcategory.id}/${categoryName}/${subcategory.name}`} key={index} className="d-block mb-3 position-relative rounded-lg">
                                                    {subcategory.name}<i className="fa fa-angle-right" aria-hidden="true"></i>
                                                </Link>
                                            );
                                        })}
                                </div>
                                </div>
                            </div>
                        </div>
                    </section>
                <AppDownload/>
                <Footer/>
                {/* <Link to='' className="d-block mb-3 position-relative rounded-lg">
                    lorem ips<i className="fa fa-angle-right" aria-hidden="true"></i>
                </Link> */}
            </>
        )
    }
}
