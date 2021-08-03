import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Menu extends React.Component{

   constructor(props){
      super(props);
   }
    render() {
      //  console.log(this.props.category);
        return (
            <nav className="main-menubar">
               <div className="container">
                  <div className="menubar">
                     <ul className="menu">

                        {/* {this.props.category.map((category, index) => {
                           return (
                              <li key={index} className="menu-item menu-item-has-children">
                                 <Link to="#">{category.name}</Link>
                                 <ul className="sub-menu">
                                    {category.subcategory.map((subcategory, index) => {
                                       return (
                                          <li key={index} className="menu-item">
                                             <Link href="#">{subcategory.name}</Link>
                                          </li>
                                       );
                                    })}
                                 </ul>
                              </li>
                           );
                        })} */}

                        <li className="menu-item menu-item-has-children">
                           <a href="#">Motors</a>
                           <ul className="sub-menu">
                              <li className="menu-item menu-item-has-children">
                                 <a href="#">Used Cars for Sale</a>
                                 <div className="sub-menu-child">
                                    <h6>Used Cars for Sale</h6>
                                    <ul>
                                       <li><a href="#">Acura</a></li>
                                       <li><a href="#">Alfa Romeo</a></li>
                                       <li><a href="#">Aston Martin</a></li>
                                       <li><a href="#">Audi</a></li>
                                       <li><a href="#">BMW</a></li>
                                       <li><a href="#">Bentley</a></li>
                                       <li><a href="#">Bizzarrini</a></li>
                                       <li><a href="#">Borgward</a></li>
                                       <li><a href="#">Brilliance</a></li>
                                       <li><a href="#">Bufori</a></li>
                                       <li><a href="#">Bugatti</a></li>
                                       <li><a href="#">Buick</a></li>
                                       <li><a href="#">Cadillac</a></li>
                                       <li><a href="#">Caterham</a></li>
                                       <li><a href="#">Chery</a></li>
                                    </ul>
                                 </div>
                              </li>
                              <li className="menu-item menu-item-has-children">
                                 <a href="#">Sub Menu Parent 2</a>
                                 <div className="sub-menu-child">
                                    <h6>Sub Menu Parent 2</h6>
                                    <ul>
                                       <li><a href="#">Sub Menu Child 2.1</a></li>
                                       <li><a href="#">Sub Menu Child 2.2</a></li>
                                       <li><a href="#">Sub Menu Child 2.3</a></li>
                                       <li><a href="#">Sub Menu Child 2.4</a></li>
                                       <li><a href="#">Sub Menu Child 2.5</a></li>
                                       <li><a href="#">Sub Menu Child 2.6</a></li>
                                       <li><a href="#">Sub Menu Child 2.7</a></li>
                                       <li><a href="#">Sub Menu Child 2.8</a></li>
                                       <li><a href="#">Sub Menu Child 2.9</a></li>
                                       <li><a href="#">Sub Menu Child 2.10</a></li>
                                       <li><a href="#">Sub Menu Child 2.11</a></li>
                                       <li><a href="#">Sub Menu Child 2.12</a></li>
                                       <li><a href="#">Sub Menu Child 2.13</a></li>
                                    </ul>
                                 </div>
                              </li>
                              <li className="menu-item menu-item-has-children">
                                 <a href="#">Sub Menu Parent 3</a>
                                 <div className="sub-menu-child">
                                    <h6>Sub Menu Parent 3</h6>
                                    <ul>
                                       <li><a href="#">Sub Menu Child 3.1</a></li>
                                       <li><a href="#">Sub Menu Child 3.2</a></li>
                                       <li><a href="#">Sub Menu Child 3.3</a></li>
                                       <li><a href="#">Sub Menu Child 3.4</a></li>
                                       <li><a href="#">Sub Menu Child 3.5</a></li>
                                       <li><a href="#">Sub Menu Child 3.6</a></li>
                                       <li><a href="#">Sub Menu Child 3.7</a></li>
                                       <li><a href="#">Sub Menu Child 3.8</a></li>
                                       <li><a href="#">Sub Menu Child 3.9</a></li>
                                       <li><a href="#">Sub Menu Child 3.10</a></li>
                                    </ul>
                                 </div>
                              </li>
                           </ul>
                        </li>

                        <li className="menu-item menu-item-has-children">
                           <a href="#">Property for Rent</a>
                        </li>
                        <li className="menu-item menu-item-has-children">
                           <a href="#">Property for Sale</a>
                        </li>
                        <li className="menu-item menu-item-has-children">
                           <a href="#">Classifieds</a>
                        </li>
                        <li className="menu-item menu-item-has-children">
                           <a href="#">Mobiles & Tablets</a>
                        </li>
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