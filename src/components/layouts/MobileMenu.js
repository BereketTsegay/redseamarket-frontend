import React, { Component } from 'react'
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { BASE_URL, userToken } from '../../projectString'; 

class MobileMenu extends Component {

    constructor(props){
        super(props);

        this.state = {
            loginStatus: (localStorage.getItem('loginStatus')) ? localStorage.getItem('loginStatus'):false,
            countryName: localStorage.getItem('country_name') ? localStorage.getItem('country_name') : 'Change Country'
        }
    }

    componentDidMount = () => {

        // let element = document.getElementById('mobileMenu');
        // let someElementToString;

        // if (element.outerHTML)
        //     someElementToString = element.outerHTML;
        // else if (XMLSerializer)
        //     someElementToString = new XMLSerializer().serializeToString(element);
        
        // // console.log(someElementToString);
        // localStorage.removeItem('navElement');
        // localStorage.setItem('navElement', someElementToString);
    }

    menuClose = () => {
        this.props.menuRemove();
    }

    changeCountry = () => {
        this.props.changeCountry();
    }

    loginClick = () => {
        this.props.loginClick();
    }

    signUpClick = () => {
        this.props.signUpClick();
    }


    logout = (e) => {

        this.setState({loaderStatus: true,});
        localStorage.removeItem('loginStatus');
        
        localStorage.setItem('loginStatus',false);
        
        e.preventDefault();
        
        localStorage.removeItem('userToken');
        
        
        // localStorage.setItem('loginStatus', false);
        // this.setState({loginStatus:false});
        axios({
            url: `${BASE_URL}/customer/logout`,
            method: 'POST',
            headers:{ Authorization: "Bearer " + userToken },

        }).then(response => {

                if(response.data.status === 'success'){
                    this.props.history.push('/');
                }

                this.setState({
                    loaderStatus: false,
                    loginStatus: false,
                });

        }).catch((error) => {
                this.props.history.push('/');
                this.setState({
                    loaderStatus: false,
                });
        });

    }
    
    render() {

        let category = this.props.category;

        let style = {
            left: 'auto',
            right: '0px',
            display: 'block',
            transform: 'translateX(0%)',
        }

        let noStyle = {}

        let city = localStorage.getItem('city_id') ? localStorage.getItem('city_id') : '';

        let user = localStorage.getItem('user') != '' ? localStorage.getItem('user') : '';

        return (
            
            <nav className="slide-menu" id="mobileMenu" style={this.props.action == true ? style : noStyle}>
                <div className="controls">
                    <button type="button" className="btn slide-menu__control" data-action="back">
                        <i className="fa fa-arrow-left" aria-hidden="true"></i>
                        Back
                    </button>
                    <button type="button" className="btn slide-menu__control" data-action="close" onClick={this.menuClose}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                        Close
                    </button>
                </div>
                {/* <div className="slide-menu__slider" style="transform: translateX(0%);"> */}
                <ul className="un-style mobile-menu">
                    <li className="row">
                        <div className="container">
                            <a onClick={this.changeCountry}>{this.state.countryName}</a>
                            {this.state.loginStatus === 'true' || this.state.loginStatus === true ?
                                <>
                                    <Link to="/myfavourite">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                        Favorites
                                    </Link>
                                    <Link to="/myprofile">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        {user}
                                    </Link> 
                                    <Link onClick={(e) => this.logout(e)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                        Logout
                                    </Link>
                                </>
                            :
                            <>
                                <a onClick={this.loginClick}>Login</a>
                                <a onClick={this.signUpClick}>Sign up</a>
                            </>}
                        </div>
                    </li>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {category && category.map((category, index) => {
                        if(category.id == 1){
                            return (
                                <li key={index}>
                                        <Link to="/categoryMotors">{category.name}</Link>
                                    <ul>
                                        <div>
                                            <Link to="/categoryMotors">{category.name}</Link>
                                        </div>
                                        {category.subcategory && category.subcategory.map((subcategory, index) => {
                                            return(
                                                <li key={index}>
                                                    <a href="#">{subcategory.name}</a>
                                                    <ul>
                                                    <div>
                                                        <Link to={`/motor/result?key=&city=${city}&subcategory=${subcategory.id}`}>{subcategory.name}</Link>
                                                    </div>
                                                        {subcategory.subcategory_child ?  subcategory.subcategory_child.map((child, index) => {
                                                           return (
                                                               <li key={index}><Link to={`/search?key=&city=&category=&subcategory=${child.id}`}>{child.name}</Link></li>
                                                            )
                                                         }) : '' }
                                                    </ul>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                            );
                        }

                        else if(category.id === 2 || category.id === 3){
                            return (
                                <li key={index}>
                                        <Link to={`/categoryProperty/${category.id}`}>{category.name}</Link>
                                    <ul>
                                        <div>
                                            <Link to={`/categoryProperty/${category.id}`}>{category.name}</Link>
                                        </div>
                                        {category.subcategory && category.subcategory.map((subcategory, index) => {
                                            return(
                                                <li key={index}>
                                                    <a href="#">{subcategory.name}</a>
                                                    <ul>
                                                    <div>
                                                        <Link to={`/property/list?category_id=${subcategory.category_id}&subcategory_id=${subcategory.id}&city=&property_type=&price=&room=`}>{category.name}</Link>
                                                    </div>
                                                        {subcategory.subcategory_child ?  subcategory.subcategory_child.map((child, index) => {
                                                           return (
                                                               <li key={index}><Link to={`/property/list?category_id=${child.category_id}&subcategory_id=${child.id}&city=&property_type=&price=&room=`}>{child.name}</Link></li>
                                                            )
                                                         }) : '' }
                                                    </ul>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                            );
                        }
                        else{
                            return (
                                <li key={index}>
                                        <Link to={`/search?key=&city=&category=${category.id}&subcategory=`}>{category.name}</Link>
                                    <ul>
                                        <div>
                                            <Link to={`/search?key=&city=&category=${category.id}&subcategory=`}>{category.name}</Link>
                                        </div>
                                        {category.subcategory && category.subcategory.map((subcategory, index) => {
                                            return(
                                                <li key={index}>
                                                    <a href="#">{subcategory.name}</a>
                                                    <ul>
                                                        <div>
                                                            <Link to={`/search?key=&city=&category=&subcategory=${subcategory.id}`}>{subcategory.name}</Link>
                                                        </div>
                                                        {subcategory.subcategory_child ?  subcategory.subcategory_child.map((child, index) => {
                                                           return (
                                                               <li key={index}><Link to={`/search?key=&city=&category=&subcategory=${child.id}`}>{child.name}</Link></li>
                                                            )
                                                         }) : '' }
                                                    </ul>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                            );
                        }
                    })}
                    <li>
                        <Link to="/about">About Us</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact Us</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default withRouter(MobileMenu);