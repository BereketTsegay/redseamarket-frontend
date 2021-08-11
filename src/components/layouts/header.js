import React, { Component } from 'react';
import CitySelect from '../common/citySelect';
import Menu from '../layouts/menu';
import Signup from '../login/signup';
import axios from 'axios';
import Logo from '../../../src/web-assets/img/brand.svg';
import { Button, Modal } from 'react-bootstrap';
import { BASE_URL } from '../../projectString'; 
import { withRouter } from 'react-router';
import Swal from 'sweetalert2'
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
         loginStatus: (sessionStorage.getItem('loginStatus'))?sessionStorage.getItem('loginStatus'):false,
         // loginStatus: false,
         dataArray:JSON.parse(localStorage.getItem('dataArray')),
         showHistory: false,
         registerModal:false,
         email: '',
         password: '',
         errors: {
            username: '',
            password: '',
        },
        errors2:{
           namererror:'',
           emailrerror:'',
           passwordrerror:''
        },
        globalLoginError:'',
        globalRegError:'',
        registername:'',
        registeremail:'',
        registerpassword:'',

      }

   }
   
   viewLoginModal = () => {
      this.setState({ showHistory: !this.state.showHistory });
      this.setState({ registerModal: false });


  }


  viewRegisterModal = () => {
   this.setState({ registerModal: !this.state.registerModal });
   this.setState({ showHistory: false });
  }


  handleRegisterSubmit = (e) => {
   
   e.preventDefault(); 
   const { name, value } = e.target;
   let errors2 = this.state.errors2;
   if(this.state.registername && this.state.registeremail && this.state.registerpassword)
      {


         e.preventDefault();

        axios({
            url:`${BASE_URL}/user/register`,
            method: 'POST',
            data:{
                name: this.state.registername,
                email: this.state.registeremail,
                password: this.state.registerpassword,
            }
        }).then(response => {
            if(response.data.code == '200'){
               

                localStorage.removeItem('userToken');
                localStorage.setItem('userToken', response.data.token);
                localStorage.setItem('loginStatus', true);
                this.setState({loginStatus:true});
                Swal.fire({
                   title: 'success!',
                   text: response.data.message,
                   icon: 'success',
                   confirmButtonText: 'OK'
               });
               this.setState({ registerModal: false });



            }else if(response.data.code == '400'){
               this.setState({globalRegError:response.data.errors.email[0]});
            }else{
               this.setState({globalRegError:'Sorry something went wrong try again...'});
            }

        }).catch((error) => {
           //console.log(error,'error')
         // this.setState({globalRegError:error.response.data.message});
        });





      }else{
         if(this.state.registername === '' || this.state.registername.trim() === '')
         {
             errors2.namererror ='Name cannot be blank'
         }
         if(this.state.registeremail === ''  || this.state.registeremail.trim() === '')
         {
            
             errors2.emailrerror = 'Email cannot be blank';
         }
         if(this.state.registerpassword === ''  || this.state.registerpassword.trim() === '')
         {
            
             errors2.passwordrerror = 'Password cannot be blank';
         }
         this.setState({errors2, [name]: value});
      }

      // console.log(errors2)

  }




   handleSubmit = (e) => {
      e.preventDefault();
      // console.log(e, 'targetvals')
        const { name, value } = e.target;
        let errors = this.state.errors;
        if(this.state.email && this.state.password)
        {
      
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
                  // localStorage.setItem('loginStatus', true);
                  this.setState({loginStatus:true});
                  sessionStorage.setItem('loginStatus',true);
                  Swal.fire({
                     title: 'success!',
                     text: response.data.message,
                     icon: 'success',
                     confirmButtonText: 'OK'
                 });
                 this.setState({ showHistory: false });
               //   console.log(localStorage,"local storage")
                  // this.props.handleSuccessfullAuth(response.data.message)
              }

          }).catch((error) => {
            // console.log(error,'error');
            this.setState({globalLoginError:error.response.data.message});
            //   console.log(error.response.data.message);
          })
         }
          else{
            if(this.state.email === '' || this.state.email.trim() === '')
            {
                errors.username ='Email cannot be blank'
                this.setState({isUsernameError:true});
            }
            if(this.state.password === ''  || this.state.password.trim() === '')
            {
                this.setState({isPasswordError:true});
                errors.password = 'Password cannot be blank';
            }
            this.setState({errors, [name]: value});
          }   


      
  }


  onChange2 =(e)=>{
   this.setState({[e.target.name]: e.target.value});
   this.setState({globalRegisterError:''});
   e.preventDefault();
   const { name, value } = e.target;
   let errors2 = this.state.errors2;
   switch (name) {
       case 'registername': 
           errors2.namererror = (value.length === 0 || (value.trim()).length === 0 )? 'Name cannot be blank': '';
           if (value.length === 0 || (value.trim()).length === 0)
           {
               this.setState({isUsernameError:true});
           }else{
               this.setState({isUsernameError:false});
           }
       break;
       case 'registeremail': 
          errors2.emailrerror = (value.length === 0 || (value.trim()).length === 0)? 'Email cannot be blank' : '';
           if (value.length === 0 || (value.trim()).length === 0)
           {
               this.setState({isPasswordError:true});
           }else{
               this.setState({isPasswordError:false});
           }
       break;
       case 'registerpassword': 
       errors2.passwordrerror = (value.length === 0 || (value.trim()).length === 0)? 'Password cannot be blank' : '';
        if (value.length === 0 || (value.trim()).length === 0)
        {
            this.setState({isPasswordError:true});
        }else{
            this.setState({isPasswordError:false});
        }
    break;
       default:
         break;
   }
   this.setState({errors2, [name]: value});
}







  onChange =(e)=>{
   this.setState({[e.target.name]: e.target.value});
   this.setState({globalLoginError:''});
   e.preventDefault();
   const { name, value } = e.target;
   let errors = this.state.errors;
   switch (name) {
       case 'email': 
           errors.username = (value.length === 0 || (value.trim()).length === 0 )? 'Email cannot be blank': '';
           if (value.length === 0 || (value.trim()).length === 0)
           {
               this.setState({isUsernameError:true});
           }else{
               this.setState({isUsernameError:false});
           }
       break;
       case 'password': 
          errors.password = (value.length === 0 || (value.trim()).length === 0)? 'Password cannot be blank' : '';
           if (value.length === 0 || (value.trim()).length === 0)
           {
               this.setState({isPasswordError:true});
           }else{
               this.setState({isPasswordError:false});
           }
       break;
       default:
         break;
   }
   this.setState({errors, [name]: value});
}





