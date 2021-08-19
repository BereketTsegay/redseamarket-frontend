import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Menu extends React.Component{

   constructor(props){
      super(props);
   }
   
   render() {
       
         let city = localStorage.getItem('city_id') ? localStorage.getItem('city_id') : '';

         return (
            <nav className="main-menubar">
               <div className="container">
                  <div className="menubar">
                     <ul className="menu">
                     <li className="menu-item menu-item-has-children">
                           <Link to="/">Home</Link>
                        </li>
                        {this.props.category.map((category, index) => {
                           if(category.id === 1){
                              return (
                                 <li key={index} className="menu-item menu-item-has-children">
                                    <Link to="/categoryMotors">{category.name}</Link>
                                    <ul className="sub-menu">
                                       {category.subcategory.map((subcategory, index) => {
                                          return (
                                             <li key={index} className="menu-item menu-item-has-children">
                                              <Link to={`/motor/result?key=&city=${city}&subcategory=${subcategory.id}`}>{subcategory.name}</Link>
                                                <div className="sub-menu-child">
                                                   <h6>{subcategory.name}</h6>
                                                   <ul>
                                                
                                                      {subcategory.subcategory_child ?  subcategory.subcategory_child.map((child, index) => {
                                                         
                                                         return (
                                                            <li key={index}><Link to={`/search?key=&city=&category=&subcategory=${child.id}`}>{child.canonical_name}</Link></li>
                                                         )
                                                      }) : '' }
                                                      
                                                   </ul>
                                                </div>
                                             </li>
                                          );
                                       })}
                                    </ul>
                                 </li>
                              );
                           }
                           else if(category.id === 2 || category.id === 3){
                              return (
                                 <li key={index} className="menu-item menu-item-has-children">
                                    <Link to={`/categoryProperty/${category.id}`}>{category.name}</Link>
                                    <ul className="sub-menu">
                                       {category.subcategory.map((subcategory, index) => {
                                          return (
                                             <li key={index} className="menu-item">
                                                <Link to={`/property/list?category_id=2&subcategory_id=${subcategory.id}&city=&property_type=&price=&room=`}>{subcategory.name}</Link>
                                                <div className="sub-menu-child">
                                                   <h6>{subcategory.name}</h6>
                                                   <ul>
                                                
                                                      {subcategory.subcategory_child ?  subcategory.subcategory_child.map((child, index) => {
                                                         
                                                         return (
                                                            <li key={index}><Link to={`/property/list?category_id=2&subcategory_id=${child.id}&city=&property_type=&price=&room=`}>{child.name}</Link></li>
                                                         )
                                                      }) : '' }
                                                      
                                                   </ul>
                                                </div>
                                             </li>
                                          );
                                       })}
                                    </ul>
                                 </li>
                              );
                           }
                           else{

                              return (
                                 <li key={index} className="menu-item menu-item-has-children">
                                    <Link to="#">{category.name}</Link>
                                    <ul className="sub-menu">
                                       {category.subcategory.map((subcategory, index) => {
                                          return (
                                             <li key={index} className="menu-item">
                                                <Link to={`/search?key=&city=&category=&subcategory=${subcategory.id}`}>{subcategory.name}</Link>
                                                <div className="sub-menu-child">
                                                   <h6>{subcategory.name}</h6>
                                                   <ul>
                                                
                                                      {subcategory.subcategory_child ?  subcategory.subcategory_child.map((child, index) => {
                                                         
                                                         return (
                                                            <li key={index}><Link to={`/search?key=&city=&category=&subcategory=${child.id}`}>{child.name}</Link></li>
                                                         )
                                                      }) : '' }
                                                      
                                                   </ul>
                                                </div>
                                             </li>
                                          );
                                       })}
                                    </ul>
                                 </li>
                              );
                           }
                        })}

                        <li className="menu-item menu-item-has-children">
                           <Link to="#">About Us</Link>
                        </li>
                        <li className="menu-item menu-item-has-children">
                           <Link to="#">Contact Us</Link>
                        </li>
                     </ul>
                  </div>
               </div>
            </nav>
            )
        }
    }
    export default Menu