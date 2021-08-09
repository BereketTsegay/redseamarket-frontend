import React, { Component } from 'react';
import CitySelect from '../common/citySelect';
import Menu from '../layouts/menu';
import Signup from '../login/signup';
import axios from 'axios';
import Logo from '../../../src/web-assets/img/brand.svg';
// import { Button, Modal } from 'react-bootstrap';
import { BASE_URL } from '../../projectString'; 
import {
   BrowserRouter as Router,
   Link,
   Route // for later
 } from 'react-router-dom'
class Header extends React.Component{

   constructor(props){
      super(props);

      this.state = {
         user:localStorage.getItem('user'),
         loginStatus:localStorage.getItem('loginStatus'),
         dataArray:JSON.parse(localStorage.getItem('dataArray')),
         showHistory: false,
         email: '',
         password: '',
      }

   }
   
   viewHistoryModal = () => {
      this.setState({ showHistory: !this.state.showHistory });


  }
   handleChange = (e) => {
      this.setState({
         [e.target.name]:e.target.value,
      });
   }



   handleSubmit = (e) => {

        
      // e.preventDefault();

      
          axios({
              url: `${BASE_URL}/user/login`,
              method: 'POST',
              data:{
                  email:this.state.email,
                  password:this.state.password,
              }
          }).then(response => {
              if(response.data.status == 'success'){

                  localStorage.removeItem('userToken');
                  localStorage.setItem('userToken', response.data.token);
                  this.props.history.push('/');
              }

          }).catch((error) => {
              console.log(error.response.data.message);
          })
      
  }

    render() {
      
      let {user, loginStatus, dataArray} = this.state;
      let loginStyle = {
         marginRight: '0px',
       };
       let modalLogin ={
            position:  'fixed',
            width: '600px',
            top: '40px',
            left: 'calc(50% - 300px)',
            bottom: '40px',
          
        
       }
        return (
           <div>
            <header id="header" className="site-header">
            <div className="main-header">
                     <div className="container d-flex align-items-center flex-wrap">
                        <div className="brand">
                       
                           <Link to="/" className="d-block"><img src={Logo} className="d-block" alt="brand"/></Link>
                        </div>
                       <CitySelect />
                      
                        <div className="header-right d-none d-lg-flex align-items-center ml-auto">
                           <Link to="/myfavourite" className="header-link">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                              Favorites
                           </Link>
                           {loginStatus === 'true' ? 
                              <Link to="/myprofile" className="header-link">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                 {user}
                              </Link> : 
                                 <span>
                                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                 <a href="javascript:void(0)" onClick={() => { this.viewHistoryModal() }} className="header-link" style={loginStyle}>Log in</a> or <Link to="/register" className="header-link">sign up</Link>
                                 </span>
                           }
                           <Link to='/create-ads' className="btn btn-primary">Place Your Ad</Link>
                        </div>
                        <button className="btn btn-primary btn-toggle-menu d-inline-block d-lg-none ml-auto">
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                        </button>
                     </div>
                  </div>
            </header>
             <Menu category={dataArray}/>

             




             {/* <div className="container">
                    <Modal size="lg" show={this.state.showHistory} animation={false} style={modalLogin}>
                        <Modal.Header>
                        <h4 class="modal-title">Login to your account</h4>
                        <button onClick={() => { this.viewHistoryModal() }} type="button" class="close" data-dismiss="modal">×</button>
                        </Modal.Header>
                        <Modal.Body>
                            <div class="panel-body">
                                <div className="col-lg-12 table-responsive m-t" id="his">
                                    <table class="table table-striped table-bordered table-hover dataTables-Orderhistroy" >
                                        <tbody>
                                                <tr>
                                                    <td><input type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" /></td>
                                                </tr>
                                                <tr>
                                                   <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
                                                </tr>  
                                                <tr>
                                                <button onClick={() => { this.handleSubmit() }} type="button">Login</button>
                                                </tr>
                                           
                                        </tbody>
                                    </table>
                                    
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button  onClick={() => { this.viewHistoryModal() }}  variant="secondary">
                                Close
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </div>               */}


             </div>

             
        )
    }
}
export default Header