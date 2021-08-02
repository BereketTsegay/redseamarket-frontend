import axios from 'axios';
import React, { Component } from 'react'
import { BASE_URL } from '../../projectString';

export default class signup extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
        }
        
    }

    

    handleChange = (e) => {
        let target = e.target;

        this.setState({
            [target.name]: e.target.value,
        });

    }

    handleSubmit = (e) => {
        e.preventDefault();

        axios({
            url:`${BASE_URL}/user/register`,
            method: 'POST',
            data:{
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
            }
        }).then(response => {

            if(response.data.status == 'success'){
                localStorage.setItem('userToken', response.data.token);

                this.props.history.push('/');
            }

        }).catch((error) => {

        });
    }

    render() {
        
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Name" />
                    <input type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
                    <button type="submit">Register</button>
                </form>
            </div>
        )
    }
}
