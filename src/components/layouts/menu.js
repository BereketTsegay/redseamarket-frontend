import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Menu extends React.Component{

   constructor(props){
      super(props);
   }
   
    render() {
       
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
                                                <Link href="#">{subcategory.name}</Link>
                                                <div class="sub-menu-child">
                                                   <h6>{subcategory.name}</h6>
                                                   <ul>
                                                
                                                      {subcategory.subcategory_child ?  subcategory.subcategory_child.map((child, index) => {
                                                         
                                                         return (
                                                            <li key={index}><a href="#">{child.name}</a></li>
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
                                                <Link href="#">{subcategory.name}</Link>
                                                <div class="sub-menu-child">
                                                   <h6>{subcategory.name}</h6>
                                                   <ul>
                                                
                                                      {subcategory.subcategory_child ?  subcategory.subcategory_child.map((child, index) => {
                                                         
                                                         return (
                                                            <li key={index}><a href="#">{child.name}</a></li>
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
                                                <Link href="#">{subcategory.name}</Link>
                                                <div class="sub-menu-child">
                                                   <h6>{subcategory.name}</h6>
                                                   <ul>
                                                
                                                      {subcategory.subcategory_child ?  subcategory.subcategory_child.map((child, index) => {
                                                         
                                                         return (
                                                            <li key={index}><a href="#">{child.name}</a></li>
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
                           <a href="#">About Us</a>
                        </li>
                        <li className="menu-item menu-item-has-children">
                           <a href="#">Contact Us</a>
                        </li>
                     </ul>
                  </div>
               </div>
            </nav>
            )
        }
    }
    export default Menu