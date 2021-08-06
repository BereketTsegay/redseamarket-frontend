import axios from 'axios';
import React, { Component } from 'react'
import { BASE_URL } from '../../projectString';

export default class login extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',

        }

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value,
        });
    }

    handleSubmit = (e) => {

        
        e.preventDefault();

        
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

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}
