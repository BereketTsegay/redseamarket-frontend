import React, { Component } from 'react'
import SelectField from './select';
import axios from 'axios';
import { BASE_URL } from '../../projectString';

export default class dependencySelect extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            dependency: this.props.dependency,
            master:'',
            master_id:'',
            option: [],
        }
        
    }

    optionHandling = (options, superMaster) => {
            
        if(superMaster === 'Make'){
            this.setState({
                master: 'Model',
            },() => {
                axios({
                    method: 'POST',
                    url: `${BASE_URL}/customer/get/master/dependency`,
                    data:{
                        master:this.state.master,
                        master_id:options,
                    }
                }).then(response => {
                    
                    if(response.data.status == 'success'){
                        this.setState({
                            option:response.data.mster_data,
                        });

                    }
                })
                .catch((error) => {
        
                });
               
            });
        }
        if(superMaster === 'Model'){
            
            this.setState({
                master: 'Variant',
            },() => {
                axios({
                    method: 'POST',
                    url: `${BASE_URL}/customer/get/master/dependency`,
                    data:{
                        master:this.state.master,
                        master_id:options,
                    }
                }).then(response => {
                    
                    if(response.data.status == 'success'){
                        
                        this.setState({
                            option:response.data.mster_data,
                        });
                        
                    }
                })
                .catch((error) => {
                    
                });
            });
            
        }
    }

    render() {

        let {dependency, master, master_id, option} = this.state;
        
        return (
           
            dependency.map((dependency, index) => {
                
                if(dependency.master == 'Make'){
                    return (
                        <SelectField key={index} onOptionChange={this.optionHandling} label="Make" placeholder={dependency.master} option={dependency.option} type="Make" />
                    );
                }
                else{
                    return (
                        
                        <SelectField key={index} onOptionChange={this.optionHandling} label={dependency.master} placeholder={dependency.master} option={option} type={this.state.master} />
                    );
                }
            })
            
        )
    }
}