logout = (e) => {
   this.setState({loginStatus:false});
   sessionStorage.setItem('loginStatus',false);
   // e.preventDefault();
   
   // localStorage.removeItem('userToken');
  
 
   // localStorage.setItem('loginStatus', false);
   // this.setState({loginStatus:false});
   // axios({
   //     url: `${BASE_URL}/customer/logout`,
   //     method: 'POST',
   //     headers:{ Authorization: "Bearer " + this.state.token },

   // }).then(response => {

   //     if(response.data.status === 'success'){
   //         this.props.history.push('/');
   //     }

   // }).catch((error) => {
   //     this.props.history.push('/');
   // });

}










    render() {
      
      let {user,dataArray} = this.state;

      let loginStyle = {
         marginRight: '0px',
       };
       
       let globalError ={
         color: 'red',
         fontSize: 'large',
         fontWeight: '600',
       }
      let ErrorStyle = {
         color: 'red',
       };
       let modalLogin ={
            position:  'fixed',
            width: '600px',
            top: '40px',
            left: 'calc(50% - 300px)',
            bottom: '40px',
          
        
       }

       const {errors,errors2} = this.state;
       
       

console.log(this.state.loginStatus,'login status')

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
                      
                           {(this.state.loginStatus &&( 
                           <div>
                               <Link to="/myfavourite" className="header-link">
                               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                               Favorites
                               </Link>
                              <Link to="/myprofile" className="header-link">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                 {user}
                              </Link> 
                              <a onClick={(e) => this.logout(e)}>Logout</a>
                           </div>
                           ))}

                           {(!this.state.loginStatus &&( 
                                 <span>
                                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                 <a href="javascript:void(0)" onClick={() => { this.viewLoginModal() }} className="header-link" style={loginStyle}>Log in</a> or <a href="javascript:void(0)" onClick={() => { this.viewRegisterModal() }} className="header-link">sign up</a>
                                
                                 </span>


                            ))}





                           {(this.state.loginStatus) ? 

                           <Link to='/create-ads' className="btn btn-primary">Place Your Ad</Link>
                           :
                           <a href='javascript:void(0)'  onClick={() => { this.viewLoginModal() }}  className="btn btn-primary">Place Your Ad</a>
                            }
                        </div>
                        <button className="btn btn-primary btn-toggle-menu d-inline-block d-lg-none ml-auto">
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                        </button>
                     </div>
                  </div>
            </header>
             <Menu category={dataArray}/>


            


<div className="container">
                     <Modal className="modal fade log-sign-modal" show={this.state.showHistory}  style={modalLogin} id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                        
                        <Modal.Body>
                       
                              <button  onClick={() => { this.viewLoginModal() }}  type="button" className="close" data-dismiss="modal" aria-label="Close">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                              </button>
                              <h5 className="modal-title text-center text-brand">Log in to your account</h5>
                              <div className="modal-form">
                                 <div className="form-group">
                                
                                 <p className="help-block help-block-error" style={globalError}>{(this.state.globalLoginError!="")? "Sorry... "+this.state.globalLoginError:''}</p>
                                 {/* globalLoginError */}
                                 <input type="email" value={this.state.email}  onChange={this.onChange} name="email" className="form-control" placeholder="Email address"/>
                                 {errors.username.length > 0 && <p className="help-block help-block-error"  style={ErrorStyle}>{errors.username}</p>}
                                 </div>
                                 <div className="form-group">
                                    <input type="password" value={this.state.password} name="password" onChange={this.onChange} className="form-control"  placeholder="Password"/>
                                 {errors.password.length > 0 && <p className="help-block help-block-error" style={ErrorStyle}>{errors.password}</p>}
                                 </div>
                                 <div className="form-group text-right">
                                    <a href="#" className="btn btn-link p-0">Forgot your password?</a>
                                 </div>
                                 <div className="form-group">
                                 
                                    <button onClick={this.handleSubmit} className="btn btn-primary d-block w-100">Login</button>
                                 </div>
                                 <div className="form-group-line text-center">
                                    <button className="btn btn-link p-0" onClick={() => { this.viewRegisterModal() }} data-toggle="modal" data-target="#signupModal" data-dismiss="modal">Don’t have an account? Create one</button>
                                 </div>
                              </div>
                              <div className="modal-note text-center">By signing up I agree to the  <a href="#"> Terms and Conditions</a> and <a href="#"> Privacy Policy</a></div>
                        
                        </Modal.Body>
                        
                    </Modal>

                    

 

                    <Modal className="modal fade log-sign-modal" show={this.state.registerModal}  id="signupModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                        
                        <Modal.Body>
                        <button onClick={() => { this.viewRegisterModal() }} type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                     </button>
                     <h5 className="modal-title text-center text-brand">Create an account</h5>
                     <div className="modal-form">
                     <p className="help-block help-block-error" >{(this.state.globalRegError!="")? "Sorry... "+this.state.globalRegError:''}</p>
                        <div className="form-group">
                        <input type="text" value={this.state.registername}  onChange={this.onChange2} name="registername" className="form-control" placeholder="Name"/>
                        {errors2.namererror.length > 0 && <p className="help-block help-block-error"  style={ErrorStyle}>{errors2.namererror}</p>}
                         
                        </div>
                        <div className="form-group">
                           <input type="email" value={this.state.registeremail}  onChange={this.onChange2}  name="registeremail" className="form-control" placeholder="Email"/>
                           {errors2.emailrerror.length > 0 && <p className="help-block help-block-error"  style={ErrorStyle}>{errors2.emailrerror}</p>}
                        </div>
                        <div className="form-group">
                           <input type="password"  value={this.state.registerpassword}  onChange={this.onChange2}  name="registerpassword"  className="form-control" placeholder="Password"/>
                           {errors2.passwordrerror.length > 0 && <p className="help-block help-block-error"  style={ErrorStyle}>{errors2.passwordrerror}</p>}
                        </div>
                        <div className="form-group">
                           <button  onClick= { this.handleRegisterSubmit} className="btn btn-primary d-block w-100">Sign Up</button>
                        </div>
                        <div className="form-group-line text-center">
                           <button  onClick={() => { this.viewLoginModal() }} className="btn btn-link p-0" data-toggle="modal" data-target="#loginModal" data-dismiss="modal">Already have an account? Login here</button>
                        </div>
                     </div>
                     <div className="modal-note text-center">By signing up I agree to the  <a href="#"> Terms and Conditions</a> and <a href="#"> Privacy Policy</a></div>
                        
                        </Modal.Body>
                        
                    </Modal>              


















</div>              


             </div>

             
        )
    }
}
export default withRouter(Header)