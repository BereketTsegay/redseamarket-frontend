import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class MobileMenu extends Component {

    constructor(props){
        super(props);

    }

    componentDidMount = () => {
        let navElement = document.getElementById('mobileMenu');
        
        localStorage.removeItem('navElement');
        localStorage.setItem('navElement', navElement);
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
                            <a onClick={this.changeCountry}>Change Country</a>
                            <a onClick={this.loginClick}>Login</a>
                            <a onClick={this.signUpClick}>Sign up</a>
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
                                                               <li key={index}><Link to={`/search?key=&city=&category=&subcategory=${child.id}`}>{child.canonical_name}</Link></li>
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
                                                               <li key={index}><Link to={`/property/list?category_id=${child.category_id}&subcategory_id=${child.id}&city=&property_type=&price=&room=`}>{child.canonical_name}</Link></li>
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
                                        <Link to={`/search?key=&city=&category=${category.canonical_name}&subcategory=`}>{category.name}</Link>
                                    <ul>
                                        <div>
                                            <Link to={`/search?key=&city=&category=${category.canonical_name}&subcategory=`}>{category.name}</Link>
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
                    
                </ul>
            </nav>
        )
    }
}
